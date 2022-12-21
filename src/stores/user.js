import { ref, computed, inject } from "vue";
import { defineStore } from "pinia";
import avatarNoneUrl from "@/assets/avatar-none.png";

export const useUserStore = defineStore("user", () => {
  const axios = inject("axios");

  const permissions = {
    dashboard: ["EM"],
    orders: ["EM"],
    itemsToPrepare: ["EC"],
    ordersToDeliver: ["ED"],
    order: ["EM", "C"],
    profile: ["EM", "EC", "ED"],
    customerProfile: ["C"],
    history: ["C"],
    changePassword: ["EM", "EC", "ED", "C"],
    products: ["EM"],
  };

  const user = ref(null);

  const userPhotoUrl = computed(() => {
    if (!user.value?.photo_url) {
      return avatarNoneUrl;
    }
    return user.value.photo_url;
  });

  const userId = computed(() => {
    return user.value?.id ?? -1;
  });

  async function loadUser() {
    try {
      const response = await axios.get("/me");
      // verification because of when a driver makes 'me' request the "data" wrapper is not there
      if (response.data.data) {
        user.value = response.data.data;
      } else {
        user.value = response.data;
      }
    } catch (error) {
      clearUser();
      throw error;
    }
  }

  function clearUser() {
    delete axios.defaults.headers.common.Authorization;
    sessionStorage.removeItem("token");
    user.value = null;
  }

  async function login(credentials) {
    try {
      const response = await axios.post("login", credentials);
      axios.defaults.headers.common.Authorization =
        "Bearer " + response.data.access_token;
      sessionStorage.setItem("token", response.data.access_token);
      await loadUser();
      return response;
    } catch (error) {
      clearUser();
      return error;
    }
  }

  async function register(user) {
    try {
      const response = await axios.post("register", user);
      axios.defaults.headers.common.Authorization =
        "Bearer " + response.data.access_token;
      sessionStorage.setItem("token", response.data.access_token);
      await loadUser();
      return response;
    } catch (error) {
      clearUser();
      return error;
    }
  }

  async function logout() {
    try {
      await axios.post("logout");
      clearUser();
      return true;
    } catch (error) {
      return false;
    }
  }

  async function restoreToken() {
    let storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      axios.defaults.headers.common.Authorization = "Bearer " + storedToken;
      await loadUser();
      return true;
    }
    clearUser();
    return false;
  }

  function canGoTo(to) {
    if (
      permissions[to.name] &&
      !permissions[to.name].includes(user.value?.type)
    ) {
      return false;
    }

    return true;
  }

  return {
    user,
    userId,
    userPhotoUrl,
    login,
    logout,
    loadUser,
    register,
    restoreToken,
    canGoTo,
    clearUser,
  };
});

<script setup>
import BaseButtons from "@/components/dashboard/BaseButtons.vue";
import BaseButton from "@/components/dashboard/BaseButton.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const logout = () => {
  userStore.logout();
};
</script>
<template>
  <div id="topbar" class="d-flex align-items-center fixed-top">
    <div
      class="container d-flex justify-content-center justify-content-md-between"
    >
      <div class="contact-info d-none d-md-flex align-items-center">
        <i class="bi bi-phone d-flex align-items-center">
          <span>+351 912 345 678</span>
        </i>
        <i class="bi bi-phone d-flex align-items-center">
          <span>+351 912 345 678</span>
        </i>
        <i class="bi bi-clock d-flex align-items-center ms-4">
          <span>Mon-Sat: 11:00h - 23:00h</span>
        </i>
      </div>

      <div class="languages d-flex align-items-center">
        <ul>
          <router-link class="mr-3" to="/board">Public Board</router-link>
          <router-link class="mr-3" to="/">Make order</router-link>

          <span v-if="!userStore.user">
            <router-link class="mr-3" to="/login">Login</router-link>
            <router-link class="mr-3" to="/register">Register</router-link>
          </span>
          <span v-else>
            <router-link
              v-if="userStore.user.type == 'C'"
              class="mr-3"
              to="/customer/profile"
              >Profile</router-link
            >
            <router-link v-else class="mr-3" to="/profile">Profile</router-link>
            <a class="mr-3" @click="logout">Logout</a>
          </span>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/../src/assets/css/style.css";
@import "bootstrap/dist/css/bootstrap.min.css";
</style>

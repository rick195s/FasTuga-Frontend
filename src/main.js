import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import router from "./router";

import { useStyleStore } from "@/stores/dashboard/style.js";
import { useUserStore } from "@/stores/user.js";
import { styleKey } from "@/config.js";
import axios from "axios";
import { io } from "socket.io-client";

import "./css/dashboard/main.css";

const apiDomain = import.meta.env.VITE_API_DOMAIN;
const wsConnection = import.meta.env.VITE_WS_CONNECTION;

/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */

const app = createApp(App).use(pinia).use(router);

app.config.globalProperties.$serverUrl = apiDomain;

/* Axios available in all components */

const axiosModel = axios.create({
  baseURL: `${apiDomain}/api`,
  headers: {
    "Content-type": "application/json",
    Accpet: "application/json",
  },
});

axiosModel.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 403 &&
      error.response?.data?.message.includes("is blocked")
    ) {
      useUserStore(pinia).clearUser();
      router.push("/login");
    }
    // Do something with request error
    return Promise.reject(error);
  }
);

app.provide("axios", axiosModel);

app.provide(
  "socket",
  io(wsConnection, {
    // note changed URL here
    path: "/socket.io",
  })
);

app.mount("#app");

const styleStore = useStyleStore(pinia);

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
styleStore.setDarkMode(true);

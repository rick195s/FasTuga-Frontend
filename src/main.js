import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useMainStore } from "@/stores/dashboard/main.js";
import { useStyleStore } from "@/stores/dashboard/style.js";
import { darkModeKey, styleKey } from "@/config.js";
import axios from "axios";

import "./css/dashboard/main.css";

/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */
const app = createApp(App).use(router).use(pinia);

const serverBaseUrl = "http://localhost";
app.provide("serverBaseUrl", serverBaseUrl);
/* Axios available in all components */
const axiosModel = axios.create({
  baseURL: serverBaseUrl + "/api",
  headers: {
    "Content-type": "application/json",
    Accpet: "application/json",
  },
});
app.provide("axios", axiosModel);

app.mount("#app");

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);

axiosModel.defaults.headers.common.Authorization = mainStore.authToken;

/* Fetch sample data */
mainStore.fetch("clients");
mainStore.fetch("history");

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

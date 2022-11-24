import { createApp } from "vue";
import { createPinia } from "pinia";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";

import App from "./App.vue";

library.add(fas);

import router from "./router";


import { useMainStore } from "@/stores/dashboard/main.js";
import { useStyleStore } from "@/stores/dashboard/style.js";
import { darkModeKey, styleKey } from "@/config.js";




import "./css/dashboard/main.css";




/* Init Pinia */
const pinia = createPinia();


/* Create Vue app */
createApp(App).use(router).use(pinia).component('fa', FontAwesomeIcon).mount("#app");

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);

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

/* Default title tag */
const defaultDocumentTitle = "FasTuga";

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});

import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/dashboard/HomeView.vue";
import { useUserStore } from "@/stores/user";

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
    },
    path: "/dashboard",
    name: "dashboard",
    component: Home,
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/dashboard/ProfileView.vue"),
  },
  {
    meta: {
      title: "Login",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/LoginView.vue"),
  },
  {
    meta: {
      title: "Register",
    },
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/RegisterView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

/* Default title tag */
const defaultDocumentTitle = "FasTuga";

let handlingFirstRoute = true

router.beforeEach((to, from, next) => {  
  // if (handlingFirstRoute) {
  //   handlingFirstRoute = false
  //   next({name: 'Redirect', params: {redirectTo: to.fullPath}})
  //   return
  // } else if (to.name == 'Redirect') {
  //   next()
  //   return
  // }

  // when user not auth --------------------
  if (to.name == 'login') {
    next()
    return
  }
  
  // careful 
  // https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
  const userStore = useUserStore()  
  
  if (!userStore.user) {
    next({ name: 'login' })
    return
  }
  
  // ----------------------------------------


  // when user auth --------------------
  if (to.name == 'Reports') {
    if (userStore.user.type != 'A') {
      next({ name: 'home' })
      return
    }
  }
  if (to.name == 'User') {
    if ((userStore.user.type == 'A') || (userStore.user.id == to.params.id)) {
      next()
      return
    }
    next({ name: 'home' })
    return
  }

  // ----------------------------------------

  next()
})

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});

export default router;

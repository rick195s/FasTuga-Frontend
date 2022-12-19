import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/dashboard/HomeView.vue";
import Home from "@/views/front/HomeView.vue";
import { useUserStore } from "@/stores/user";
import RouteRedirector from "@/components/RouteRedirector.vue";

const routes = [
  {
    path: "/redirect/:redirectTo",
    name: "Redirect",
    component: RouteRedirector,
    props: (route) => ({ redirectTo: route.params.redirectTo }),
  },
  {
    meta: {
      title: "Home",
    },
    path: "/",
    name: "home",
    component: Home,
  },{
    meta: {
      title: "Board",
    },
    path: "/board",
    name: "board",
    component: () => import("@/views/front/PublicBoard.vue"),
  },
  {
    meta: {
      title: "Products",
    },
    path: "/products",
    name: "products",
    component: () => import("@/views/dashboard/ProductsView.vue"),
  },
  {
    meta: {
      title: "Dashboard",
    },

    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    meta: {
      title: "All Orders",
    },
    path: "/orders",
    name: "orders",
    component: () => import("@/views/dashboard/OrdersListView.vue"),
  },
  {
    meta: {
      title: "Order Details",
    },
    path: "/orders/:id",
    name: "order",
    component: () => import("@/views/dashboard/OrderView.vue"),
    props: (route) => ({ id: parseInt(route.params.id) }),
  },
  {
    meta: {
      title: "Items To Prepare",
    },
    path: "/orders/items/prepare",
    name: "itemsToPrepare",
    component: () => import("@/views/dashboard/OrderItemsView.vue"),
  },
  {
    meta: {
      title: "Items To Deliver",
    },
    path: "/orders/deliver",
    name: "ordersToDeliver",
    component: () => import("@/views/dashboard/DeliverOrdersView.vue"),
  },
  {
    meta: {
      title: "History",
    },
    path: "/customer/history",
    name: "history",
    component: () => import("@/views/dashboard/HistoryView.vue"),

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
      title: "Customer Profile",
    },
    path: "/customer/profile",
    name: "customerProfile",
    component: () => import("@/views/dashboard/ProfileView.vue"),
    props: () => ({ customer: true }),
  },

  {
    meta: {
      title: "Change Password",
    },
    path: "/change/password",
    name: "changePassword",
    component: () => import("@/views/dashboard/ChangePasswordView.vue"),
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

let handlingFirstRoute = true;

router.beforeEach((to, from, next) => {
  if (handlingFirstRoute) {
    handlingFirstRoute = false;
    next({ name: "Redirect", params: { redirectTo: to.fullPath } });
    return;
  } else if (to.name == "Redirect") {
    next();
    return;
  }
  // Careful!!! Using Handling first route to solve this
  // https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
  const userStore = useUserStore();

  if (!userStore.canGoTo(to)) {
    next({ name: "home" });
    return;
  }

  if ((to.name == "login" || to.name == "register") && userStore.user) {
    userStore.user.type == "EM" || userStore.user.type == "EC"
      ? next({ name: "dashboard" })
      : next({ name: "home" });
    return;
  }

  next();
});

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});

export default router;

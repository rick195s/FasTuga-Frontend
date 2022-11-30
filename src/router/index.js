import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/dashboard/HomeView.vue';
import { useUserStore } from '@/stores/user';
import RouteRedirector from '@/components/RouteRedirector.vue';

const routes = [
    {
        path: '/redirect/:redirectTo',
        name: 'Redirect',
        component: RouteRedirector,
        props: (route) => ({ redirectTo: route.params.redirectTo }),
    },
    {
        meta: {
            title: 'Home',
        },
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        meta: {
            title: 'Dashboard',
        },
        path: '/dashboard',
        name: 'dashboard',
        component: Home,
    },

    {
        meta: {
            title: 'Profile',
        },
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/dashboard/ProfileView.vue'),
    },
    {
        meta: {
            title: 'Login',
        },
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue'),
    },
    {
        meta: {
            title: 'Register',
        },
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/RegisterView.vue'),
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
const defaultDocumentTitle = 'FasTuga';

let handlingFirstRoute = true;

router.beforeEach((to, from, next) => {
    if (handlingFirstRoute) {
        handlingFirstRoute = false;
        next({ name: 'Redirect', params: { redirectTo: to.fullPath } });
        return;
    } else if (to.name == 'Redirect') {
        next();
        return;
    }

    // Careful!!! Using Handling first route to solve this
    // https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
    const userStore = useUserStore();

    // when user auth --------------------

    if (userStore.user) {
        if (to.name == 'login' || to.name == 'register') {
            userStore.user.type == 'A' ? next({ name: 'dashboard' }) : next({ name: 'home' });
        }
    }

    // ----------------------------------------

    next();
});

/* Set document title from route meta */
router.afterEach((to) => {
    document.title = to.meta?.title ? `${to.meta.title} — ${defaultDocumentTitle}` : defaultDocumentTitle;
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@LAY/DefaultLayout';
import NProgress from 'nprogress';
import { useAuthStore } from '@/stores/authStore';

const loadPage = (page) => {
    return () => import(/* @vite-ignore */ `../pages/${page}`); // Add /* @vite-ignore */ if needed
};

const generateRoutes = () => {
    const pages = import.meta.glob('../pages/**/*.vue');
    const routes = [
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: loadPage('NotFound.vue'),
        },
        {
            path: '/',
            redirect: '/homepage/0',
        },
        {
            path: '/login',
            name: 'Login',
            component: loadPage('userlogin/MainPage[0].vue'),
        },
    ];

    Object.keys(pages).forEach((key) => {
        const path = key.replace('../pages/', '').replace('.vue', '');
        const segments = path.split('/');
        const name = segments.join('-');
        const subdir = segments[0];

        const route = {
            path: `/${subdir}/${segments.length > 1 ? segments[1].match(/\d+/)[0] : '0'}`,
            name,
            component: pages[key],
            meta: { layout: DefaultLayout, requiresAuth: subdir === 'adminpage' },
        };

        routes.push(route);
    });

    return routes;
};

const routes = generateRoutes();

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    await authStore.fetchUser();

    console.log('Navigating to:', to.fullPath);
    console.log('Requires Auth:', to.meta['requiresAuth']);
    console.log('Is Authenticated:', authStore.isAuthenticated);

    if (to.meta['requiresAuth'] && !authStore.isAuthenticated) {
        console.log('Not authenticated, redirecting to /login');
        next({ path: '/login' });
    } else {
        NProgress.start();
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});

export function install(app) {
    app.use(router);
}

export default router;

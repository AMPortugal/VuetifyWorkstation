// src/modules/modRouter.js
import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@LAY/DefaultLayout';
import NProgress from 'nprogress';
import { useAuthStore } from '@/stores/authStore';

function loadPage(page) {
    return () => import(/* @vite-ignore */ `@/pages/${page}`);
}

function generateRoutes() {
    const pages = import.meta.glob('../pages/**/*.vue');
    const routes = [
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: loadPage('NotFound'),
        },
        {
            path: '/',
            redirect: '/homepage/0',
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/components/g-usersComponent/LoginComponent.vue'),
        },
        {
            path: '/useradmin/0',
            name: 'UserAdmin',
            component: () => import('@/pages/useradmin/MainPage[0].vue'),
            meta: { requiresAuth: true },
        },
    ];

    Object.keys(pages).forEach((key) => {
        const path = key.replace('../pages/', '').replace('.vue', '');
        const segments = path.split('/');
        const name = segments.join('-');
        const subdir = segments[0];

        if (segments.length > 1 && /\d+/.test(segments[1])) {
            const pageIndex = segments[1].match(/\d+/)[0];

            routes.push({
                path: `/${subdir}/${pageIndex}`,
                name,
                component: pages[key],
                meta: { layout: DefaultLayout, requiresAuth: subdir === 'adminpage' },
            });
        } else {
            routes.push({
                path: `/${subdir}/0`,
                name,
                component: pages[key],
                meta: { layout: DefaultLayout, requiresAuth: subdir === 'adminpage' },
            });
        }
    });

    return routes;
}

const routes = generateRoutes();

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    await authStore.fetchUser();

    if (to.meta['requiresAuth'] && !authStore.isAuthenticated) {
        next({ name: 'Login' });
    } else {
        NProgress.start();
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});

export default router;

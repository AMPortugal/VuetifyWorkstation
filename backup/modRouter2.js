import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@LAY/DefaultLayout';
import NProgress from '../utils/nprogressConfig';
import 'nprogress/nprogress.css';

function loadPage(page) {
    return () => import(`@/pages/${page}.vue`);
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
    ];

    const subdirs = new Set();

    Object.keys(pages).forEach((key) => {
        const path = key.replace('../pages/', '').replace('.vue', '');
        const segments = path.split('/');
        const name = segments.join('-');
        const subdir = segments[0];

        subdirs.add(subdir);

        if (segments.length > 1 && /\d+/.test(segments[1])) {
            const pageIndex = segments[1].match(/\d+/)[0];

            routes.push({
                path: `/${subdir}/${pageIndex}`,
                name,
                component: pages[key],
                meta: { layout: DefaultLayout },
            });
        }
    });

    // Adicionar redirecionamento para `/subdir` que leva a `/subdir/0`
    subdirs.forEach((subdir) => {
        routes.push({
            path: `/${subdir}`,
            redirect: `/${subdir}/0`,
        });
    });

    return routes;
}

const routes = generateRoutes();

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(() => {
    NProgress.start();
});

router.afterEach(() => {
    NProgress.done();
});

export function install(app) {
    app.use(router);
}

export default router;

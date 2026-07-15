import {
  createRouter,
  createWebHistory,
  START_LOCATION
} from 'vue-router';
import pageRoutes from './page';
import {
  waitForTransition,
  triggerTransitionOut
} from '@/src/utils/transition';
import { websiteConfig } from '@/src/config';

const router = createRouter({
  history: createWebHistory(),
  routes: [...pageRoutes],
  async scrollBehavior(to, from, savedPosition) {
    await waitForTransition();
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  if (from !== START_LOCATION && to.path !== from.path) {
    triggerTransitionOut();
  }
});

router.afterEach((to) => {
  const pageTitle = to.meta && to.meta.title;
  if (to.path === '/' || !pageTitle) {
    document.title = websiteConfig.title;
  } else {
    document.title = `${pageTitle} | ${websiteConfig.title}`;
  }
});

export default router;

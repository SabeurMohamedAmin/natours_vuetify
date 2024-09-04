import { createWebHistory, createRouter } from "vue-router";
import authRoutes from "@/router/auth.js";
import checkoutRoutes from "@/router/checkout.js";

import HomeView from "@/views/HomeView.vue";
import ContactView from "@/views/ContactView.vue";

const routes = [
  { path: "/", name: "homePage", component: HomeView },
  {
    path: "/tours/:slug",
    name: "tourPage",
    component: () => import(/* webpackChunkName: "TourView" */"@/views/TourView.vue"),
  },
  { path: "/contact", name: "contactPage", component: ContactView },
  // Add the authRoutes to the routes array
  ...authRoutes, ...checkoutRoutes
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes,
});

export default router;

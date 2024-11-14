import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // { path: "/", redirect: "/login" },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () => import("@/views/login-page.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

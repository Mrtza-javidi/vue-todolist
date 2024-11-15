import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/todos" },
  {
    path: "/todos",
    name: "todos",
    component: () => import("../views/todos-list.vue"),
  },
  {
    path: "/todos/:id",
    name: "TodoDetails",
    component: () => import("@/views/todo-details.vue"),
    // props: true, // Pass route params as props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

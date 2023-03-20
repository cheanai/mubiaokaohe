import { createRouter, createWebHistory } from "vue-router";

let routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/view/login/login.vue"),
  },
  {
    path: "/index",
    name: "index",
    redirect: {name: 'main' },
    component: () => import("@/view/index/index.vue"),
    children: [
      {
        path: "main",
        name: "main",
        component: () => import("@/view/main/main.vue"),
      },
      {
        path: "two",
        name: "two",
        component: () => import("@/view/main/two.vue"),
      },
    ],
  },
  {
    path: "/dialog",
    name: "dialog",
    component: () => import("@/view/homeView.vue"),
  },
];
// 路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// 导出
export default router;

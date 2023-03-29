import { createRouter, createWebHistory } from "vue-router";
import { useMain } from "@/store/home";
let routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/view/login/login.vue"),
  },
  {
    path: "/index",
    name: "index",
    redirect: { name: "main" },
    component: () => import("@/view/index/index.vue"),
    children: [
      {
        path: "main",
        name: "main",
        component: () => import("@/view/main/main.vue"),
      },
      {
        path: "main1",
        name: "main1",
        component: () => import("@/view/main/main1.vue"),
      },
      {
        path: "one",
        name: "one",
        component: () => import("@/view/main/one.vue"),
      },
      {
        path: "two",
        name: "two",
        component: () => import("@/view/main/two.vue"),
      },
      {
        path: "three",
        name: "three",
        component: () => import("@/view/main/three.vue"),
      },
      {
        path: "four",
        name: "four",
        component: () => import("@/view/main/four.vue"),
      },
      {
        path: "five",
        name: "five",
        component: () => import("@/view/main/five.vue"),
      },
      {
        path: "six",
        name: "six",
        component: () => import("@/view/main/six.vue"),
      },
      {
        path: "seven",
        name: "seven",
        component: () => import("@/view/main/seven.vue"),
      },
      {
        path: "eight",
        name: "eight",
        component: () => import("@/view/main/eight.vue"),
      },
      {
        path: "nine",
        name: "nine",
        component: () => import("@/view/main/nine.vue"),
      },
      {
        path: "ten",
        name: "ten",
        component: () => import("@/view/main/ten.vue"),
      },
      {
        path: "eleven",
        name: "eleven",
        component: () => import("@/view/main/eleven.vue"),
      },
      {
        path: "twelve",
        name: "twelve",
        component: () => import("@/view/main/twelve.vue"),
      },
      {
        path: "thirteen",
        name: "thirteen",
        component: () => import("@/view/main/thirteen.vue"),
      },
      {
        path: "fourteen",
        name: "fourteen",
        component: () => import("@/view/main/fourteen.vue"),
      },
      {
        path: "fifteen",
        name: "fifteen",
        component: () => import("@/view/main/fifteen.vue"),
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
router.beforeEach((to, from, next) => {
  const store = useMain();
  console.log(store.name);
  if (to.path !== "/" && !store.name) {
    // 即使位置与当前位置相同，也会触发导航。
    // 注意，这也将向历史记录中添加一个新条目，除非“replace:true”`通过
    // 添加 force 字段后，地址栏不会在登录失效后，跳转到其他页面，点击history只会停留在/login
    next({ path: "/", replace: true ,force:true});
  } else {
    next();
  }
});
// 导出
export default router;

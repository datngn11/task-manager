import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    children: [
      {
        path: "new",
        name: "NewTask",
        component: () => import("@/components/forms/TaskForm.vue")
      },
      {
        path: "edit/:id",
        name: "EditTask",
        component: () => import("@/components/forms/TaskForm.vue")
      },
      {
        path: "newList",
        name: "NewList",
        component: () => import("@/components/forms/TaskForm.vue")
      },
      {
        path: "editCard/:id",
        name: "EditCard",
        component: () => import("@/components/lists/CardModal.vue"),
        props: true
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

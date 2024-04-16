import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import BasicLayout from "@/layout/BasicLayout.vue";
// @ts-ignore
import fileLayout from "@/layout/fileLayout.vue";
import { useStoreUser } from "@/stores/modules/user";
import { Message } from "@arco-design/web-vue";
import config from "/config/config";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/admin/login")
    },
    {
      path: "/markdown/:id?",
      name: "markdown",
      component: () => import("@/views/admin/markdown")
    },
    {
      path: "/",
      name: "layout",
      redirect: "/article",
      component: BasicLayout,
      children: [
        {
          path: "article",
          name: "home",
          component: () => import("@/views/flows/index")
        },
        {
          path: "article/:id",
          name: "browse",
          component: () => import("@/views/browse/index")
        },
        {
          path: "classification/:type/:name",
          name: "classification",
          component: () => import("@/views/flows/index")
        },
      ]
    },
    {
      path: "/files",
      name: "filesLayout",
      redirect: "/files",
      component: fileLayout,
      children: [
        {
          path: "list",
          name: "fileList",
          component: () => import("@/views/files/index")
        },
      ]
    }
  ]
});
const {routesBlackList} = config

router.beforeEach(async (to, _, next) => {
  const userStore: any = useStoreUser()
  Message.clear();
  const logged = !!userStore.user?.token
  if (logged) {
    if (to.path === '/login') {
      next({ path: '/', replace: true })
    } else {
      next()
    }
  } else {
    if(routesBlackList.find((item: string) => to.path.startsWith(item))) {
      next({ path: '/login', query: { redirect: to.path }, replace: true })
    } else {
      next()
    }
  }
})

export default router;

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

//如首页和登录页和一些不用权限的公用页面
export const commontRouterMap = [
  {
    path: "/",
    name:'首页',
    component: () => import("@/views/Home"),
  },
  
];

//实例化vue的时候只挂载commontRouterMap
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: commontRouterMap
})
const router = createRouter()

//重置路由
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router;

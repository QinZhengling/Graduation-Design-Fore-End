import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ImageViewer from '../components/ImageViewer.vue'
const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/LoginView.vue")
  }, {
    path: '/TeachertView',
    name: 'TeachertView',
    component: () => import("@/views/TeacherView.vue")
  }, {
    path: '/home',
    name: 'StudentView',
    component: () => import("@/views/StudentView.vue")
  }, {
    path: '/image/:id',
    component: ImageViewer,
    name: 'image-viewer'
  }, {
    path: '/Teacher2',
    name: 'Teacher2',
    component: () => import("@/views/TeacherView2.vue")
  }

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = sessionStorage.getItem('userInfo');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router
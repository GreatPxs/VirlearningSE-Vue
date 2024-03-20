import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/HomePage.vue'),
      children: [
        {
          path: '',
          name: 'homeIndexView',
          component: () => import('@/views/home/HomeIndexView.vue')
        },
        {
          path: '/user-info',
          name: 'userInfo',
          component: () => import('@/views/user/userInfo.vue')
        },
        {
          path: '/testInfo',
          name: 'testInfo',
          component: () => import('@/views/test/testInfo.vue')
        },
        {
          path: '/testPage',
          name: 'testPage',
          component: () => import('@/views/test/testPage.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/loginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/login/registerView.vue')
    },
    {
      path: '/manage-login',
      name: 'manage-login',
      component: () => import('@/views/manageLogin/ManageLoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      children: [
        {
          path: '/admin/users',
          name: 'users',
          component: () => import('@/views/userManage/UserIndex.vue')
        },
        {
          path: '/admin/case',
          name: 'caseIndex',
          component: () => import('@/views/case/CaseIndex.vue')
        },
        {
          path: '/admin/case/create',
          name: 'case-create',
          component: () => import('@/views/case/CaseCreateOrEdit.vue')
        },
        {
          path: '/admin/question',
          name: 'questionIndex',
          component: () => import('@/views/questions/QuestionIndex.vue')
        },
        {
          path: '/admin/testPaper',
          name: 'testPaperIndex',
          component: () => import('@/views/testPaper/TestPaperIndex.vue')
        },
        {
          path: '/admin/test',
          name: 'testIndex',
          component: () => import('@/views/testManage/TestIndex.vue')
        }
      ],
      component: () => import('@/components/layout/AppLayout.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

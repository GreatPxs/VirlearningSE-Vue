import { createRouter, createWebHistory } from 'vue-router'
import { useTokenAndRoleStore } from '@/stores/tokenAndRole'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true,
        requiresUser: true
      }, // 定义判断的具体路由
      component: () => import('../views/home/HomePage.vue'),
      children: [
        {
          path: '',
          name: 'homeIndexView',
          component: () => import('@/views/home/HomeIndexView.vue')
        },
        {
          path: '/guide',
          name: 'guide',
          component: () => import('@/views/guide/GuideOverview.vue')
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
        },
        {
          path: '/caseStudy',
          name: 'caseStudy',
          component: () => import('@/views/caseStudy/caseStudyIndex.vue')
        },
        {
          path: '/caseList',
          name: 'caseList',
          component: () => import('@/views/caseStudy/caseList.vue')
        },
        {
          path: '/casePage',
          name: 'casePage',
          component: () => import('@/views/caseStudy/CasePage.vue')
        },
        {
          path: '/chooseRole',
          name: 'chooseRole',
          component: () => import('@/views/rolePlay/ChooseRole.vue')
        },
        {
          path: '/rolePage',
          name: 'rolePage',
          component: () => import('@/views/rolePlay/RolePage.vue')
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
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }, // 定义判断的具体路由
      children: [
        {
          path: '/admin/adminUserInfo',
          name: 'adminUserInfo',
          component: () => import('@/views/adminUser/adminUserInfo.vue')
        },
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
          component: () => import('@/views/case/CaseCreate.vue')
        },
        {
          path: '/admin/case/:id/edit',
          name: 'case-edit',
          component: () => import('@/views/case/CaseEdit.vue')
        },
        {
          path: '/admin/question',
          name: 'questionIndex',
          component: () => import('@/views/questions/QuestionIndex.vue')
        },
        {
          path: '/admin/testPaper/:id/PaperQuestion',
          name: 'paperQuestion',
          component: () => import('@/views/testPaper/PaperQuestion.vue')
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
        },
        {
          path: '/admin/test/:id/testExaminee',
          name: 'testExaminee',
          component: () => import('@/views/testManage/TestExaminee.vue')
        },
        {
          path: '/admin/drug',
          name: 'drugIndex',
          component: () => import('@/views/drug/drugIndex.vue')
        },
        {
          path: '/admin/room',
          name: 'roomIndex',
          component: () => import('@/views/room/roomIndex.vue')
        },
        {
          path: '/admin/roles',
          name: 'rolesIndex',
          component: () => import('@/views/roles/rolesIndex.vue')
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

router.beforeEach((to, from, next) => {
  const store = useTokenAndRoleStore() // 获取存储状态
  if (to.matched.some((r) => r.meta.requiresAuth)) {
    if (store.tokenAndRole.token && store.tokenAndRole.token !== '') {
      if (to.matched.some((r) => r.meta.requiresUser)) {
        if (store.tokenAndRole.role === '0') {
          next()
        } else {
          next(false)
        }
      }

      if (to.matched.some((r) => r.meta.requiresAdmin)) {
        if (store.tokenAndRole.role === '1' || store.tokenAndRole.role === '2') {
          next()
        } else {
          next(false)
        }
      }

      next()
    } else {
      if (to.matched.some((r) => r.name === 'admin')) {
        next({ name: 'manage-login', query: { redirect: to.fullPath } })
      }

      next({ name: 'login', query: { redirect: to.fullPath } })
    }
  }
  next() // 如果不要求权限，就按原地址跳转
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Data from '@/views/Data/quetion/Data.vue'
import DataOne from '../views/Data/quetion/Data.vue'
import DataTwo from '@/views/Data/neikong/DataTwo.vue'
import DataThree from '../views/Data/Rule/DataThree.vue'
import DataSelect from '../views/Data/quetion/DataSelect.vue'
import DataSearch from '../views/Data/quetion/DataSearch.vue'
import DataManage from '../views/Data/quetion/DataOne.vue'
import DataDetil from '../views/Data/quetion/DataDetil.vue'
import PublicOne from '../views/Pulic/house/PublicOne.vue'
import PublicTwo from '../views/Pulic/submit/PublicTwo.vue'
import PublicThree from '../views/Pulic/shenqing/PublicThree.vue'
import PublicAdd from '@/views/Pulic/house/PublicAdd.vue'
import PublicObject from '../views/Pulic/object/PublicObject.vue'
import ObjectAdd from '../views/Pulic/object/ObjectAdd.vue'
import ObjectDetil from '../views/Pulic/object/ObjectDetil.vue'
import Shop from '../views/shenpi/Shop.vue'
import Home from '../views/Home.vue'
import HomeOne from '../views/Home/1.vue'
import HomeTwo from '../views/Home/2.vue'
import HomeThree from '../views/Home/3.vue'
import HomeFour from '../views/Home/4.vue'
import DataAdd from '../views/Data/quetion/DataAdd.vue'
import Bpmn from '../views/Bpmn.vue'
import Activti from '../views/activti/activiti.vue'
import PublicDetile from '../views/Pulic/house/Publicdetile.vue'
import userList from '../views/userset/userList.vue'
import Task from '../views/activti/task.vue'


Vue.use(VueRouter)
export const publicrouter = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/waring/404'),
    hidden: true
  },
  {
    path: '/bpmn',
    name: 'bpmn',
    component: Bpmn
  },
  // {
  //   path: '/userlist',
  //   name: 'UserList',
  //   commponent: userList
  // },
  //公共路由入口
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/HomeView.vue'),
    redirect: '/index/one',
    title: '主页',
    children: [
      {
        path: 'index',
        name: 'Index',
        redirect: '/index/one',
        component: () => import("@/views/Home"),
        hidden: true,
        children: [
          {
            path: 'one',
            name: 'One',
            component: () => import('@/views/Home/1')
          },
          {
            path: 'two',
            name: 'Two',
            component: () => import('@/views/Home/2')
          },
          {
            path: 'three',
            name: 'Three',
            component: () => import('@/views/Home/3')
          },
          {
            path: 'four',
            name: 'Four',
            component: () => import('@/views/Home/4')
          },
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/index/one',
  },

]
export const ansycrouter = [
  {
    path: '/data',
    name: 'Data',
    component: () => import('@/views/Data/quetion/Data.vue'),
    title: '数据池',
    redirect: '/dataone/datasearch',
    children: [
      {
        path: 'dataselect',
        name: 'DataSelect',
        component: () => import('@/views/Data/quetion/DataSelect.vue'),
        title: '一键画像'
      },
      {
        path: 'dataone',
        name: 'DataOne',
        component: () => import('@/views/Data/quetion/Data.vue'),
        title: '问题库',
        children: [
          {
            path: 'datasearch',
            name: 'DataSearch',
            component: () => import('@/views/Data/quetion/DataSearch.vue'),
            title: '数据查询',
            hidden: true
          },
          {
            path: 'datamanage',
            name: 'DataManage',
            component: () => import('@/views/Data/quetion/DataOne.vue'),
            hidden: true
          }
        ]
      },
      {
        path: 'datatwo',
        name: 'Datatwo',
        component: () => import('@/views/Data/neikong/DataTwo.vue'),
        title: '内控库',
      },

    ]
  }
]
export const routes = [

  {
    path: '/',
    name: 'mian',
    component: HomeView,
    redirect: '/index/one',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Home,
        redirect: '/index/one',
        children: [
          {
            path: '/index/one',
            name: 'indexone',
            component: HomeOne,
          },
          {
            path: '/index/two',
            name: 'indextwo',
            component: HomeTwo,
          },
          {
            path: '/index/three',
            name: 'indexthree',
            component: HomeThree,
          },
          {
            path: '/index/four',
            name: 'indexfour',
            component: HomeFour,
          },

        ]
      },
      {
        path: '/bpmn',
        name: 'bpmn',
        component: Bpmn
      },
      // {
      //   path: '/userlist',
      //   name: 'UserList',
      //   commponent: userList
      // },
    ]
  },
  {
    path: '/data',
    name: 'Data',
    component: HomeView,
    children: [
      {
        path: '/data',
        name: 'data',
        component: Data
      },
      {
        path: '/datadd',
        name: 'datadd',
        component: DataAdd,
        meta: {
          keepAlive: true // 需要缓存
        }
      },
      {
        path: '/data1',
        name: 'Dataone',
        component: DataOne,
        // redirect: '/data1/datasearch',
        children: [
          {
            path: '/data1/datasearch',
            name: 'Datasearch',
            component: DataSearch
          },
          {
            path: '/data1/datamanage',
            name: 'datamanage',
            component: DataManage
          }
        ]
      },
      {
        path: '/data2',
        name: 'data2',
        component: DataTwo,
        redirect: '/control-in',
        children: [
          {
            path: '/control-in',
            name: 'Control-In',
            component: () => import('../views/Data/neikong/Controlin.vue')
          },
          {
            path: '/control-out',
            name: 'Control-Out',
            component: () => import('../views/Data/neikong/ControlOut.vue')
          }
        ]
      },
      {
        path: '/controladd',
        name: 'ControlAddin',
        component: () => import('../views/Data/neikong/ControlAddin.vue')
      },
      {
        path: '/controldetile',
        name: 'ControlDetile',
        component: () => import('../views/Data/neikong/Controldetile.vue')
      },
      {
        path: '/data3',
        name: 'data3',
        component: DataThree
      },
      {
        path: '/info',
        name: 'Info',
        component: () => import('@/views/Data/info/audi.vue'),
      },
      {
        path: '/info_audi_audiadd',
        name: 'AudiAdd',
        component: () => import('../views/Data/info/audiadd.vue')
      },
      {
        path: '/audidetile',
        name: 'audidetile',
        component: () => import('../views/Data/info/audidetile.vue')
      },
      {
        path: '/addunit',
        name: 'addunit',
        component: () => import('../views/Data/info/unitadd.vue')
      },
      {
        path: '/unitdetile',
        name: 'unitdetile',
        component: () => import('../views/Data/info/unitdetile.vue')
      },
      {
        path: '/rule-add',
        name: 'RuleAdd',
        component: () => import('../views/Data/Rule/RuleAdd.vue')
      },
      {
        path: '/dataselect',
        name: 'dataselect',
        component: DataSelect
      },
      {
        path: '/datadetil',
        name: 'datadetil',
        component: DataDetil
      },
      {
        path: '/ruledetil',
        name: 'Ruledetil',
        component: () => import('@/views/Data/Rule/Ruledetile.vue')
      },
      {
        path: '/setrules',
        name: 'SetRules',
        component: () => import('../views/Data/rules/SetRule.vue')
      },
      {
        path: '/excli',
        name: 'Excli',
        component: () => import('@/views/Data/excli/excli.vue')
      }
    ]
  },
  {
    path: '/public',
    name: 'Public',
    component: HomeView,
    children: [
      {
        path: '/public1',
        name: 'public1',
        component: PublicOne
      },
      {
        path: '/publicobject',
        name: 'publicobject',
        component: PublicObject
      },
      {
        path: '/myApplication',
        name: 'myApplication',
        component: () => import('../views/Pulic/shenqing/myApplication.vue')
      },
      {
        path: '/objectadd',
        name: "objectadd",
        component: ObjectAdd
      },
      {
        path: '/objectdetil',
        name: 'objectdetil',
        component: ObjectDetil
      },
      {
        path: '/public2',
        name: 'public2',
        component: PublicTwo
      },
      {
        path: '/submit-add',
        name: 'SubmitAdd',
        component: () => import('@/views/Pulic/submit/submitAdd.vue')
      },
      {
        path: '/public3',
        name: 'public3',
        component: PublicThree
      },
      {
        path: '/pulicadd',
        name: "PulicAdd",
        component: PublicAdd
      },
      {
        path: '/pulicdtile',
        name: "pulicdtile",
        component: PublicDetile
      },
      {
        path: '/rent',
        name: 'Rent',
        component: () => import('@/views/Pulic/rent/rent.vue')
      },
      {
        path: '/houseprocure',
        name: 'houseProcure',
        component: () => import('@/views/Pulic/shenqing/houseProcure.vue')
      },
      {
        path: '/housereload',
        name: 'houseReload',
        component: () => import('@/views/Pulic/shenqing/reload.vue')
      }
    ]
  },
  {
    path: '/shenpi',
    name: 'Shenpi',
    component: HomeView,
    children: [
      {
        path: '/shop',
        name: 'shop',
        component: Shop
      },
      {
        path: '/collabappro',
        name: 'CollabAppro',
        component: () => import('@/views/shenpi/CollabAppro.vue')
      },
      {
        path: '/addappor',
        name: 'Addappor',
        component: () => import('@/views/shenpi/addappor.vue')
      },
      //审批页面
      {
        path: '/procure',
        name: 'Procure',
        component: () => import('@/views/shenpi/procure.vue')
      }
    ]
  },
  {
    path: '/notice',
    name: 'Notice',
    component: HomeView,
    children: [
      {
        path: '/datanotice',
        name: 'DataNotice',
        component: () => import('@/views/notice/datanotice.vue')
      },
      {
        path: '/housenotice',
        name: 'HouseNotice',
        component: () => import('@/views/notice/housenotice.vue')
      },
      {
        path: '/procurenotice',
        name: 'ProcureNotice',
        component: () => import('@/views/notice/procurenotice.vue')
      },
    ]
  },
  {
    path: '/setting',
    name: 'Setting',
    component: HomeView,
    children: [
      {
        path: '/dictsetting',
        name: 'DictSetting',
        component: () => import('@/views/userset/dictsetting.vue')
      },
      {
        path: '/rolesetting',
        name: 'RoleSetting',
        component: () => import('@/views/userset/rolesetting.vue')
      },
      // {
      //   path: '/userlist',
      //   name: 'UserList',
      //   commponent: () => import('@/views/userset/userList.vue')
      // },
      {
        path: '/meunsetting',
        name: 'MeunSetting',
        component: () => import('@/views/userset/meunsetting.vue')
      },
      {
        path: '/risksetting',
        name: 'RiskSetting',
        component: () => import('@/views/userset/rulesetting.vue')
      },

    ]
  },
  {
    path: '/active',
    name: 'Actibe',
    component: HomeView,
    children: [
      {
        path: '/activit',
        name: 'activit',
        component: Activti
      },
      {
        path: '/task',
        name: "task",
        component: Task
      }
    ]
  },

  // // 错误路由重定向
  // {
  //   path: '*',
  //   redirect: '/index/one',
  // },
  {
    path: '/bpmn',
    name: 'bpmn',
    component: Bpmn
  },
  {
    path: '/empty',
    name: 'Empty',
    component: () => import('@/views/empty.vue')
  }
]



//路由模式history，去掉#号
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPath = VueRouter.prototype.push
//回调函数解决重复路由跳转问题
VueRouter.prototype.push = function push(location) {
  return originalPath.call(this, location).catch(err => err)
}

// let isRoute =null
// store.dispatch('GenerateRoutes').then(accessRoutes => {
//   console.log(accessRoutes, '12111')
//     accessRoutes.forEach(res => {
//       console.log(res,'99999aa')
//   //  return isRoute = res 
//    router.addRoute({...res})
//     }
//     )
// }
// )


// console.log(isRoute, '4444')
// // router.addRoute({ ...isRoute })
// // router.addRoute({
// //   path: '/data',
// //   name: 'DataSelect',
// //   component: () => import('@/views/Data/quetion/DataSelect.vue'),
// //   title: '一键画像'
// // },)
// console.log(publicrouter, '333')

export default router


import { publicrouter, routes } from "@/router";
import { getUserMeun } from "@/api/getUser";
import HomeView from '@/views/HomeView.vue'
import router from "@/router";
const permission = {
  state: {
    routers: [],
    addRoutes: [],
    meunRouter: [],
  },
  mutations: {
    SET_ROUTES: (state, routes) => {

      state.addRoutes = routes
      state.routers = publicrouter.concat(routes)
      console.log(state.routers)
    },
    SET_MEUNROUTES: (state, routes) => {
      const data = filterRouter(routes)
      state.meunRouter = data
    },

  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getUserMeun().then(res => {
          console.log(res, 'res')
          const accessedRoutes = filterAsyncRouter(res.data)
          commit('SET_ROUTES', accessedRoutes)
          commit('SET_MEUNROUTES', accessedRoutes)
          resolve(accessedRoutes)
          // router.push('/public/public2')
        })
      })
    },
    //筛选路由
    // SelectRoutes({ commit }) {
    //   return new Promise(resolve => {
    //     // 向后端请求路由数据
    //     getUserMeun().then(res => {
    //       const accessedRoutes = selectAsyncRouter(res.data)
    //       console.log(accessedRoutes, 'a')
    //       commit('SET_ROUTES', accessedRoutes)
    //       resolve(accessedRoutes)
    //     })
    //   })
    // }    
  }
}
function selectAsyncRouter(asyncRouterMap) {
  console.log(asyncRouterMap, '1')
  return asyncRouterMap.filter(route => {
    console.log(route)
    if (route.name && route.name !== '') {

    }
    if (route.children) {
      route.children = selectAsyncRouter(route.children)
    }
    return true
  })
}

function filterRouter(data) {
  return data.filter(item => {
    if (item.hidden === false) {
      if (item.children) {
        item.children = filterRouter(item.children)
      }
      return true;
    }
    return false
  })
}
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.children) {
      const length = route.children.length
      for (var i = 0; i < length; i++) {
        route.children[i].path = route.path + '/' + route.children[i].path
      }
      // route.children.path = route.path + '/' + route.children.path
    }
    if (route.component === 'HomeView') {
      route.component = HomeView
    }
    else {
      route.component = loadView(route.component)
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}
export default permission

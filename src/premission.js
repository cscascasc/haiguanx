import router from "./router";
import store from "./store";

// store.dispatch('GenerateRoutes')

router.beforeEach(async (to, form, next) => {
    await store.dispatch('user').then(res => {
        console.log(store.state)
        if (store.state.userinfo.token === true) {
            if (store.state.permission.routers.length !== 0) {
                next()
            } else {
                store.dispatch('GenerateRoutes').then(res => {
                    for (var i = 0; i < res.length; i++) {
                        router.addRoute(res[i])
                        router.options.routes.push(res[i])
                    }
                    router.addRoute({
                        path: '*',
                        redirect: '/index/one'
                    })
                    next({ ...to, replace: true })
                })
            }
        }
    })
    next()
})

//  // NProgress Configuration
// const whiteList = ['/login'] // no redirect whitelist
// const hasToken = true
// const hasRoles = true
// router.beforeEach(async(to, from, next) => {
//   if (hasToken) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//     } else {
//       if(hasRoles){
//         next()
//       }else{
//         try {
//           await store.dispatch('GenerateRoutes').then(res => {
//             router.addRoute(res[0])
//             router.options.routes = store.getters.routes
//             next({ ...to, replace: true })
//           })
//         } catch (error) {
//         }
//       }
//     }
//   }
// })




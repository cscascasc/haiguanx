import router from "./router";
import store from "./store";

// store.dispatch('GenerateRoutes')

router.beforeEach(async (to, form, next) => {
    await store.dispatch('user').then(res => {
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
                    console.log(router.options.routes, 'store.res')
                    console.log('进入2')
                    next({ ...to, replace: true })
                })
            }
        }
    })
    next()
})






import Vue from "vue";
import Vuex from 'vuex'
import Tab from './tab'
import permission from "./premion";
import getter from "./getter";
import userinfo from "./modle/userinfo";
Vue.use(Vuex)
//创建vuex的实例
const store = new Vuex.Store({
    modules: {
        Tab,
        permission,
        userinfo,
    },
    getter
})

export default store


import http from "@/utils/request";
import store from "@/store";
export function getUserRole() {
    return http({
        method: 'get',
        url: '/role/details',
        params: {
            userId: 'test'
        }
    }
    )
}
export function getUserMeun() {
    console.log(store.state.userinfo)
    return http({
        method: 'get',
        url: '/menu/getRouters',
        params: {
            userId: store.state.userinfo.userID
        }
    })
}
//获取动态用户
export function getuser() {
    return http(
        {
            method: 'get',
            url: 'user/index'
        }
    )
}
//获取退租审批人
export function getHouseExainme(customType) {
    return http(
        {
            method: 'get',
            url: '/user/rentExamine',
            params: {
                customsType: customType
            }
        }
    )
}
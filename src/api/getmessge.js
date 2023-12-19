import http from '../utils/request'
import store from '@/store'
//获取消息数量
export function getMessage(datas) {
    return http({
        url: '/notice/num',
        method: 'get',
        params: {
            id: store.state.userinfo.userID,
            deptId: store.state.userinfo.userdepartment
        }
    })
}
export function getMsgText(data) {

    return http({
        url: '/notice/page',
        method: 'get',
        params: data,
        // data:{
        //     "user":"test"
        // }
    })

}
//消息已读
export function readMsg(id) {
    return http(
        {
            method: 'post',
            url: '/notice/read',
            data: {
                id: id
            }
        }
    )
}
//一键已读
export function readAllMsg(id) {
    return http(
        {
            method: 'get',
            url: '/notice/oneClickRead/' + id.id,
        }
    )
}
//消息删除
export function delelemessage(id) {
    return http({
        method: 'get',
        url: '/notice/remove',
        params: {
            ids: id
        }
    })
}
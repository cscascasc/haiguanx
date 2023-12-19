import http from "@/utils/request";
//获取住房列表
export function getHouseList(data) {
    return http({
        method: 'GET',
        url: '/house/page',
        params: data
    })
}
//获取住房申请列表
export function gethouseApproList(current) {
    return http({
        method: 'get',
        url: '/houseLodging/page',
        params: {
            size: '9',
            current: current,

        }
    })
}
//获取行政区域树
export function getHouseTree() {
    return http({
        method: 'GET',
        url: '/house/distribution'
    })
}
//获取当前用户的申请列表
export function getUserAppro(data) {
    return http({
        method: 'get',
        url: '/houseLodging/page',
        params: data
    })
}
//获取当前用户的审核列表
export function getUserauditList(data) {
    return http({
        method: 'get',
        url: '/houseLodging/page',
        params: data
    })
}
//获取入住申请详情
export function getApprodetile(id) {
    return http({
        method: 'get',
        url: '/houseLodging/details',
        params: {
            id: id
        }
    })
}
//退房申请
export function exit(form) {
    return http(
        {
            method: 'post',
            url: '/houseLodging/rentRefund',
            data: form
        }
    )
}
//获取住房详情
export function gethousedetile(id) {
    return http(
        {
            method: 'get',
            url: '/house/details',
            params: {
                houseId: id
            }
        }
    )
}
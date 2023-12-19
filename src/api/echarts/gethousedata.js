import http from "@/utils/request";
//获取住房数据统计
export function gethousedata() {
    return http({
        method: 'get',
        url: '/visualized/getHouseStat'
    })
}
//住房收费统计
export function gethousepaydata() {
    return http({
        method: 'get',
        url: '/visualized/housePaymentStat'
    })
}
//入住情况统计
export function gethouseinaera() {
    return http({
        method: 'get',
        url: '/visualized/housingStat'
    })
}
//贵阳全关的入住统计
export function gethousecustoms() {
    return http({
        method: 'get',
        url: '/visualized/houseCustomsStat'
    })
}
//贵阳海关住房类型
export function gethousetype(){
    return http({
        method:'get',
        url:'/visualized/houseTypeStat'
    })
}
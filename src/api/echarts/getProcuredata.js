import http from "@/utils/request";

export function getprocurecount() {
    return http({
        method: 'get',
        url: '/visualized/getProcureStat'
    })
}
export function getprocuretype() {
    return http({
        method: 'get',
        url: '/visualized/processTypeStat'
    })
}
export function getprocurecustom() {
    return http({
        method: 'get',
        url: '/visualized/getCustomsStat'
    })
} 
export function getprocuredept(id){
    return http({
        method:'get',
        url:'/visualized/deptStat',
        params:{
            customsId:id
        }
    })
}
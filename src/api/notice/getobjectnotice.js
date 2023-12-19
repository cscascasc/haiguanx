import http from "@/utils/request";
export function getpurchaseExamine(data) {
    return http({
        method: 'get',
        url: '/notice/purchaseExamine',
        params: data
    })
}
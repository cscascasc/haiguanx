import http from "@/utils/request";
export function getdeptdata(value) {

    return http({
        method: 'get',
        url: '/portrait/getIndicator',
        params: value
    })
}
export function getanalysisIndex(data) {
    return http({
        method: 'get',
        url: '/portrait/analysisIndex',
        params: data
    })
}
export function getissueTrends(data) {
    return http({
        method: 'get',
        url: '/portrait/issueTrends',
        params: data
    })
}
export function getalldata(data) {
    return http({
        method: 'get',
        url: '/portrait/getPortraitCount',
        params: data
    })
}
export function getCustomsdata(data) {
    return http({
        method: 'get',
        url: '/portrait/getPortrait',
        params: data
    })
}
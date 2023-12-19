import http from "@/utils/request";
import { exportObject } from "./download/download";
export function getRuleList() {
    return http({
        method: 'GET',
        url: '/alertRule/page',
        params: { size: '10' }

    })
}
//激活规则
export function activitRule(id) {
    return http({
        method: 'get',
        url: '/alertRule/modify/' + id
    })
}
//修改规则
export function editRule(object) {
    return http({
        method: 'post',
        url: "/alertRule/edit",
        data: object
    })
}
//增加风险
export function addRule(data) {
    return http(
        {
            method: 'post',
            url: '/risk/save',
            data: data
        }
    )
}

//获取风险
export function getrisk(data) {
    return http(
        {
            method: 'get',
            url: '/risk/page',
            params: data
        }
    )
}
//风险状态
export function riskStatus(id) {
    return http(
        {
            method: 'get',
            url: '/risk/modify/' + id
        }
    )
}
//风险删除
export function riskdelate(id) {
    return http(
        {
            method: 'get',
            url: "/risk/remove/" + id
        }
    )
}
//风险编辑
export function riskedit(data) {
    return http(
        {
            method: 'post',
            url: '/risk/edit',
            data: data
        }
    )
}
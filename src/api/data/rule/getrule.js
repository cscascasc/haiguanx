import http from "@/utils/request";
//获取规则制度
export function getrule(params) {
    const data = params
    return http({
        method: 'get',
        url: '/rules_regulations/page',
        params: data
    })
}
//获取规则制度统计
export function getrulecount(data) {
    return http({
        method: 'get',
        url: "/rules_regulations/getCount",
        params: data
    })
}
//新增规章制度
export function addRule(form) {
    const data = form
    return http({
        method: "post",
        url: '/rules_regulations/save',
        data: {
            title: data.title,
            businessAreaCode: data.businessAreaCode,
            businessSubcategoriesCode: data.businessSubcategoriesCode,
            annex: data.annex,
            notes: data.notes,
            timeTakeEffect: data.timeTakeEffect,
            problemBaseIdList: data.problemBaseId
        }
    })
}
//获取规则详情
export function getruledetile(id) {
    return http({
        method: 'get',
        url: '/rules_regulations/details/' + id
    })
}
//编辑规则
export function editrule(form) {
    const data = form
    return http({
        method: 'post',
        url: '/rules_regulations/editor',
        data: {
            id: data.id,
            title: data.title,
            businessAreaCode: data.businessAreaCode,
            businessSubcategoriesCode: data.businessSubcategoriesCode,
            annex: data.annex,
            notes: data.notes,
            timeTakeEffect: data.timeTakeEffect,
            problemBaseIdList: data.problemBaseIdList
        }
    })
}
//修改状态
export function changestatus(id) {
    return http({
        method: 'get',
        url: '/rules_regulations/modify/' + id
    })
}
//删除
export function delaterule(id) {
    return http({
        method: 'get',
        url: '/rules_regulations/remove/' + id
    })
}
//获取关联问题
export function problemBaseRule(form) {
    return http(
        {
            method: 'get',
            url: '/problemBase/problemRulesPage',
            params: form
        }
    )
}
import http from "@/utils/request";
export function getinarea(form) {
    const data = form
    return http({
        method: 'get',
        url: "/internal_control/page",
        params: data
    })
}
//获取不同类型的内控库
export function getinareaType(form) {
    const data = form
    return http({
        method: 'get',
        url: "/internal_control/page",
        params: data
    })
}
//获取内控统计
export function getinareacount(data) {
    return http({
        method: 'get',
        url: "/internal_control/getCount",
        params: data
    })
}
//获取内控详情
export function getinareadetile(id) {
    return http({
        method: 'get',
        url: "/internal_control/details/" + id
    })
}
//状态
export function changestatus(id) {
    return http({
        method: 'get',
        url: '/internal_control/modify/' + id
    })
}
//更新内控
export function editinarea(form) {
    const data = form
    console.log(data)
    return http({
        method: 'post',
        url: '/internal_control/editor',
        data: {
            id: data.id,
            nodeNum: data.nodeNum,
            nodeName: data.nodeName,
            nodeLevelCode: data.nodeLevelCode,
            nodeExplain: data.nodeExplain,
            nodeOrigin: data.nodeOrigin,
            riskWarn: data.riskWarn,
            businessAreaCode: data.businessAreaCode,
            businessSubcategoriesCode: data.businessSubcategoriesCode,
            businessLink: data.businessLink,
            monitorTypeCode: data.monitorTypeCode,
            businessExecutionPositions: data.businessExecutionPositions,
            monitorImplementCycle: data.monitorImplementCycle,
            implementInformatization: data.implementInformatization,
            problemBaseIdList: data.problemBaseId
        }
    })
}
//新增内控
export function addinarea(form) {
    const data = form
    console.log(data)
    return http({
        method: 'post',
        url: '/internal_control/save',
        data: data
    })
}
//删除内控 
export function delateinarea(id) {
    return http({
        method: 'get',
        url: '/internal_control/remove/' + id
    })
}
//获关联内控
export function problemBaseinarea(form) {
    return http(
        {
            method: 'get',
            url: '/problemBase/problemInternalPage',
            params: form
        }
    )
}
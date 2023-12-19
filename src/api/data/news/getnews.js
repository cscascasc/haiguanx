import http from "@/utils/request";
//获取重点
export function getnews(form) {
    const data = form
    return http({
        method: 'get',
        url: '/focus/page',
        params: data
    })
}
//获取单位信息
export function getdeptinfo(form) {
    const data = form
    return http({
        method: 'get',
        url: '/unit_overview/page',
        params: data
    })
}
//消息上线
export function newsstatus(id) {
    return http({
        method: 'get',
        url: '/focus/modify/' + id
    })
}
//消息新增
export function addNew(form) {
    const data = form
    return http({
        method: 'post',
        url: '/focus/save',
        data: data
    })
}
//获取消息详情
export function newdetile(id) {
    return http({
        method: 'get',
        url: '/focus/details/' + id
    })
}
//消息编辑
export function editnew(form) {
    const data = form
    return http({
        method: 'post',
        url: '/focus/edit',
        data: {
            id: data.id,
            title: data.title,
            content: data.content,
            userName: data.userName,
            involveDeptIdList: data.involveDeptIdList,
            businessAreaCode: data.businessAreaCode,
            type: data.type,
        }
    })
}
//单位新增
export function addunit(form) {
    const data = form
    return http({
        method: 'post',
        url: '/unit_overview/save',
        data: data
    })
}
//获取单位详情
export function detileunit(id) {
    return http({
        method: 'get',
        url: '/unit_overview/details/' + id
    })
}
//单位上线
export function unitstatus(id) {
    return http({
        method: 'get',
        url: '/unit_overview/modify/' + id
    })
}
//单位编辑
export function editunit(form) {
    const data = form
    return http({
        method: 'post',
        url: '/unit_overview/edit',
        data: {
            id: data.id,
            unitId: data.dept.id,
            unitIntroduce: data.unitIntroduce,
            institutionalPosition: data.institutionalPosition,
            nonInstitutionalPosition: data.nonInstitutionalPosition,
            notes: data.notes
        }
    })
}
//单位删除
export function delateunit(id) {
    return http({
        method: 'get',
        url: '/unit_overview/remove/' + id
    })
}
//消息删除
export function delatenew(id) {
    return http({
        method: 'get',
        url: '/focus/remove/' + id
    })
}
//获取报表
export function deptAudit(data) {
    return http(
        {
            method: 'get',
            url: '/dept/deptAudit',
            params: {
                parentId: data.parentId,
                year: data.year
            }
        }
    )
}
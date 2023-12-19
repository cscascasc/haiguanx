import http from "@/utils/request";
//获取全部部门
export function getAlldept() {
    return http({
        method: 'get',
        url: '/dept/allDept'
    })
}
//获取全部单位
export function getdept() {
    return http({
        method: 'get',
        url: '/dept/allCustoms'
    })
}
// 获取海关下部门 
export function getdeptcustoms(id) {
    return http({
        method: 'get',
        url: "/dept/customsDept",
        params: {
            pid: id
        }
    })
}
//获取海关下部门员工
export function getdeptUser(path) {
    return http({
        method: "get",
        url: '/user/findAllDeptUser',
        params: {
            deptId: path
        }
    })
}
//获取指定部门员工
export function findDeptUser(path) {
    return http(
        {
            method: 'get',
            url: '/user/deptUser',
            params: {
                dept: path
            }
        }
    )
}
//获取海关下部门领导
export function getdeptLeader(path) {
    return http({
        method: "get",
        url: '/user/getLeaders',
        params: {
            dept: path
        }
    })
}
//获取职级
export function getRank() {
    return http({
        method: 'get',
        url: '/dict/dataPage',
        params: {
            dictType: 'rank_type',
            size: '10'
        }
    })
}
//根据海关id获取部门信息
export function getunitinfo(id) {
    return http({
        method: 'get',
        url: '/unit_overview/unitOverview/' + id
    })
}
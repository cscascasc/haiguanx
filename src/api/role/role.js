import http from "@/utils/request";

//获取全部角色
export function getrole(data) {
    return http(
        {
            method: 'get',
            url: '/role/page',
            params: data
        }
    )
}
//新增角色
export function Addrole(form) {
    return http(
        {
            method: 'post',
            url: '/role/save',
            data: form
        }
    )
}
//分配权限
export function rotueredit(form) {
    return http(
        {
            method: 'post',
            url: '/role/assignMenu',
            data: form
        }
    )
}
//分配角色
export function useredit(form) {
    return http(
        {
            method: 'post',
            url: '/role/assignUser',
            data: form
        }
    )
}
//删除角色
export function delaterole(id) {
    return http({
        method: 'get',
        url: '/role/remove/',
        params: {
            ids: id
        }
    })
}
//编辑角色
export function editRole(data) {
    return http(
        {
            method: 'post',
            url: '/role/edit',
            data: data
        }
    )
}
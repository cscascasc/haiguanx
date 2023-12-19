import http from "@/utils/request";
//获取路由
export function getrouter() {
    return http(
        {
            method: 'get',
            url: '/menu/allMenu'
        }
    )
}
//新增路由
export function addrouter(data) {
    return http({
        method: 'post',
        url: '/menu/save',
        data: data

    })
}
//编辑
export function editrouter(pamrs) {
    const data = pamrs
    return http(
        {
            method: "post",
            url: '/menu/editor',
            data: {
                "id": data.id,
                "menuName": data.menuName,
                "parentId": data.parentId,
                "menuSort": data.menuSort,
                "path": data.path,
                "component": data.component,
                "redirect": data.redirect,
                "menuType": data.menuType,
                "visible": data.visible,
                "isFrame": data.isFrame,
                "perm" : data.perm
            }
        }
    )
}
//删除
export function delaterouter(id) {
    return http(
        {
            method: 'get',
            url: '/menu/remove/' + id
        }
    )
}
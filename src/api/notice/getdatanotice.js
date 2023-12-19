import http from "@/utils/request";
//内控规范
export function getinaeranotice(data) {
    return http({
        method: 'get',
        url: '/notice/internalNotice',
        params: {
            deptId: data.deptid,
            size: data.size,
            current: data.current
        }
    })
}
//共性问题
export function getCommonality(data) {
    return http(
        {
            method: 'get',
            url: '/notice/getCommonality',
            params: {
                size: data.size,
                current: data.current,
                deptId: data.deptid
            }
        }
    )
}
//整改到期
export function getproblemWarning(data) {
    return http(
        {
            method: 'get',
            url: '/notice/problemWarning',
            params: {
                size: data.size,
                current: data.current
            }
        }
    )
}
//整改超期
export function getproblemover(data) {
    return http(
        {
            method: 'get',
            url: '/notice/problemExpire',
            params: {
                size: data.size,
                current: data.current
            }
        }
    )
}
//共性问题列表
export function getCommonalist(data) {
    return http(
        {
            method: 'get',
            url: '/problemBase/page',
            params: {
                size: data.size,
                businessSubcategoriesCode: data.businessSubcategoriesCode,
                current: data.current
            }
        }
    )
}
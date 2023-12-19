import http from "@/utils/request";
export function houseloding(data) {
    return http({
        method: 'get',
        url: '/notice/lodgingNotice',
        params: {
            size: data.size,
            current: data.current,
            onticeUser: data.onticeUser,
            houseCode: data.houseCode,
            propertyNatureCode: data.propertyNatureCode
        }
    })
}
//过期
export function houseExpire(data) {
    return http({
        method: 'get',
        url: '/notice/houseExpire',
        params: {
            size: data.size,
            current: data.current,
            onticeUser: data.onticeUser,
            houseCode: data.houseCode,
            propertyNatureCode: data.propertyNatureCode
        }
    })
}

//到期
export function houseWarning(data) {
    return http({
        method: 'get',
        url: '/notice/houseWarning',
        params: {
            size: data.size,
            current: data.current,
            onticeUser: data.onticeUser,
            houseCode: data.houseCode,
            propertyNatureCode: data.propertyNatureCode
        }
    })
}


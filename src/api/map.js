import http from "@/utils/request";

export function getMaplist(code,parentCode,name,provinceCode,provinceName,cityName,countyName,isDeleted,id) {
    const data = {
        code,
        parentCode,
        name,
        provinceCode,
        provinceName,
        cityName,
        countyName,
        isDeleted,
        id,
    }
    return http({
        url:'/region/lazy_tree',
        method:'get',
        data: data
    })
}
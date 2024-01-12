import http from "@/utils/request";
//获取日志
export function getlog(size, data) {
    console.log(data)
    return http({
        method: 'post',
        url: '/log_info/page',
        params: size,
        data: data,
    })
}
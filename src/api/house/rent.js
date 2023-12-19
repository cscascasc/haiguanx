import http from "@/utils/request";
export function getrentlist(data) {
    return http({
        method: 'get',
        url: '/lodgingCharge/page',
        params: data
    })
}
//收取租金
export function changerent(data) {
    return http(
        {
            method: 'post',
            url: '/lodgingCharge/charge/',
            data: {
                id: data.id,
                remark: data.note
            }
        }
    )
}
// 上传附件
export function uploadRentFlie(form){
    return http(
        {
            method:'post',
            url:'/lodgingCharge/saveAnnex',
            data:form
        }
    )
}
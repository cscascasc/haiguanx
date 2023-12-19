import http from "@/utils/request";
//获取采购列表
export function getprocureList(data) {
    return http({
        method: 'get',
        url: "/procure/page",
        params: data
    })
}
//获取所有的采购列表
export function getallprocure(data) {
    return http({
        method: 'get',
        url: "/procure/page",
        params: data
    })
}
//获取采购详情
export function getprocureDetil(id) {
    return http({
        method: 'get',
        url: '/procure/details/' + id
    })
}
//删除采购
export function removeprocure(id) {
    return http({
        method: "post",
        url: '/procure/remove',
        params: {
            ids: id
        }
    })
}
//新增采购
export function addprocure(from) {
    const data = from
    console.log(data.phone)
    return http({
        method: 'post',
        url: '/procure/save',
        data: {
            processType: data.processType,
            name: data.name,
            procureType: data.procureType,
            procureCategory: data.procureCategory,
            procureWay: data.procureWay,
            amount: data.amount,
            budgetAmount: data.budgetAmount,
            earnestMoney: data.earnestMoney,
            afterService: data.afterService,
            paymentType: data.paymentType,
            demandDepartment: data.demandDepartment,
            contractNum: data.contractNum,
            contacts: data.contacts,
            phone: data.phone,
            customsType: data.customsType,
            procureDetails: {
                technicalRequirement: data.procureDetails.technicalRequirement,
                businessRequirement: data.procureDetails.businessRequirement,
                otherRequirement: data.procureDetails.otherRequirement,
                annex: data.procureDetails.annex
            },
            nextExamineUser: data.nestExaminUser
        }
    })
}
//采购审批
export function exprocure(form) {
    const data = form
    console.log(data)
    return http({
        method: 'post',
        url: '/task/examineTask',
        data: data
    })
}
//材料补充
export function addappor(data) {
    return http({
        method: 'post',
        url: '/procure/supplement',
        data: data
    })
}
//重新提交
export function removeappor(data) {
    return http(
        {
            url: '/procure/resubmit',
            method: 'post',
            data: data
        }
    )
}
//驳回请求
export function reject(form) {
    return http(
        {
            url: '/task/reject',
            method: 'post',
            data: form
        }
    )
}
//重新审核
export function reAppor(form) {
    return http(
        {
            url: '/task/leaderExamine',
            method: 'post',
            data: form
        }
    )
}
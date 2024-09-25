import http from "@/utils/request"
//获取问题库
export function getproblem(form) {
    const data = form
    return http(
        {
            method: 'get',
            url: '/problemBase/page',
            params: form
        }
    )
}
//获取问题库统计
export function problemBase() {
    return http({
        method: 'get',
        url: '/problemBase/getCount'
    })
}
//内控库关联
export function inareaproblem(form) {
    const data = form
    return http(
        {
            method: 'get',
            url: '/problemBase/page',
            params: {
                businessAreaCode: data.businessAreaCode,
                businessSubcategoriesCode: data.businessSubcategoriesCode,
            }
        })
}
//问题生效
export function problemModify(id) {
    return http({
        method: "get",
        url: '/problemBase/modify/' + id
    })
}
//获取问题详情
export function problemdetile(id) {
    return http({
        method: 'get',
        url: '/problemBase/details/' + id
    })
}
//编辑问题
export function problemEdit(form) {
    const data = form
    console.log(data.businessSupervisoryDept)
    return http({
        method: 'post',
        url: '/problemBase/update',
        data: {
            id: data.id,
            createTime: data.createTime,
            updateTime: data.updateTime,
            isDeleted: data.isDeleted,
            status: data.status,
            auditCustomsIds: data.auditCustomsIds,
            projectTypeCode: data.projectTypeCode,
            projectLevelCode: data.projectLevelCode,
            auditCustoms: data.auditCustoms,
            businessSupervisoryDeptId: data.businessSupervisoryDept ? data.businessSupervisoryDept.id : data.businessSupervisoryDeptId,
            responsibleDeptList: data.responsibleDeptList,
            auditLeader: data.auditLeader,
            auditAnnual: data.auditAnnual,
            auditTimeFrame: data.auditTimeFrame,
            auditType: data.auditType,
            areasInvolve: data.areasInvolve,
            businessAreaCode: data.businessAreaCode,
            businessSubcategoriesCode: data.businessSubcategoriesCode,
            problemDescription: data.problemDescription,
            detailedDescription: data.detailedDescription,
            rectificationSuggestions: data.rectificationSuggestions,
            involveAmount: data.involveAmount,
            involveTaxAmount: data.involveTaxAmount,
            rectificationDeadline: data.rectificationDeadline,
            annex: data.annex,
            isCancel: data.isCancel
        }

    })
}
//问题审核
export function problemJudge(id, judge) {
    return http({
        method: "get",
        url: '/problemBase/examine',
        params: {
            problemId: id,
            judge: judge
        }
    })
}
//问题整改
export function problemRect(form) {
    const data = form
    console.log(data)
    return http({
        method: "post",
        url: '/problemBase/rectification',
        data: data
    })
}
//新增问题
export function addproblem(form) {
    const data = form
    console.log(data)
    return http({
        method: 'post',
        url: '/problemBase/save',
        data: {
            projectTypeCode: data.projectTypeCode,
            projectLevelCode: data.projectLevelCode,
            auditCustoms: data.auditCustoms,
            businessSupervisoryDeptId: data.businessSupervisoryDeptId,
            responsibleDeptList: data.responsibleDeptList,
            auditLeader: data.auditLeader,
            auditAnnual: data.auditAnnual,
            auditTimeFrame: data.auditTimeFrame,
            auditType: data.auditType,
            areasInvolve: data.areasInvolve,
            businessAreaCode: data.businessAreaCode,
            businessSubcategoriesCode: data.businessSubcategoriesCode,
            problemDescription: data.problemDescription,
            detailedDescription: data.detailedDescription,
            rectificationSuggestions: data.rectificationSuggestions,
            involveAmount: data.involveAmount,
            involveTaxAmount: data.involveTaxAmount,
            rectificationDeadline: data.rectificationDeadline,
            annex: data.annex,
            userName: data.userName,
            userId: data.userId,
            deptName: data.deptName,
            deptId: data.deptId,
            situationList: data.situationList,
            remark: data.remark,
            name: data.name,
            gist: data.gist
        }
    })
}
//规章制度解绑
export function removeRule(id, ruleid) {
    return http(
        {
            method: 'get',
            url: '/problemBase/removeProblemRules',
            params: {
                problemId: id,
                rulesId: ruleid
            }
        }
    )
}
//内控库解绑
export function removeInare(id, inaeraid) {
    return http(
        {
            method: 'get',
            url: '/problemBase/removeProblemInternal',
            params: {
                problemId: id,
                internalId: inaeraid
            }
        }
    )
}
//规章制度绑定
export function saveRule(id, ruleid) {
    return http(
        {
            method: 'get',
            url: '/problemBase/saveProblemRules',
            params: {
                problemId: id,
                rulesId: ruleid
            }
        }
    )
}
//内控库绑定
export function saveInare(id, inaeraid) {
    return http(
        {
            method: 'get',
            url: '/problemBase/saveProblemInternal',
            params: {
                problemId: id,
                internalId: inaeraid
            }
        }
    )
}
//问题删除
export function problemdelate(id) {
    return http(
        {
            method: 'get',
            url: '/problemBase/remove',
            params: {
                ids: id
            }
        }
    )
}
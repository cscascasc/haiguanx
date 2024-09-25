import http from '../../utils/request'
//获取流程
export function getModle(data) {
    return http(
        {
            method: 'GET',
            url: '/activiti/list',
            params: data
        }
    )

}
//新建模型
export function addModle(Name, Key, Version, Category, Description) {
    const name = Name
    const key = Key
    const version = Version
    const category = Category
    const description = Description
    console.log(name, key, version, category, description)
    return http({
        method: 'post',
        url: '/activiti/create',
        data: {
            name: name,
            key: key,
            version: version,
            category: category,
            description: description
        }
    })
}
//部署模型
export function ModelActivit(id) {
    return http({
        method: 'post',
        url: '/activiti/deploy/' + id,
    })
}
//激活流程
export function FlowActivit(id, flag) {
    return http(
        {
            method: 'get',
            url: '/flow/activateProcessDefinition',
            params: {
                pid: id,
                flag: true
            }
        }
    )
}
//挂起流程
export function FlowHangding(id, flag) {
    return http(
        {
            method: 'get',
            url: '/flow/suspendProcessDefinition',
            params: {
                pid: id,
                flag: false
            }
        }
    )
}
//查看流程资源
export function getFlowShowResource(id) {
    return http(
        {
            method: 'get',
            url: '/flow/showResource',
            responseType: 'blob',
            params: { pid: id }
        }
    )
}
//获取工作流
export function getFlow(form) {
    return http(
        {
            method: 'get',
            url: '/flow/getList',
            params: form
        }
    )
}
//获取预设节点
export function getTaskNote(form) {
    return http({
        method: "get",
        url: '/process/getTaskNode',
        params: {
            customsType: form.custom,
            id: form.id
        }
    })
}
//设置流程节点 
export function editTaskNote(node, customs) {
    const Node = node
    const Customs = customs
    return http({
        method: 'post',
        url: '/process/editorDefTaskNode',
        data: {
            processTaskNodeList: Node,
            customsType: Customs
        }
    })
}
//删除流程
export function delateFlow(id) {
    return http({
        method: 'get',
        url: '/flow/remove/' + id
    })
}
//删除模型
export function delateMode(id) {
    return http(
        {
            method: 'post',
            url: '/activiti/remove/' + id
        }
    )
}
//获取审批历史
export function getHistory(id, code) {
    return http(
        {
            method: 'get',
            url: '/task/getAllHistory',
            params: {
                relatedId: id,
                processCode: code
            }
        }
    )
}
//获取当前审批节点
export function getHistoryNode(id) {
    return http(
        {
            method: 'get',
            url: "/task/getCurrentNode",
            params: {
                relatedId: id,
                // processCode: code
            }
        }
    )
}
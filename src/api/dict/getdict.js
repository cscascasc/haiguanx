import http from "@/utils/request"
//自定义查询部门数据字典
export function getdictdata() {
  return http(
    {
      method: 'get',
      url: '/dict/dataPage',
      params: {
        dictType: 'customs_type'
      }
    }
  )
}
//字典类型
export function getdictType(data) {
  return http(
    {
      method: 'get',
      url: '/dict/typePage',
      params: data
    }
  )
}
export function getdict(type) {
  return http(
    {
      method: 'get',
      url: '/dict/dataPage',
      params: {
        dictType: type,
        size: 10000,
        current: 1
      }
    }
  )
}
//项目类型
export function getobjecttype() {
  return http(
    {
      method: 'get',
      url: '/dict/dataPage',
      params: {
        dictType: 'project_type'
      }
    }
  )
}
//项目级别
export function getobjectlevel() {
  return http(
    {
      method: 'get',
      url: '/dict/dataPage',
      params: {
        dictType: 'project_level'
      }
    }
  )
}
//业务领域
export function getbusinessAear() {
  return http(
    {
      method: 'get',
      url: '/dict/dataPage',
      params: {
        dictType: 'business_area',
        size: 10000,
        current: 1
      }
    }
  )
}
//业务小类
export function getbusinessType() {
  return http(
    {
      method: 'get',
      url: '/dict/dataPage',
      params: {
        dictType: 'business_subcategories',
        size: 10000,
        current: 1
      }
    }
  )
}
//监控类型
export function getmonitortype() {
  return http(
    {
      method: 'get',
      url: '/dict/dataPage',
      params: {
        dictType: 'monitor_type'
      }
    }
  )
}
//节点级别
export function getnodelevel() {
  return http(
    {
      method: 'get',
      url: '/dict/dataPage',
      params: {
        dictType: 'node_level'
      }
    }
  )
}
//字典类型增加
export function adddicttype(form) {
  return http({
    method: "post",
    url: '/dict/saveType',
    data: form
  })
}
//字典内容增加
export function adddictdata(form) {
  return http({
    method: 'post',
    url: '/dict/saveData',
    data: form
  })
}
//字典类型修改
export function edittype(form) {
  return http({
    method: 'post',
    url: '/dict/editType',
    data: form
  })
}
//字典内容修改
export function editdata(form) {
  return http(
    {
      method: 'post',
      url: '/dict/editData',
      data: form
    }
  )
}
//删除字典类型
export function removetype(id) {
  return http(
    {
      method: 'get',
      url: '/dict/typeRemove/' + id
    }
  )
}
//删除字典内容
export function removedata(id) {
  return http(
    {
      method: 'get',
      url: '/dict/dataRemove/' + id
    }
  )
}
//字典内容获取
export function getdictall(form) {
  return http(
    {
      method: 'get',
      url: '/dict/dataPage',
      params: form
    }
  )
}
import axios from 'axios'
import http from '@/utils/request'

//批量导入问题库
export function importProblem(data) {
    return http(
        {
            method: "post",
            url: "/problemBase/batchImport",
            data: data,
            // responseType:Blob
        }
    )
}
//问题库批量导出
export function exportProblem(data) {
    const Data = data
    var herf = '/api/problemBase/export'
    var array = []
    for (const item in Data) {
        if (Data[item] !== null && Data[item] !== '' && Data[item] !== undefined && Data[item] !== 'null') {
            console.log(item, Data[item])
            array.push(item + '=' + Data[item])
        }
    }
    const a = array.join('&')
    if (a) {
        herf = '/api/problemBase/export' + '?' + a
    }
    console.log(herf)
    window.location.href = herf
}
//执法领域内控库导入
export function importInareaIN(data) {
    return http(
        {
            method: 'post',
            url: '/internal_control/batchImportLaw',
            data: data
        }
    )
}
//执法领域内控库导出
export function exportInareaIN(data) {
    const Data = data
    var herf = '/api/internal_control/export'
    var array = []
    for (const item in Data) {
        if (Data[item] !== null && Data[item] !== '' && Data[item] !== undefined && Data[item] !== 'null') {
            array.push(item + '=' + Data[item])
        }
    }
    const a = array.join('&')
    if (a) {
        herf = '/api/internal_control/export' + '?' + a
    }
    console.log(herf)
    window.location.href = herf
}
//非执法领域内控导入
export function exportInareaOUT(data) {
    return http(
        {
            method: 'post',
            url: '/internal_control/batchImportUnLaw',
            data: data
        }
    )
}
//规章制度导入
export function importRule(data) {
    return http(
        {
            method: 'post',
            url: "/rules_regulations/batchImport",
            data: data,
        }
    )
}
//规章制度导出
export function exportRule(data) {
    const Data = data
    var herf = '/api/rules_regulations/export'
    var array = []
    for (const item in Data) {
        if (Data[item] !== null && Data[item] !== '' && Data[item] !== undefined && Data[item] !== 'null') {
            array.push(item + '=' + Data[item])
        }
    }
    const a = array.join('&')
    if (a) {
        herf = '/api/rules_regulations/export' + '?' + a
    }
    console.log(herf)
    window.location.href = herf
}
//住房导入
export function importHouse(data) {
    return http(
        {
            method: "post",
            url: '/house/batchImport',
            data: data
        }
    )
}
//住房导出
export function exportHouse(data) {
    const Data = data
    var herf = '/api/house/export'
    var array = []
    for (const item in Data) {
        if (Data[item] !== null && Data[item] !== '' && Data[item] !== undefined && Data[item] !== 'null') {
            array.push(item + '=' + Data[item])
        }
    }
    const a = array.join('&')
    if (a) {
        herf = '/api/house/export' + '?' + a
    }
    console.log(herf)
    window.location.href = herf
}
//资产导入
export function importObject(data) {
    return http(
        {
            method: 'post',
            url: '/asset/batchImport',
            data: data
        }
    )
}
//资产导出
export function exportObject(data) {
    const Data = data
    var herf = '/api/asset/export'
    var array = []
    for (const item in Data) {
        if (Data[item] !== null && Data[item] !== '' && Data[item] !== undefined && Data[item] !== 'null') {
            array.push(item + '=' + Data[item])
        }
    }
    const a = array.join('&')
    if (a) {
        herf = '/api/asset/export' + '?' + a
    }
    console.log(herf)
    window.location.href = herf
}
//收费导出
export function exportRent(data) {
    const Data = data
    var herf = '/api/lodgingCharge/exportt'
    var array = []
    for (const item in Data) {
        if (Data[item] !== null && Data[item] !== '' && Data[item] !== undefined && Data[item] !== 'null') {
            array.push(item + '=' + Data[item])
        }
    }
    const a = array.join('&')
    if (a) {
        herf = '/api/lodgingCharge/export' + '?' + a
    }
    console.log(herf)
    window.location.href = herf
}
//关注重点导入
export function importFocus(data) {
    return http(
        {
            method: 'post',
            url: 'focus/batchImport?type=0',
            data: data
        }
    )
}
export function importFocustype(data) {
    return http(
        {
            method: 'post',
            url: 'focus/batchImport?type=1',
            data: data
        }
    )
}
//关注重点导出
export function exportFocus(data) {
    const Data = data
    var herf = '/api/focus/export'
    var array = []
    for (const item in Data) {
        if (Data[item] !== null && Data[item] !== '' && Data[item] !== undefined && Data[item] !== 'null') {
            array.push(item + '=' + Data[item])
        }
    }
    const a = array.join('&')
    if (a) {
        herf = '/api/focus/export' + '?' + a
    }
    console.log(herf)
    window.location.href = herf
}
// //关注重点导入
// export function importUnit(data) {
//     return http(
//         {
//             method: 'post',
//             url: '/asset/batchImport',
//             data: data
//         }
//     )
// }
//单位概况导出
export function exportUnit(data) {
    const Data = data
    var herf = '/api/unit_overview/export'
    var array = []
    for (const item in Data) {
        if (Data[item] !== null && Data[item] !== '' && Data[item] !== undefined && Data[item] !== 'null') {
            array.push(item + '=' + Data[item])
        }
    }
    const a = array.join('&')
    if (a) {
        herf = '/api/unit_overview/export' + '?' + a
    }
    console.log(herf)
    window.location.href = herf
}
//模板导出
export function getModle(url) {
    console.log(url)
    // return http(
    //     {
    //         method: 'post',
    //         url: '/file/download',
    //         data: {
    //             fileUrl: url
    //         }
    //     }
    // )
    let herf = `/api/file/download?fileUrl=${url}`
    // console.log(herf)
    window.location.href = herf
}
//guidang
export function getEndModle(id, url) {
    return http(
        {
            method: "get",
            url: url,
            params: {
                id: id
            },
            // responseType:Blob
        }
    )
}
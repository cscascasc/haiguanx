import axios from 'axios'
import errCode from './errCode'
import { decryptlong } from './jsencrypt'
import { Message, MessageBox, Notification } from 'element-ui'
//默认请求头信息
// axios.defaults.headers ['Content-Type'] = 'application/json;charset=utf-8'
//实例化axios
const http = axios.create({
    baseURL: '/api',
    timeout: 5000,
    maxRedirects: -1,
})
const isDecode = true
// http.get('/user/index').then(res => {
//     console.log("res:" + res)
// }).catch(error => {
//     console.error(error, 'error')
// })
//axios请求拦截器
http.interceptors.request.use(
    response => {
        return response
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)
//axios响应拦截器
http.interceptors.response.use(
    res => {
        //未设置状态码则默认成功状态
        // console.log(res)
        const json = JSON.stringify(res.data)
        const data = JSON.parse(json)
        const code = res.data.code || 200
        //获取错误信息
        const msg = errCode[code] || res.data.msg || errCode['default']
        if (data.code === 302) {
            location.href = data.data
            //   location.href = '/login'
        }
        // if (data.code === 305) {
        //     location.href = '/login'
        // }
        if (code === 401) {
            MessageBox.confirm('登录状态以过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            })
        }
        else if (code === 500) {
            Message({
                message: msg,
                type: 'error'
            })
            return Promise.reject(new Error(msg))
        }
        else if (code !== 200) {
            Notification.error({
                title: msg
            })
            return Promise.reject('error')
        }
        // else if(res.config.method === 'get'){
        //     const a = decryptlong(res.data.data)
        //     console.log(a ,'data')
        //     const data = a
        //     return data
        // }
        else {
            return res.data
        }
    },
    error => {
        console.log('err' + error)
        let { message } = error;
        if (message == "Network Error") {
            message = '后端接口请求异常'
            console.log(error)
        } else if (message.includes('timeout')) {
            message = '后端接口请求超时'
        } else if (message.includes('Request failed with status code')) {
            message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        Message({
            message: message,
            type: 'error',
            duration: 5000
        })
        return Promise.reject(error)
    }
)


export default http
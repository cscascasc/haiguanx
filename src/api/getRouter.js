import http from '../utils/request'
export function getRouter(){
   return http({
     url:'/menu/allMenu',
     method:'get'
    })
}

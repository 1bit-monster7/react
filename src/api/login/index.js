import request from '@/api/request'


export function getMenu(data){
    return request({
        url: "/login/getMenu",
        method: "post",
        data,
    });
}

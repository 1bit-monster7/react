import request from '@/api/request'

export function getUserList(params) {
  return request({
    url: "/user/getList",
    method: "get",
    params,
  });
}

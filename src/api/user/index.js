import request from '@/api/request'

export function getUserList(params) {
  return request({
    url: "/user/getList",
    method: "get",
    params,
  });
}


export function addUser(data){
  return request({
    url: "/user/addUser",
    method: "post",
    data,
  });
}

export function updateUser(data) {
  return request({
    url: "/user/updateUser",
    method: "put",
    data,
  });
}

export function deleteUser(data) {
  return request({
    url: "/user/deleteUser",
    method: "post",
    data
  });
}


export function batchDeleteUsers(params) {
  return request({
    url: "/user/batchDeleteUsers",
    method: "delete",
    params
  });
}

import Mock from "mockjs";

import dashboardApi from "@/mock/response/dashboard";
import userApi from "@/mock/response/user";
import permissionApi from "@/mock/response/permission";
Mock.mock("/getDashboardData", dashboardApi.getStatisticalData);

Mock.mock(RegExp("/user/getList" + ".*"), "get", userApi.getUserList);

Mock.mock(RegExp("/user/addUser"), "post", userApi.createUser);

Mock.mock(RegExp("/user/updateUser"), "put", userApi.updateUser);

Mock.mock(RegExp("/user/deleteUser"), "post", userApi.deleteUser);

Mock.mock(RegExp("/login/getMenu"), "post", permissionApi.getMenu);

Mock.mock(
  RegExp("/user/batchDeleteUsers" + ".*"),
  "delete",
  userApi.batchremove,
);

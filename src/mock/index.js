import Mock from "mockjs";

import dashboardApi from "@/mock/response/dashboard";
import userApi from "@/mock/response/user";

Mock.mock("/getDashboardData", dashboardApi.getStatisticalData);

Mock.mock(RegExp("/user/getList" + ".*"), "get", userApi.getUserList);

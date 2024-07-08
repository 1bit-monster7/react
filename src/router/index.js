import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardComponent from "../pages/dashboard";
import MallComponent from "../pages/mall";
import UserComponent from "../pages/user";
import PageOneComponent from "../pages/other/pageOne";
import PageTwoComponent from "../pages/other/pageTwo";
import LayoutComponent from "../Layout";
import ThirdLevelRoutingComponent from "@/pages/other/thirdLevelRouting";

const router = [
  {
    path: "/",
    Component: LayoutComponent,
    children: [
      // 重定向
      {
        path: "/",
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        Component: DashboardComponent,
      },
      {
        path: "mall",
        Component: MallComponent,
      },
      {
        path: "user",
        Component: UserComponent,
      },
      {
        path: "other",
        children: [
          {
            path: "pageOne",
            Component: PageOneComponent,
            children: [
              {
                path: "thirdLevelRouting",
                Component: ThirdLevelRoutingComponent,
              },
            ],
          },
          {
            path: "pageTwo",
            Component: PageTwoComponent,
          },
        ],
      },
    ],
  },
];

export default createBrowserRouter(router);

import "./index.scss";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";

import SideComponent from "./components/Side";
import HeaderComponent from "@/Layout/components/Header";

const { Content } = Layout;

import { useSelector, useDispatch } from "react-redux";
import { switchFoldingState } from "@/store/reduces/LayoutSideStore";
import TagView from "@/Layout/components/TagView";

const LayoutComponent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch(); // 拿到dispatch实例

  const isCollapsed = useSelector((state) => state.LayoutSideStore.isCollapsed); // 通过 useSelector 得到仓库中的值

  const switchSide = () => {
    console.log(isCollapsed, "isCollapsed");
    dispatch(switchFoldingState()); // action switch
  };

  return (
    <Layout className="layout-wrapper">
      <SideComponent isCollapsed={isCollapsed} />
      <Layout>
        <HeaderComponent isCollapsed={isCollapsed} onClick={switchSide} />
        <TagView />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;

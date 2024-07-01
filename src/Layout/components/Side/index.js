import { Menu } from "antd";
import React, { useState } from "react";
import Sider from "antd/es/layout/Sider";
import menus from "@/config";
import * as Icons from "@ant-design/icons";
import { TwitterOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";
const getIconElement = (name) => React.createElement(Icons[name]); // 通过name匹配获取Icon节点

const menuConversion = (menus) => {
  return menus.map((item) => {
    const child = {
      key: item.path,
      icon: getIconElement(item.icon),
      label: item.label,
    };

    if (item.children && item.children.length) {
      child.children = menuConversion(item.children);
    }
    return child;
  });
};

const items = menuConversion(menus);

console.log(items, "routes");

const SideComponent = ({ isCollapsed }) => {
  const navigate = useNavigate(); // 路由跳转
  const handleMenu = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    navigate(key);
  };
  return (
    <Sider trigger={null} collapsible collapsed={isCollapsed}>
      <div className={`title-wrapper ${isCollapsed ? "collapsed" : ""}`}>
        {isCollapsed ? (
          <div className="collapsed-icon-wrapper">
            <TwitterOutlined />
          </div>
        ) : (
          <div className="title">通用后台管理系统</div>
        )}
      </div>
      <Menu
        onClick={handleMenu}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        items={items}
      />
    </Sider>
  );
};

export default SideComponent;

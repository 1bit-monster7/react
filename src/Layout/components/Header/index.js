import React from "react";
import { Avatar, Button, Dropdown, Popconfirm } from "antd";
import { Header } from "antd/es/layout/layout";
import "./index.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
const HeaderComponent = ({ isCollapsed, onClick }) => {
  const url = require("@/assets/images/user.jpg");
  const navigator = useNavigate();
  const logOut = () => {
    console.log("Log Out");
    localStorage.removeItem("token");
    navigator("/login");
  };
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <Popconfirm
          title="提示"
          description="确定要退出吗?"
          onConfirm={logOut}
          okText="确定"
          cancelText="取消"
        >
          <a target="_blank" rel="noopener noreferrer">
            退出
          </a>
        </Popconfirm>
      ),
      icon: <SmileOutlined />,
    },
  ];
  return (
    <Header className="header-wrapper">
      <Button
        type="text"
        onClick={onClick}
        icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        style={{
          fontSize: "16px",
          width: 64,
          height: 32,
          backgroundColor: "#fff",
        }}
      />
      <Dropdown menu={{ items }}>
        <Avatar
          size={36}
          className="avatar"
          src={<img src={url} alt="avatar" />}
        />
      </Dropdown>
    </Header>
  );
};

export default HeaderComponent;

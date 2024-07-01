import React from "react";
import { Avatar, Button, Dropdown } from "antd";
import { Header } from "antd/es/layout/layout";
import "./index.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
} from "@ant-design/icons";
const HeaderComponent = ({ isCollapsed, onClick }) => {
  const url = require("@/assets/images/user.jpg");
  const logOut = () => {
    console.log("Log Out");
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
        <a onClick={logOut} target="_blank" rel="noopener noreferrer">
          退出
        </a>
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

import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "antd";
import { getDashboardData } from "@/api/dashboard";
import * as Icons from "@ant-design/icons";
import "./index.scss";
import CharComponent from "./components/chart";

const columns = [
  {
    title: "课程",
    dataIndex: "name",
  },
  {
    title: "今日购买",
    dataIndex: "todayBuy",
  },
  {
    title: "本月购买",
    dataIndex: "monthBuy",
  },
  {
    title: "总购买",
    dataIndex: "totalBuy",
  },
];
const orderData = [
  {
    name: "今日支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "今日收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "今日未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
  {
    name: "本月支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "本月收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "本月未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
];

const HomeComponent = () => {
  const avatar = require("@/assets/images/user.jpg");

  const [dataSource, setDataSource] = useState([]);
  const [lineOption, setLineOption] = useState({});
  const [barOption, setBarOption] = useState({});
  const [pieOption, setPieOption] = useState({});
  useEffect(() => {
    getDashboardData().then((res) => {
      console.log(res.data, "net work data");
      const { tableData, orderData, userData, videoData } = res.data;
      setDataSource(tableData);

      setLineOption({
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: orderData.date,
        },
        yAxis: {
          type: "value",
        },
        series: Object.keys(orderData.data[0]).map((brand) => {
          return {
            name: brand,
            type: "line",
            stack: "Total",
            data: orderData.data.map((item) => item[brand]),
          };
        }),
      });

      setBarOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: userData.map((v) => v.date),
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "活跃用户",
            data: userData.map((v) => v.active),
            type: "bar",
          },
          {
            name: "新增用户",
            data: userData.map((v) => v.new),
            type: "bar",
          },
        ],
      });

      setPieOption({
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: videoData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    });
  }, []);

  return (
    <Row className="dashboard-wrapper">
      <Col span={8}>
        <div className="source-display-wrapper">
          <Card hoverable>
            <div className="user-wrapper">
              <img className="user-wrapper__avatar-image" src={avatar} alt="" />
              <div className="user-wrapper__describe">
                <p className="describe__nickname">Admin</p>
                <p className="describe__identity">超级管理员</p>
              </div>
            </div>
            <div className="login-info-wrapper">
              <p className="login-info-wrapper__loginTime">
                上次登录时间：<span>2024年6月26日15:45:49</span>
              </p>
              <p className="login-info-wrapper__loginLocation">
                上次登录地点：<span>古巴</span>
              </p>
            </div>
          </Card>
          <Card
            className="table-wrapper"
            hoverable
            style={{ marginTop: "10px" }}
          >
            <Table rowKey={"name"} columns={columns} dataSource={dataSource} />
          </Card>
        </div>
      </Col>
      <Col span={16}>
        <div className="panel-display-wrapper">
          <div className="order-wrapper">
            {orderData.map((item, i) => {
              return (
                <Card hoverable key={i} className="order-wrapper__card-wrapper">
                  <div
                    style={{
                      backgroundColor: item.color,
                    }}
                    className="order-wrapper__icon"
                  >
                    {React.createElement(Icons[item.icon])}
                  </div>
                  <div className="order-wrapper__detail">
                    <p className="detail__money">￥{item.value}</p>
                    <p className="detail__name">{item.name}</p>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="chart-area-wrapper">
            {lineOption && (
              <CharComponent
                option={lineOption}
                style={{
                  width: "100%",
                  height: "300px",
                }}
              />
            )}
            <div className="chart-area-wrapper__footer">
              {barOption && (
                <CharComponent
                  option={barOption}
                  style={{
                    width: "50%",
                    height: "100%",
                  }}
                />
              )}
              {pieOption && (
                <CharComponent
                  option={pieOption}
                  style={{
                    width: "50%",
                    height: "100%",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default HomeComponent;

import React from "react";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import "./index.scss";
import { TinyColor } from "@ctrl/tinycolor";
import { getMenu } from "@/api/login";
import { Navigate, useNavigate } from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const colors1 = ["#6253E1", "#04BEFE"];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());
const LoginComponent = () => {
  const navigator = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loginForm] = Form.useForm();

  if (localStorage.getItem("token")) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async () => {
    try {
      console.log("submit 提交");
      const values = await loginForm.validateFields();
      console.log(values, "values");
      getMenu(values).then((res) => {
        console.log(res, "res");
        const { token } = res.data;
        if (token) {
          localStorage.setItem("token", token);
          navigator("/");
        } else {
          const { message = "登录失败" } = res.data;
          messageApi.error(message);
        }
      });
    } catch (errorInfo) {
      console.log("validate failed:", errorInfo);
    }
  };

  return (
    <div className="login-wrapper">
      {contextHolder}
      <div className="login-wrapper__form-wrapper">
        <div className="form-wrapper__title">Login</div>
        <div className="form-wrapper__form-wrapper">
          <Form
            className="form-wrapper__form"
            name="loginForm"
            form={loginForm}
            scrollToFirstError
            labelCol={{
              span: 4,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入账号!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}
            >
              <Input.Password  />
            </Form.Item>
          </Form>
          <div className="form-wrapper__submit">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(135deg, ${colors1.join(", ")})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(", ")})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(", ")})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button onClick={handleSubmit} type="primary" size="large">
                submit
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;

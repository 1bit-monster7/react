import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
const FormDlgComponents = ({
  userForm,
  title,
  isModalOpen,
  setIsModalOpen,
  submit,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={submit}>
            提交
          </Button>,
        ]}
      >
        <Form
          scrollToFirstError
          form={userForm}
          labelCol={{
            span: 4,
          }}
          name="userForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="id" label="ID" style={{ display: "none" }}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            label="用户名"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
            rules={[
              {
                required: true,
                message: "请输入年龄",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              max={200}
            ></InputNumber>
          </Form.Item>

          <Form.Item
            label="性别"
            name="sex"
            rules={[
              {
                required: true,
                message: "请输入性别",
              },
            ]}
          >
            <Select
              options={[
                { value: 0, label: <span>男</span> },
                { value: 1, label: <span>女</span> },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="出生日期"
            name="birth"
            format={{
              format: "YYYY-MM-DD",
            }}
            rules={[
              {
                required: true,
                message: "请输入生日",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="地址"
            name="addr"
            rules={[
              {
                required: true,
                message: "请输入地址",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default FormDlgComponents;

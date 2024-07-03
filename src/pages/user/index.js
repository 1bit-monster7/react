import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./index.scss";
import {
  addUser,
  batchDeleteUsers,
  deleteUser,
  getUserList,
  updateUser,
} from "@/api/user";
import FormDlgComponents from "@/pages/user/components/FormDlgComponents";
import dayjs from "dayjs";
const UserComponent = () => {
  const columns = [
    {
      title: "序号",
      render: (text, record, index) => {
        return `${index + 1 + (queryParams.page - 1) * queryParams.limit} `;
      },
    },
    { title: "姓名", dataIndex: "name" },
    { title: "年龄", dataIndex: "age" },
    {
      title: "性别",
      dataIndex: "sex",
      render: (val) => {
        return val ? "女" : "男";
      },
    },
    { title: "出生日期", dataIndex: "birth" },
    { title: "地址", dataIndex: "addr" },
    {
      title: "操作",
      render: (row) => {
        return (
          <div>
            <Button
              onClick={() => handleEdit(row)}
              style={{ marginRight: "10px" }}
              type="primary"
            >
              编辑
            </Button>
            <Popconfirm
              onConfirm={() => handleDelete(row)}
              title="提示"
              description="确认删除该用户？"
              okText="确认"
              cancelText="取消"
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const [messageApi, contextHolder] = message.useMessage();

  const [queryParams, setQueryParams] = useState({
    name: null,
    page: 1,
    limit: 10,
  });

  const [List, setList] = useState([]);

  const [total, setTotal] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("新增");

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [userForm] = Form.useForm();

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleEdit = (row) => {
    console.log(row,'row')
    userForm.resetFields();
    if (row?.id) userForm.setFieldsValue({ ...row, birth: dayjs(row.birth) });
    setTitle(row?.id ? "编辑" : "新增");
    setIsModalOpen(true);
  };

  const handleDelete = async (row) => {
    const { id } = row;
    const ids = selectedRowKeys.join(",");
    try {
      if (id) {
        await deleteUser({ id });
        messageApi.success("删除成功");
        // 更新 selectedRowKeys，去除已删除的 id
        const updatedSelectedRowKeys = selectedRowKeys.filter(
          (rowId) => rowId !== id,
        );
        setSelectedRowKeys(updatedSelectedRowKeys);
      } else {
        await batchDeleteUsers({ ids });
        setSelectedRowKeys([]); // 清空
        messageApi.success("批量删除成功");
      }
    } catch (error) {
      messageApi.error("删除失败");
    } finally {
      getList();
    }
  };

  const onFinish = (form) => {
    console.log("Success:", form);
    setQueryParams({ ...queryParams, ...form });
  };

  const TableChange = (pagination) => {
    console.log(pagination, "pagination");
    const { pageSize: limit, total, current: page } = pagination;
    const { name } = queryParams;
    setQueryParams({
      limit,
      page,
      name,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getList = () => {
    getUserList(queryParams).then((res) => {
      console.log(res, "List");
      const { list = [], count: total } = res;
      setList(list);
      setTotal(total);
    });
  };

  const submit = async () => {
    try {
      console.log("submit 提交");

      const values = await userForm.validateFields();

      const formattedValues = {
        ...values,
        birth: dayjs(values.birth).format("YYYY-MM-DD"),
      };

      if (formattedValues.id) {
        await updateUser(formattedValues);
        messageApi.success("修改成功！");
      } else {
        await addUser(formattedValues);
        messageApi.success("新增成功！");
      }

      setIsModalOpen(false);
      getList();
    } catch (errorInfo) {
      console.log("validate failed:", errorInfo);
      messageApi.error("表单验证失败");
    }
  };
  useEffect(() => {
    console.log(queryParams, "queryParams");
    getList();
  }, [queryParams]);

  return (
    <div className="user-wrapper">
      {contextHolder}
      <div className="user-wrapper__action-wrapper">
        <div>
          <Button
            onClick={handleEdit}
            type="primary"
            icon={<PlusOutlined />}
            iconPosition="start"
          >
            新增
          </Button>
          <Popconfirm
            onConfirm={handleDelete}
            title="提示"
            description="确认删除所有勾选的用户？"
            okText="确认"
            cancelText="取消"
          >
            <Button
              style={{ marginLeft: "10px" }}
              disabled={selectedRowKeys.length === 0}
              danger
              type="primary"
              iconPosition="start"
            >
              批量删除
            </Button>
          </Popconfirm>
        </div>
        <div className="action-wrapper__search">
          <Form
            layout="inline"
            name="queryForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="name">
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="user-wrapper__table-wrapper">
        <Table
          rowKey={"id"}
          rowSelection={rowSelection}
          onChange={TableChange}
          style={{ height: "100%" }}
          scroll={{
            y: "676px",
          }}
          pagination={{
            pageSize: queryParams.limit,
            pageSizeOptions: [10, 20, 50, 100],
            total,
          }}
          columns={columns}
          dataSource={List}
        />
      </div>
      <FormDlgComponents
        userForm={userForm}
        submit={submit}
        title={title}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default UserComponent;

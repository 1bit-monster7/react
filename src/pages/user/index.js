import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./index.scss";
import { getUserList } from "@/api/user";
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
              open={open}
              onConfirm={() => handleDelete(row)}
              onCancel={() => setOpen(false)}
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

  const [queryParams, setQueryParams] = useState({
    name: null,
    page: 1,
    limit: 10,
  });

  const [List, setList] = useState([]);

  const [open, setOpen] = useState(false);

  const [total, setTotal] = useState(0);

  const handleEdit = (row) => {
    console.log(row, "edit");
  };

  const handleDelete = (row) => {
    console.log(row, "delete");
    setOpen(true);
  };
  const handleAdd = () => {
    console.log("add");
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
  useEffect(() => {
    console.log(queryParams, "queryParams");
    getUserList(queryParams).then((res) => {
      console.log(res, "List");
      const { list = [], count: total } = res;
      setList(list);
      setTotal(total);
    });
  }, [queryParams]);

  return (
    <div className="user-wrapper">
      <div className="user-wrapper__action-wrapper">
        <Button
          onClick={handleAdd}
          type="primary"
          icon={<PlusOutlined />}
          iconPosition="start"
        >
          新增
        </Button>
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
          rowKey={"id"}
        />
      </div>
    </div>
  );
};

export default UserComponent;

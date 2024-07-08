import React, { useEffect, useRef, useState } from "react";
import { Space, Tag } from "antd";
import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTagViews, removeTagViews } from "@/store/reduces/TagViewsStore";
import { flattenRoutes } from "@/utils";
import menus from "@/config";
import store from "@/store";

const TagViewComponents = () => {
  const dispatch = useDispatch(); // 拿到dispatch实例
  const location = useLocation();
  const flatRoutes = flattenRoutes(menus);
  const navigate = useNavigate(); // 路由跳转
  const tagViewsList = useSelector((state) => state.TagViewsStore.tagViewsList); // 通过 useSelector 得到仓库中的值

  const handleCloseTag = (tag) => {
    // Remove the tag
    dispatch(removeTagViews({ ...tag }));
    const updatedTagViewsList = store.getState().TagViewsStore.tagViewsList; // 通过其他方式获取更新后的 tagViewsList
    navigate(updatedTagViewsList[updatedTagViewsList.length - 1].path);
  };
  const handleClickTag = (tag) => {
    console.log("click tag", tag);
    navigate(tag.path);
  };

  useEffect(() => {
    console.log(location, "location");
    const { pathname } = location;
    if (pathname !== "/") {
      const tag = flatRoutes.find((v) => v.path === pathname);
      dispatch(addTagViews({ ...tag }));
    }
  }, [location]);

  return (
    <Space size={[0, 8]} wrap className="tag-views-wrapper">
      {tagViewsList.map((tag) => {
        return (
          <Tag
            style={{ cursor: "pointer" }}
            onClick={() => handleClickTag(tag)}
            color={location.pathname === tag.path ? " red" : ""}
            key={tag.path}
            closeIcon={!tag.anchor}
            onClose={() => handleCloseTag(tag)}
          >
            {tag.label}
          </Tag>
        );
      })}
    </Space>
  );
};
export default TagViewComponents;

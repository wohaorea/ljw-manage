import React, { useState, useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

export default function Bread() {
  const { pathname } = useLocation();
  const [breadName, setBreadName] = useState("");
  // 不是要做mounted,而是updated
  useEffect(() => {
    switch (pathname) {
      case "/list":
        setBreadName("列表");
        break;
      case "/edit":
        setBreadName("编辑");
        break;
      case "/means":
        setBreadName("修改");
        break;
      default:
        setBreadName(pathname.includes('edit') ? '编辑' : '')
        break
    }
  }, [pathname]);
  return (
    <Breadcrumb style={{height: "30px", lineHeight: '30px'}}>
      <Breadcrumb.Item href="/">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/">
        {breadName}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

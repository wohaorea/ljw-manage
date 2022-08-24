import React from "react";
import "./less/Login.less";
import logoImg from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom"
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import {RegisterApi} from '../request/api'

export default function Regester() {

  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log("Success:", values);
    RegisterApi({
      username: values.username,
      password: values.password
    }).then(
      res=> {
        console.log(res);
        if(res.errCode ===0 ) {
          message.success('注册成功！！');
          setTimeout(() => navigate('/login'), 1000)
        }else {
          message.error(res.message);
        }
      }
    )
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <div className="login_box">
        <img
          src={logoImg}
          alt=""
          style={{
            width: 100,
            height: 100,
          }}
        />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名!!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "请确认输入密码!!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  console.log(_);
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "两次输入的密码不匹配!!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请再次输入密码"/>
          </Form.Item>
          <Form.Item>
            <Link rel="stylesheet" href="" to="/login">已有账号？立即登录</Link>
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            立即注册
          </Button>
        </Form>
      </div>
    </div>
  );
}

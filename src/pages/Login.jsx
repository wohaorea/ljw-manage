import React from "react";
import { Link, useNavigate } from "react-router-dom"
import "./less/Login.less"
import logoImg from "../assets/logo.png"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from "antd";
import { LoginApi } from "../request/api"

export default function Login() {
  const navigate = useNavigate()


  const onFinish = (values) => {
    console.log("Success:", values);
    LoginApi({
      username: values.username,
      password: values.password
    }).then(res => {
      if(res.errCode ===0 ) {
        message.success('登录成功！！');
        // 存储数据
        localStorage.setItem("avatar", res.data.avater)
        localStorage.setItem("cms-token", res.data["cms-token"])
        localStorage.setItem("editable", res.data.editable)
        localStorage.setItem("player", res.data.player)
        localStorage.setItem("username", res.data.username)
        setTimeout(() => navigate('/'), 1000)
      }else {
        message.error(res.message);
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <div className="login_box">
        <img src={logoImg} alt="" 
        style={{
            width: 100,
            height: 100
          }}/>
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
                message: "请输入你的用户名",
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名"/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入你的用户密码!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码"/>
          </Form.Item>

          <Form.Item>
            <Link rel="stylesheet" href="" to="/register">还没账号,立即注册</Link>
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
        </Form>
      </div>
    </div>
  );
}

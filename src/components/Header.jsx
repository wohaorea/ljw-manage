import React, {useEffect, useState} from "react";
import logoImg from "../assets/logo.png";
import defaultAvatar from "../assets/defaultAvatar.jpg"
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, message } from "antd";
import {useNavigate} from "react-router-dom"
import { connect } from "react-redux";


function Header() {
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [username, setUsername] = useState("该溜子")


  // 模拟mounted
  useEffect(() => {
    let newUsername =localStorage.getItem('username')
    if (newUsername) {
      setUsername(newUsername)
    }
    let newAvatar =localStorage.getItem('avatar')
    if (newAvatar) {
      // http://47.93.114.103:6688/
      setAvatar('http://47.93.114.103:6688/'+newAvatar)
    }
  }, [localStorage.getItem('avatar')])

  //退出登录
  const logout =() => {
    localStorage.clear() //清除存储的数据
    message.success("已退出,欢迎下次再来")
    setTimeout(() => navigate('/login'), 1000)
  }

  const menu = (
    <Menu>
      <Menu.Item key={1}>修改资料</Menu.Item>
      <Menu.Item key={2} onClick={logout}>退出登录</Menu.Item>
    </Menu>
  );


  return (
    <header>
      <img
        src={logoImg}
        alt=""
        className="logo"
        style={{
          width: 100,
          height: 100,
        }}
      />

      <div className="right">
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()} href="/">
            <Space>
              <img src={avatar} className="avatar" alt="" />
              <span>{username}</span>
              <CaretDownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    mykey: state.mykey
  }
}

export default connect(mapStateToProps)(Header)

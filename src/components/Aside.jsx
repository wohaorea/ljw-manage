import {
  AppstoreOutlined,
  MailOutlined,
  FormOutlined
  // MenuFoldOutlined,
  // MenuUnfoldOutlined
} from '@ant-design/icons';
import { 
  // Button,
   Menu 
} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


export default function Aside() {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  
  const items = [
    // getItem('Option 1', '1', <PieChartOutlined />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    // getItem('Option 3', '3', <ContainerOutlined />),
    getItem('查看文章', 'sub1', <MailOutlined />, [
      getItem('列表', 'list'),
      // getItem('Option 6', '6'),
      // getItem('Option 7', '7'),
      // getItem('Option 8', '8'),
    ]),
    getItem('文章编辑', 'sub2', <AppstoreOutlined />, [
      getItem('编辑', 'edit'),
      // getItem('Option 10', '10'),
      // getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
    getItem('修改资料', 'sub3', <FormOutlined />, [
      getItem('修改', 'means')
    ])
  ];
  
    const [
      collapsed, 
      // setCollapsed
    ] = useState(false);
  
    // const toggleCollapsed = () => {
    //   setCollapsed(!collapsed);
    // };

    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey, setDefaultKey] = useState('')

    useEffect(()=>{
      let path = location.pathname;
      let key = path.split('/')[1];
      setDefaultKey(key)
      // eslint-disable-next-line
    },[location.pathname])

    const handleClick = e => {
      navigate('/'+e.key)
      setDefaultKey(e.key)
    }
  return (
    <div
    style={{
      width: 200,
    }}
  >
    {/* <Button
      type="primary"
      onClick={toggleCollapsed}
      style={{
        marginBottom: 16,
      }}
    >
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </Button> */}
    <Menu
      className='aside'
      selectedKeys={defaultKey}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      items={items}
      onClick={handleClick}
    />
  </div>
  )
}

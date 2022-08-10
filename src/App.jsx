import React from 'react'
import { Button } from 'antd';
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <>
    <Outlet />
      <div>大大大</div>
      <Button type="primary" shape="round">Button</Button>
    </>
  )
}

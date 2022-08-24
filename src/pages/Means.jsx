import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./less/Means.less";
import { GetUserDataApi, ChangeUserDataApi } from "../request/api";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from "antd";
import { connect } from "react-redux";

function Means( props ) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const navigate = useNavigate();

  // const [username1, setUsername1] = React.useState("")

  // const [password1, setPassword1] = React.useState("")

  useEffect(() => {
    GetUserDataApi().then((res) => {
      console.log(res);
      if (res.errCode === 0) {
        message.success(res.message);
        // 根本原因为setXXX为异步
        // setUsername1(res.data.username)
        // setPassword1(res.data.password)

        sessionStorage.setItem("username", res.data.username);
      }
    });
  }, []);

  const onFinish = (values) => {
    // 如果表单的username有值,并且不等于初始化时拿到的username同时密码非空,才做提交
    if (
      values.username &&
      values.username !== sessionStorage.getItem("username") &&
      values.password.trim() !== ""
    ) {
      ChangeUserDataApi({
        username: values.username,
        password: values.password,
      }).then((res) => {
        console.log(res);
        if (res.errCode === 0) {
          // 重新登录
          localStorage.clear(); //清除存储的数据
          message.success("修改成功,请重新登录!");
          setTimeout(() => navigate("/login"), 1000);
        }
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
  
    const isLt2M = file.size / 1024 / 1024 / 1024 < 200;
  
    if (!isLt2M) {
      message.error('限制200kb!');
    }
  
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false);
        setImageUrl(imageUrl);
        localStorage.setItem('avatar', info.file.response.data.filePath)
        // 触发Header组件更新
        props.addKey()
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className="means">
      <Form
        name="basic"
        style={{ width: "400px" }}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="修改用户名" name="username">
          <Input placeholder="请输入新用户名" />
        </Form.Item>

        <Form.Item label="修 改 密 码" name="password">
          <Input.Password placeholder="请输入新的密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            提交
          </Button>
        </Form.Item>
      </Form>
      <p>点击下方修改头像：</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{'cms-token': localStorage.getItem('cms-token')}}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
}

const mapDispatchToProps =(dispatch) => {
  return {
    addKey() {
      const action = {type: 'addKeyFn'}
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(Means)

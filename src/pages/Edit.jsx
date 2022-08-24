import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, PageHeader, Modal, Form, Input, message } from "antd";
import moment from "moment";
import E from "wangeditor";
import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from "../request/api";

let editor = null;
export default function Edit() {
  const location = useLocation();

  const navigate = useNavigate();

  const params = useParams();

  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");
  
  const [subTitle, setSubTitle] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const dealData = (errCode, msg) => {
    if(errCode === 0) {
      message.success(msg)
      setTimeout(() => {
        navigate('/list')
      }, 1500)
    }else {
      message.error(msg)
    }
    setIsModalVisible(false); //关闭对话框
  }

  // 提交
  const handleOk = () => {
    form
      .validateFields() //校验字段
      .then((values) => {
        // form.resetFields();  //重置
        console.log("Received values of form: ", values);
        let { title, subTitle } = values;
        console.log(content);
        // 请求提交
        params.id ? ArticleUpdateApi({title, subTitle, content, id: params.id}).then(res => dealData(res.errCode, res.message)) 
        : ArticleAddApi({title, subTitle, content}).then((res) => dealData(res.errCode, res.message));
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // 模拟mounted
  useEffect(() => {
    editor = new E("#div1");

    editor.config.onchange = (newHtml) => {
      setContent(newHtml);
    };

    editor.create();

    // 根据地址栏是否有id来做请求
    if(params.id) {
      ArticleSearchApi({
        id: params.id
      }).then(res => {
        console.log(res);
        if(res.errCode === 0) {
          let {content, subTitle, title} = res.data
          // setContent(content)
          editor.txt.html(content)
          setTitle(title)
          setSubTitle(subTitle)
        }
      })
    }

    return () => {
      // 组件销毁时销毁编辑器  注: class写法需要在componentWillUnmount中调用
      editor.destroy();
    };
  }, [location.pathname]);
  return (
    <div
      className="site-page-header-ghost-wrapper"
      style={{ padding: "0 10px" }}
    >
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={
          "当前日期:" + moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        }
        extra={
          <Button
            key="1"
            type="primary"
            onClick={() => setIsModalVisible(true)}
          >
            提交文章
          </Button>
        }
      ></PageHeader>
      <div id="div1"></div>
      <Modal
        title="填写文章标题"
        cancelText="取消"
        okText="提交"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        zIndex={99999}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 21,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          initialValues={{title, subTitle}}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: "请把标题填写完整!!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="副标题" name="subTitle">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

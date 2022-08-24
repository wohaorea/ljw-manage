import React, {useState, useEffect} from 'react'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import { 
  Space, 
  Table,
  Button,
  message,
  // Tag
} 
  from 'antd';
// import { Link } from 'react-router-dom';
import "./less/list.less"
import {ArticleListApi, ArticleDelApi} from "../request/api"

// 标题组件
function MyTitle(props){
  return (
    <div>
      <a className='table_title' href={'http://codesohigh.com:8765/article/' + props.id} target="_blank" rel="noreferrer">{props.title}</a>
      <p style={{color: '#999'}}>{props.subTitle}</p>
    </div>
  )
}

export default function List() {
  const navigate = useNavigate()

  //列表数组
  const [arr, setArr] = useState([
    {
      key: '1',
      name: 'John Brown',
      address: 'New York No. 1 Lake Park'
    }
  ])

  // 分页
  const [pagination, setPagination] = useState({current: 1, pageSize: 10, total: 10})

  // 封装请求的代码
  const getArticleList = (current, pageSize) => {
    ArticleListApi({
      num: current,
      count: pageSize
    }).then(res => {
      console.log(res);
      
      if(res.errCode === 0) {
        let {num, count, total} = res.data
        setPagination({current: num, pageSize: count, total})
        let newArr = JSON.parse(JSON.stringify(res.data.arr))
        // 声明一个空数组
        let myarr = []
        /**
         * 1.要给每个数组加key,让key=id
         * 2.需要有一套标签结构,赋予一个属性
         */
        newArr.map(item => {
        //   item.key = item.id
        //   item.date = moment(item.date).format("YYYY-MM-DD hh:mm:ss")
        //   item.mytitle = `
        //   <div>
        //     <Link className='table_title' to='/'>${item.title}</Link>
        //     <p style={{color: '#999'}}>${item.subTitle}</p>
        //   </div>
        //   `

        let obj ={
            key: item.id,
            date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
            mytitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle}/>
          }
          return myarr.push(obj)
        })
        console.log(myarr);
        setArr(myarr)
       
      }
    })
  }

  //分页的函数
  const pageChange = (arg) => {
    getArticleList(arg.current, arg.pageSize)
  } 

    //请求数组
  useEffect(() => {
    getArticleList(pagination.current, pagination.pageSize)
    // eslint-disable-next-line
  }, [])

  const editFun = (e) => {
    console.log(e);
    navigate('/edit/' + e)
  }

  const delFun = (e) => {
    ArticleDelApi({id: e}).then(res => {
      console.log(res);
      if(res.errCode === 0) {
        message.success(res.message)
      }
      getArticleList(pagination.current, pagination.pageSize)
    }).catch(n => {
      console.log(n);
    })
  }

  const columns = [
    {
      dataIndex: 'mytitle',
      key: 'mytitle',
      width: '60%',
      render: text => <div>{text}</div>,
    },
    {
      dataIndex: 'date',
      key: 'date',
      render: (text) => (
        <>
          <p>{text}</p>
        </>
      ),
    },
    {
      key: 'action',
      render: text => (
        <Space size="middle">
          <Button type="primary" onClick={() => editFun(text.key)}>编辑</Button>
          <Button type="primary" danger onClick={()=>delFun(text.key)}>删除</Button>
        </Space>
      ),
    },
  ];
  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     address: 'New York No. 1 Lake Park'
  //   }
  // ];
  return (
    <div className='list'>
      <Table
             showHeader={false}
             dataSource={arr} 
             columns={columns} 
             onChange={pageChange}
             pagination={pagination}
             />
    </div>
  )
}

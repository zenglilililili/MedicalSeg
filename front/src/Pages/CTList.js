import {Layout, Menu, Table, Space, Breadcrumb} from 'antd';
import {
    LaptopOutlined,
    UserOutlined,
    NotificationOutlined
} from '@ant-design/icons';

import '../static/css/CTList.css'
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {loginApi} from "../service/auth";

function CTList() {
    const {Content, Sider} = Layout;
    console.log(window.location.href);
    const docId = window.location.href.split("docId=")[1].split("&")[0];
    const patId = window.location.href.split("&patId=")[1];
    const [data, setData] = useState([]);

    useEffect(() => {
        if (patId != null) {
            loginApi('/ctListBack', {
                patId: patId
            }).then((res) => {
                    if (res.msg === "成功") {
                        var dataTmp = new Array(res.ct.length);
                        for (var i = 0; i < res.ct.length; i++) {
                            dataTmp[i] = {
                                keyCount: i,
                                id: res.ct[i].id,
                                patId: res.ct[i].patId,
                                name: res.ct[i].name,
                                ctcount: res.ct[i].ctcounts,
                                ctdelineate: res.ct[i].ctdelineate,
                                delineatemode: res.ct[i].delineatemode,
                                doccheck: res.ct[i].doccheck,
                                period: res.ct[i].period,
                                createtime: res.ct[i].createtime,
                            };
                        }
                        setData([...dataTmp]);
                    }
                    else {
                        return (
                            alert("已存在当前账户，请直接登录")
                        )
                    }
                }
            ).catch((err) => {
                console.log(err);
            });
        }
    }, []);


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            componentWillMount: (text, record) => {

                < Link to={"/ctlist?patId=" + patId + "&ctId=" + record.id}> < a> {text} </a> </Link>


            },
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'CT张数',
            dataIndex: 'ctcount',
            key: 'ctcount',
        },
        {
            title: '已勾画CT张数',
            dataIndex: 'ctdelineate',
            key: 'ctdelineate',
        },
        {
            title: '勾画模式',
            dataIndex: 'delineatemode',
            key: 'delineatemode',
            render: text => {
                if (text === 0) {
                    return <>医生勾画</>
                } else {
                    return <>模型勾画</>
                }
            },
        },
        {
            title: '医生是否检查',
            dataIndex: 'doccheck',
            key: 'doccheck',
            render: text => {
                if (text) {
                    return <>是</>
                } else {
                    return <>否</>
                }
            },
        },
        {
            title: 'CT拍摄阶段',
            dataIndex: 'period',
            key: 'period',
            render: text => {
                if (text === 0) {
                    return <>术前</>
                } else {
                    return <>术后</>
                }
            },
        },
        {
            title: '注册时间',
            dataIndex: 'createtime',
            key: 'createtime',
        },

        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">

                    <Link to={"/slicelist?id=" + docId+"&patId=" + patId + "&ctId=" + record.id}>勾画</Link>

                </Space>
            ),
        },
    ];

    return (
        <Layout>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu mode="inline" defaultSelectedKeys={["2"]}
                          openKeys={"2"}
                          defaultOpenKeys={["2"]}
                          style={{height: '100%', borderRight: 0}}>
                        <Menu.Item key="1" icon={<LaptopOutlined/>}>病例入库</Menu.Item>
                        <Menu.Item key="2" icon={<NotificationOutlined/>}>病例信息</Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined/>}>更多功能...</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb>
                        <Breadcrumb.Item><a href={"/patList?id=" + docId}>病例列表</a></Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href={"/ctlist?docId=" +docId  + "&patId=" +patId }>CT列表</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Content className="site-layout-background" style={{padding: 24, margin: 0, minHeight: 280,}}>
                        <Table columns={columns} dataSource={data}/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )

    // ctlist?patId=17593853&docId=18425
    // ctlist?docId=18425&patId=17593853
}

export default CTList

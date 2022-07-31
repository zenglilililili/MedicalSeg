import {Layout, Menu, Table, Space, Button} from 'antd';
import {
    LaptopOutlined,
    UserOutlined,
    NotificationOutlined
} from '@ant-design/icons';
import '../static/css/PatList.css'
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {loginApi} from "../service/auth";
import history from "../utils/history";


function PatList() {
    const {Content, Sider} = Layout;
    const docId = window.location.href.split("id=")[1];
    const [data, setData] = useState([]);
    useEffect(() => {
        if (docId != null) {
            loginApi('/patListBack', {
                id: docId
            }).then((res) => {
                if (res.msg === "成功") {
                    var dataTmp = new Array(res.patient.length);
                    for (var i = 0; i < res.patient.length; i++) {
                        dataTmp[i] = {
                            keyCount: i,
                            patId: res.patient[i].patId,
                            name: res.patient[i].name,
                            docName: res.patient[i].docName,
                            pyhsistsName: res.patient[i].pyhsistsName,
                            department: res.patient[i].department,
                            detail: res.patient[i].detail,
                            ctcount: res.patient[i].ctcount,
                            createtime: res.patient[i].createtime,
                        };
                    }
                    setData([...dataTmp]);
                } else {
                    return (
                        alert("已存在当前账户，请直接登录")
                    )
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }, []);
    const del = (patId) => {
        loginApi('/deletePat', {patId: patId, docId: docId}).then((res) => {
            console.log("前端准备删除");
            if (res.msg === "成功") {
                    var dataTmp = new Array(res.patient.length);
                    for (var i = 0; i < res.patient.length; i++) {
                        dataTmp[i] = {
                            keyCount: i,
                            patId: res.patient[i].patId,
                            name: res.patient[i].name,
                            docName: res.patient[i].docName,
                            pyhsistsName: res.patient[i].pyhsistsName,
                            department: res.patient[i].department,
                            detail: res.patient[i].detail,
                            ctcount: res.patient[i].ctcount,
                            createtime: res.patient[i].createtime,
                        };
                    }
                    setData([...dataTmp]);

            } else {
                return (
                    alert(res.msg)
                )
            }
        }).catch((err) => {
            console.log(err)
        })
    };

    const columns = [
        {
            title: '病人编号',
            dataIndex: 'patId',
            key: 'patId',
            rowKey: "patId",
            render: (patId) =>
                <Link to={"/ctlist?docId=" + docId + "&patId=" + patId}>
                    {patId}
                </Link>
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text,record) =>
                <Link to={"/ctlist?docId=" +docId+"&patId=" + record.patId}>
                    {text}
                </Link>
        },
        {
            title: '主治医生',
            dataIndex: 'docName',
            key: 'docName',
        },
        {
            title: '物理师',
            dataIndex: 'pyhsistsName',
            key: 'pyhsistsName',
        },
        {
            title: '科室',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'CT份数',
            dataIndex: 'ctcount',
            key: 'ctcount',
        },
        {
            title: '注册时间',
            dataIndex: 'createtime',
            key: 'createtime',
        },
        {
            title: '删除病人',
            dataIndex: 'delete',
            key: 'tele',


            render: (text, record) => (
                <span>
                    <Button onClick={() => del(record.patId)}> 删除</Button>
                </span>
            ),

        }
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
                        <Menu.Item key="2" icon={<NotificationOutlined/>}>查看病例</Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined/>}>更多功能...</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content className="site-layout-background" style={{padding: 24, margin: 0, minHeight: 280,}}>
                        <Table columns={columns} dataSource={data}/>


                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default PatList

import {Layout, Menu, Breadcrumb, Image, List, Row, Col, Space} from 'antd';
import {
    LaptopOutlined,
    UserOutlined,
    NotificationOutlined
} from '@ant-design/icons';
import '../static/css/Slicelist.css'
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {loginApi} from "../service/auth";

function Slicelist() {
    const {Content, Sider} = Layout;
    const docId = window.location.href.split("id=")[1].split("&")[0];
    const patId = window.location.href.split("patId=")[1].split("&")[0];
    const ctId = window.location.href.split("&ctId=")[1];
    const [imglist, setImglist] = useState([]);
    var maxPage = 200 ;
    useEffect(() => {
        if (patId != null) {
            loginApi('/sliceListBack', {
                patId: patId,
                id: ctId
            }).then((res) => {
                    if (res.msg === "成功") {
                        var dataTmp = new Array(res.sliceInfo.length);
                        for (var i = 0; i < res.sliceInfo.length; i++) {
                            dataTmp[i] = {
                                keyCount: i,
                                sliceId: res.sliceInfo[i].sliceId,
                                patPath: res.sliceInfo[i].patPath,
                                ctId: res.sliceInfo[i].ctId,
                                delineatemode: res.sliceInfo[i].delineatemode,
                                createtime: res.sliceInfo[i].createtime,
                            };
                        }
                        setImglist([...dataTmp]);
                        maxPage = res.sliceInfo.length;
                    }
                    else {
                        return (
                            alert("获取切片列表失败")
                        )
                    }
                }
            ).catch((err) => {
                console.log(err);
            });
        }
    }, []);

    var arr = [[]];
    var arr_line1 = [];
    var arr_line2 = [];
    var arr_line3 = [];

    for (var i = 0; i < imglist.length; i += 3) {
        arr_line1.push(imglist[i]);
        if (i + 1 < imglist.length) {
            arr_line2.push(imglist[i + 1]);
        }
        if (i + 2 < imglist.length) {
            arr_line3.push(imglist[i + 2]);
        }
    }
    arr.push(arr_line1);
    arr.push(arr_line2);
    arr.push(arr_line3);

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
                    <Breadcrumb>
                        <Breadcrumb.Item><a href={"/patList?id=" + docId}>病例列表</a></Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href={"/ctlist?docId=" + docId + "&patId=" + patId}>CT列表</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">切片列表</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Content className="site-layout-background" style={{padding: 24, margin: 0, minHeight: 280,}}>
                        <>
                            <Row>
                                <Col span={8}>
                                    <List
                                        itemLayout={"horizontal"}
                                        dataSource={arr[1]}
                                        renderItem={item => (
                                            <List.Item>
                                                <div className={"image-div"}>
                                                    <Image
                                                        src={require("../data/" + item.patPath + "/" + item.ctId + "/" + item.sliceId + ".jpg").default}
                                                        alt={item.patPath}> </Image>
                                                    <div className={"name-deleate-div"}>
                                                        <Space size={"middle"}>
                                                            <text>图片{item.sliceId}</text>
                                                            <Link
                                                                to={"/delineate?id=" + docId + "&patPath=" + item.patPath + "&ctId=" + item.ctId + "&sliceId=" + item.sliceId}>
                                                                详情
                                                            </Link>
                                                        </Space>
                                                    </div>
                                                </div>
                                            </List.Item>
                                        )
                                        }
                                    /></Col>
                                <Col span={8}>
                                    <List
                                        itemLayout={"horizontal"}
                                        dataSource={arr[2]}
                                        renderItem={item => (
                                            <List.Item>
                                                <div className={"image-div"}>
                                                    <Image
                                                        src={require("../data/" + item.patPath + "/" + item.ctId + "/" + item.sliceId + ".jpg").default}
                                                        alt={item.patPath}> </Image>
                                                    <div className={"name-deleate-div"}>
                                                        <Space size={"middle"}>
                                                            <text>图片{item.sliceId}</text>
                                                            <Link
                                                                to={"/delineate?id=" + docId + "&patPath=" + item.patPath + "&ctId=" + item.ctId + "&sliceId=" + item.sliceId}>
                                                                详情
                                                            </Link>
                                                        </Space>
                                                    </div>
                                                </div>
                                            </List.Item>
                                        )
                                        }
                                    /></Col>
                                <Col span={8}>
                                    <List
                                        itemLayout={"horizontal"}
                                        dataSource={arr[3]}
                                        renderItem={item => (
                                            <List.Item>
                                                <div className={"image-div"}>
                                                    <Image
                                                        src={require("../data/" + item.patPath + "/" + item.ctId + "/" + item.sliceId + ".jpg").default}
                                                        alt={item.patPath}> </Image>
                                                    <div className={"name-deleate-div"}>
                                                        <Space size={"middle"}>
                                                            <text>图片{item.sliceId}</text>
                                                            <Link
                                                                to={"/delineate?id=" + docId + "&patPath=" + item.patPath + "&ctId=" + item.ctId + "&sliceId=" + item.sliceId}>
                                                                详情
                                                            </Link>
                                                        </Space>
                                                    </div>
                                                </div>
                                            </List.Item>
                                        )
                                        }
                                    /></Col>
                            </Row>
                        </>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default Slicelist

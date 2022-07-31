import React, {useEffect, useState} from "react";
import {Layout, Menu, Breadcrumb, Card, Button, List} from 'antd';
import {
    LaptopOutlined,
    UserOutlined,
    NotificationOutlined
} from '@ant-design/icons';
import '../static/css/Delineate.css'
import history from "../utils/history";
import {loginApi} from "../service/auth";


function Delineate() {

    const {Content, Sider} = Layout;
    const docId = window.location.href.split("id=")[1].split("&")[0];
    const patPath = window.location.href.split("patPath=")[1].split("&")[0];
    const ctId = window.location.href.split("&ctId=")[1].split("&")[0];
    const sliceId = window.location.href.split("&sliceId=")[1];
    var start = 0;
    var itemId = parseInt(sliceId);


    const [pageList, setPageList] = useState(
        {
            maxPage: 200,
            page5: [0, 1, 2, 3, 4],
            thisPage: itemId
        }
    );
    console.log("itemId=" + itemId);
    if (itemId < 0 || itemId >= pageList.maxPage) {
        alert("切片无效");
        history.replace({pathname: "/delineate?id=" + docId + "&patPath=" + patPath + "&ctId=" + ctId + "&sliceId=" + 0});
        history.go();

    }
    console.log(itemId === pageList.maxPage - 2);
    console.log(typeof itemId);
    console.log(typeof (pageList.maxPage - 2));


    switch (itemId) {
        case (pageList.maxPage - 1):
            start = pageList.maxPage - 5;
            break;
        case (pageList.maxPage - 2):
            start = pageList.maxPage - 5;
            break;
        case 0 :
            start = 0;
            break;
        case 1:
            start = 0;
            break;

        default:
            start = itemId - 2;
    }

    console.log("maxPage = " + pageList.page5);
    const [imglist, setImglist] = useState([]);

    useEffect(() => {
        if (patPath != null && ctId != null && sliceId != null) {
            loginApi('/delineateBack', {
                patId: parseInt(patPath),
                ctId: ctId,
                sliceId: sliceId

            }).then((res) => {
                    if (res.msg === "成功") {
                        console.log(res);
                        var dataTmp = new Array(res.contourInfo.length);
                        for (var i = 0; i < res.contourInfo.length; i++) {
                            dataTmp[i] = {
                                id: i,
                                contourId: res.contourInfo[i].contourId,
                                patId: res.contourInfo[i].patId,
                                patPath: res.contourInfo[i].patPath,
                                ctId: res.contourInfo[i].ctId,
                                sliceId: res.contourInfo[i].sliceId,
                                modelId: res.contourInfo[i].modelId,
                                modelName: res.contourInfo[i].modelName,
                                color: res.contourInfo[i].color,
                                contour: res.contourInfo[i].contour
                            };
                        }
                        if (dataTmp.length === 0) {
                            var conList = document.getElementById("contourList");
                            conList.style.display = "none"

                        }
                        setImglist([...dataTmp]);

                        switch (itemId) {
                            case (res.maxPage - 1):
                                start = res.maxPage - 5;
                                break;
                            case (res.maxPage - 2):
                                start = res.maxPage - 5;
                                break;
                            case 0 :
                                start = 0;
                                break;
                            case 1:
                                start = 0;
                                break;

                            default:
                                start = itemId - 2;
                        }

                        setPageList({
                            maxPage: res.maxPage,
                            page5: [start, start + 1, start + 2, start + 3, start + 4],
                            thisPage: itemId
                        });

                        console.log("maxPage set= " + [start, start + 1, start + 2, start + 3, start + 4])
                    }
                    else {
                        return (
                            alert("获取ROI列表失败")
                        )
                    }
                }
            ).catch((err) => {
                console.log(err);
            });
        }
    }, []);


    const draw = (ctx, color, pos) => {
        // ctx.fillStyle = color; // 笔的颜色
        ctx.strokeStyle = color;
        // ctx.fillRect(...pos); // 画一个矩形
        ctx.lineWidth = 2;
        //画坐标轴的两条线
        ctx.beginPath();
        ctx.moveTo(pos[0][0], pos[0][1]);
        for (var i = 1; i < pos.length; i++) {
            ctx.lineTo(pos[i][0], pos[i][1]);
        }
        ctx.lineTo(pos[0][0], pos[0][1]);
        ctx.stroke();
    };

    const clear = (ctx) => {
        ctx.clearRect(0, 0, 512, 512); // 画一个矩形
    };

    const showPreLabel = (item) => {
        var value = document.getElementById("pre" + item.modelId).innerText;
        var mycanvas = document.getElementById("canv" + item.modelId);
        if (mycanvas.getContext) {
            var ctx = mycanvas.getContext("2d");
            if (value === "显示" + item.modelName) {
                draw(ctx, item.color, item.contour);
                document.getElementById("pre" + item.modelId).innerText = "关闭" + item.modelName;
            } else {
                clear(ctx, item.contour);
                document.getElementById("pre" + item.modelId).innerText = "显示" + item.modelName;
            }
        }
    };

    const changePage = (item) => {
        if (pageList.maxPage < 5) {
            alert("该影像切片数不足5张");
            return
        }
        setPageList({
            maxPage: pageList.maxPage,
            page5: [start, start + 1, start + 2, start + 3, start + 4],
            thisPage: item
        });
        history.replace({pathname: "/delineate?id=" + docId + "&patPath=" + patPath + "&ctId=" + ctId + "&sliceId=" + item});
        history.go();
    };

    const initCanvs = () => {
        console.log("画布准备好了");
        setTimeout(() => {
            var mycanvas = document.getElementById('canv');
            if (mycanvas.getContext) {
                var ctx = mycanvas.getContext("2d");

                var img = document.getElementById("ctimg");
                ctx.drawImage(img, 0, 0);
            }
        }, 500);
    };


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
                            <a href={"/ctlist?docId=" + docId + "&patId=" + patPath}>CT列表</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href={"/slicelist?id="+docId+"&patId="+patPath+"&ctId="+ctId}>切片列表</a>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            <a href="">切片勾画{itemId}</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Content className="site-layout-background" style={{padding: 24, margin: 0, minHeight: 600}}>
                        <div style={{width: "50%", display: 'block', float: 'left', zIndex: 1}}>
                            <canvas id={"canv"} width={512} height={512}
                                    style={{position: "absolute", zIndex: 0}}>
                                <img id={"ctimg"} width={512} height={512}
                                     src={require("../data/" + patPath + "/" + ctId + "/" + sliceId + ".jpg").default}/>
                            </canvas>

                            <List id={"contourList"}
                                  style={{position: "absolute", width: 512, height: 512, zIndex: 1, display: 'block'}}
                                  itemLayout={"horizontal"}
                                  dataSource={imglist}

                                  renderItem={item => (
                                      <List.Item style={{position: "absolute", width: 512, height: 512}}>
                                          <canvas id={"canv" + item.modelId} width={512} height={512}
                                                  style={{position: "absolute", zIndex: item.modelId}}>
                                          </canvas>

                                      </List.Item>
                                  )
                                  }
                            />
                        </div>

                        <div style={{width: '42%', display: 'block', float: 'right'}} onLoadStart={initCanvs()}>
                            <Card className={"cardName"} title="操作" bordered={true} style={{width: 400}}>
                                <List

                                    itemLayout={"horizontal"}
                                    dataSource={imglist}
                                    renderItem={item => (
                                        <>
                                            <Button id={'pre' + item.modelId} type={"primary"} size={"mid"} block
                                                    onClick={() => showPreLabel(item)}
                                                    style={{
                                                        backgroundColor: item.color,
                                                        width: 250
                                                    }}>显示{item.modelName}</Button>
                                            <br/><br/>
                                        </>
                                    )
                                    }
                                />
                                {/*<Pagination defaultCurrent={6} total={186} />*/}
                                {/*<Pagination defaultCurrent={page} total={300} onChange={()=>turnPage(page)} />*/}
                                <div style={{height: 20, width: 240, float: 'left', marginLeft: 50}}>

                                    <img id={"first"} style={{height: 20, width: 20, float: 'left', marginTop: 6}}
                                         onClick={() => changePage(0)}
                                         src={require("../data/img/first.png").default}/>
                                    <img id={"pre"} style={{height: 20, width: 20, float: 'left', marginTop: 6}}
                                         onClick={() => changePage(pageList.thisPage - 1)}
                                         src={require("../data/img/pre.png").default}/>

                                    <List
                                        style={{width: 160, height: 20, float: 'left'}}
                                        back
                                        itemLayout={"horizontal"}
                                        dataSource={pageList.page5}
                                        renderItem={item => (
                                            <Button id={'page' + item.modelId}
                                                    type={"text"}
                                                    onClick={() => changePage(item)}
                                                    style={{
                                                        height: 20,
                                                        width: 20,
                                                        float: 'left'
                                                    }}>{item}</Button>

                                        )
                                        }
                                    />
                                    <img id={"next"} style={{height: 20, width: 20, float: 'left', marginTop: 6}}
                                         onClick={() => changePage(pageList.thisPage + 1)}
                                         src={require("../data/img/next.png").default}/>
                                    <img id={"last"} style={{height: 20, width: 20, float: 'left', marginTop: 6}}
                                         onClick={() => changePage(pageList.maxPage - 1)}
                                         src={require("../data/img/last.png").default}/>
                                </div>
                            </Card>
                        </div>


                    </Content>

                </Layout>
            </Layout>
        </Layout>
    )
}

const draw = () => {
// function draw() {
    console.log("开始了");

    var canvas = document.getElementById("canv");
    console.log(canvas);
    // if (canvas.getContext) {
    //     var ctx = canvas.getContext("2d");
    //
    //     ctx.fillStyle = "rgb(200,0,0)"; // 笔的颜色
    //     ctx.fillRect(10, 10, 55, 50); // 画一个矩形
    //
    //     ctx.fillStyle = "rgba(0, 0, 200, 0.5)";// 笔的颜色
    //     ctx.fillRect(30, 30, 55, 50); // 画一个矩形
    // }
}

export default Delineate
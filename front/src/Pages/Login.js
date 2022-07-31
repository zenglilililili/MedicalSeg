import React, {useState} from 'react'
import 'antd/dist/antd.css'
import {Card, Input, Button, Spin} from 'antd'
import {UserOutlined, KeyOutlined} from '@ant-design/icons'
import '../static/css/Login.css'
import {Link} from 'react-router-dom'
import {loginApi} from "../service/auth";
import history from '../utils/history'

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading] = useState(false);

    const checkLogin = () => {
        loginApi('/logBack', {name: userName, password: password}).then((res) => {
            if (res.msg === "成功") {
                history.replace({pathname: "/patlist?id=" + res.id});
                history.go();
            } else {
                return (
                    alert(res.msg)
                )
            }
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <div className={"login-div"}>
            <Spin tip={"loading..."} spinning={isLoading}>
                <Card className={"cardName"} title="医学图像靶区勾画系统" bordered={true} style={{width: 400}}>
                    <Input id={userName} size={"large"} placeholder={"请输入用户名"}
                           prefix={<UserOutlined type={'user'} style={{color: 'rgba(0,0,0,0.25'}}/>}
                           onChange={(e) => {
                               setUserName(e.target.value)
                           }}/>
                    <br/><br/>
                    <Input.Password id={password} size={"large"} placeholder={"请输入密码"}
                                    prefix={<KeyOutlined type={"key"} style={{color: 'rgba(0,0,0,0.25'}}/>}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}/>
                    <br/><br/>
                    <Button type={"primary"} size={"mid"} block onClick={checkLogin}>登录</Button>
                    <div className={"l-registerContact-div"}>
                        <div className={"l-register-div"}>
                            <Link to={"/register"}>
                                注册
                            </Link>
                        </div>
                        <div className={"l-contact-div"}>
                            <Link to={"/contact"}>
                                联系管理员
                            </Link>
                        </div>
                    </div>
                </Card>
            </Spin>
        </div>
    )
}

export default Login
// import React, {useState} from 'react'
// import 'antd/dist/antd.css'
// import {Card, Input, Button, Spin} from 'antd'
// import {UserOutlined, KeyOutlined, IdcardOutlined, LaptopOutlined} from '@ant-design/icons'
// import '../static/css/Register.css'
// import {message} from 'antd';
//
//
// function Register() {
//     const [userName, setUserName] = useState('');
//     const [password, setPassword] = useState('');
//     const [pwd2, setPwd2] = useState('');
//
//
//     const [isLoading, setIsLoading] = useState(false);
//     const info = () => {
//         message.info('两次密码不一致');
//     };
//
//
//     const checkPwd = (e) => {
//         // console.log(e)
//         info()
//     };
//
//     const checkRegister = () => {
//         setIsLoading(true);
//         setTimeout(() => {
//             setIsLoading(false)
//         }, 1000)
//     };
//
//
//     return (
//         <div className={"register-div"}>
//
//             <Spin tip={"loading..."} spinning={isLoading}>
//                 <Card title="医学图像靶区勾画系统" bordered={true} style={{width: 400}}>
//                     <Input id={userName} size={"large"} placeholder={"请输入用户名"}
//                            prefix={<UserOutlined type={'user'} style={{color: 'rgba(0,0,0,0.25'}}/>} onChange={(e) => {
//                         setUserName(e.target.value)
//                     }}/>
//                     <br/><br/>
//                     <Input id={userName} size={"large"} placeholder={"请输入工号"}
//                            prefix={<IdcardOutlined type={'user'} style={{color: 'rgba(0,0,0,0.25'}}/>}
//                            onChange={(e) => {
//                                setUserName(e.target.value)
//                            }}/>
//                     <br/><br/>
//
//                     <Input id={userName} size={"large"} placeholder={"请输入科室"} disables={false}
//                            prefix={<LaptopOutlined type={'user'} style={{color: 'rgba(0,0,0,0.25'}}/>}
//                            onChange={(e) => {
//                                setUserName(e.target.value)
//                            }}/>
//                     <br/><br/>
//
//
//                     <Input.Password id={password} size={"large"} placeholder={"请输入密码"}
//                                     prefix={<KeyOutlined type={"key"} style={{color: 'rgba(0,0,0,0.25'}}/>}
//                                     onChange={(e) => {
//                                         setPassword(e.target.value)
//                                     }}/>
//                     <br/><br/>
//                     <Input.Password id={pwd2} size={"large"} placeholder={"请确认密码"}
//                                     prefix={<KeyOutlined type={"key"} style={{color: 'rgba(0,0,0,0.25'}}/>}
//                                     onChange={(e) => {
//                                         checkPwd(e)
//                                     }}
//                     />
//
//
//
//                     <br/><br/>
//                     <Button type={"primary"} size={"mid"} block onClick={checkRegister}> 注册</Button>
//
//
//                 </Card>
//             </Spin>
//         </div>
//     )
// }
//
// export default Register

import React, {useState} from 'react';
import {
    Form,
    Input,
    Cascader,
    Select,
    Button,
    Card, Spin
} from 'antd';
import '../static/css/Register.css'
import {loginApi} from "../service/auth";
import history from "../utils/history";

const {Option} = Select;
const department = [
    {
        label: '神经内科',
        value: "Internal Medicine-Neurology",
        children: [
            {
                label: '神经内科',
                value: 'Internal Medicine-Neurology',
            },
            {
                label: '记忆',
                value: 'Memory ',
            },
            {
                label: '中风',
                value: 'apoplexy',
            },
            {
                label: '肌肉疾病联合',
                value: 'Combination of muscle diseases',
            },

        ],
    },
    {
        label: '肿瘤科',
        value: 'Oncology Department',
        children: [
            {
                label: '黑色素瘤及软组织肉瘤专病',
                value: 'Melanoma and soft tissue sarcoma',

            },
            {
                label: '肿瘤科',
                value: 'Oncology Department',


            },
        ],
    },
];
const position = [
    {
        label: '医生',
        value: "doctor",

    },
    {
        label: '物理师',
        value: "physicist",

    },
];
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Register() {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        loginApi('/registerBack', {
            name: values.name,
            id: values.id,
            position:values.position[0],
            department: values.department,
            password: values.password,
            prefix: values.prefix,
            phoneNum: values.phone
        }).then((res) => {
            console.log(res);
            if (res) {
                console.log("boolean");

                history.replace({pathname: "/login"});
                history.go();

            } else {
                return (
                    alert("已存在当前账户，请直接登录")
                )
            }
        }).catch((err) => {
            console.log(err)
        })

    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    // const [userName, setUserName] = useState('');
    // const [userId, setUserId] = useState('');
    // var [userDepartment, setUserDepartment] = useState({
    //     d1: "",
    //     d2: ""
    // });
    // const [userPassword, setUserPassword] = useState('');
    // const [userPhoneNum, setUserPhoneNum] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const checkRegister = () => {
        // setIsLoading(true);
        // setTimeout(() => {
        //     setIsLoading(false)
        // }, 1000)


    };

    return (
        <div className={"register-div"}>

            <Spin tip={"loading..."} spinning={isLoading}>
                <Card title="医学图像靶区勾画系统" bordered={true} style={{width: 400}}>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item

                            name="name"
                            label="姓名"
                            rules={[
                                // {
                                //     type: 'Name',
                                //     message: 'The input is not valid name!',
                                // },
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input/>

                        </Form.Item>
                        <Form.Item
                            name="id"
                            label="工号"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your id!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            {/*<Input/>*/}
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="position"
                            label="职位"
                            rules={[
                                {
                                    type: 'array',
                                    required: true,
                                    message: 'Please select your position!',
                                },
                            ]}
                        >
                            <Cascader options={position}/>
                        </Form.Item>
                        <Form.Item
                            name="department"
                            label="科室"
                            rules={[
                                {
                                    type: 'array',
                                    required: true,
                                    message: 'Please select your department!',
                                },
                            ]}
                        >
                            <Cascader options={department}/>
                        </Form.Item>


                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password/>


                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="确认密码"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>


                        <Form.Item
                            name="phone"
                            label="联系电话"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                style={{
                                    width: '100%',
                                }}/>


                        </Form.Item>


                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" block onClick={checkRegister}>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        </div>
    );
}

export default Register
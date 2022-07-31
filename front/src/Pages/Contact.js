import React, {useState} from 'react'
import 'antd/dist/antd.css'
import {Card, Spin} from 'antd'
import '../static/css/Contact.css'


function Contact() {

    const [isLoading] = useState(false);


    return (
        <div className={"contact-div"}>

            <Spin tip={"loading..."} spinning={isLoading}>
                <Card title="医学图像靶区勾画系统" bordered={true} style={{width: 400}}>
                    管理员电话：188 XXXX XXXX

                </Card>
            </Spin>
        </div>
    )
}

export default Contact
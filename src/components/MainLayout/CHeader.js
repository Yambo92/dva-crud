import React from 'react'
import {Menu} from 'antd'
import { Link } from 'dva/router'
import {
    BarChartOutlined,
    HomeOutlined,
    FrownOutlined
} from '@ant-design/icons';


 const CHeader = ({location}) => {
    return (
        <Menu
            selectedKeys={[location.pathname]}
            mode="horizontal"
            theme="dark"
        >
            <Menu.Item key="/users">
                <Link to="/users"><BarChartOutlined />Users</Link>
            </Menu.Item>
            <Menu.Item key="/">
                <Link to="/"><HomeOutlined />Home</Link>
            </Menu.Item>
            <Menu.Item key="/404">
                <Link to="/page-you-dont-know"><FrownOutlined />404</Link>
            </Menu.Item>
            <Menu.Item key="/dva">
                <a href="https://github.com/dvajs/dva">dva</a>
            </Menu.Item>
        </Menu>
    )
}
export default CHeader

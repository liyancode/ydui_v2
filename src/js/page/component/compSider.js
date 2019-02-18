import React from "react";
import {Layout, Menu, Icon} from 'antd';
import {Link} from 'react-router-dom'

const {Sider} = Layout;
export default class CompSider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        if (window.location.pathname.indexOf('/notLogin') === 0) {
            return null;
        } else {
            return (
                <Sider
                    breakpoint="md"
                    collapsedWidth={0}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    theme={"dark"}
                    // style={{
                    //     overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
                    // }}
                    // trigger={null}
                    // collapsible
                    // collapsed={this.props.collapsed}
                >
                    <Menu theme={"dark"} mode="inline"
                          defaultSelectedKeys={this.props.defaultMenuKey}
                    >
                        <Menu.Item key="home">
                            <Link to='/' replace onClick={this.props.siderLinkClick}>
                                <Icon type="home"/>
                                <span>首页</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="appHR">
                            <Link to='/appHR/' replace onClick={this.props.siderLinkClick}>
                                <Icon type="user"/>
                                <span>人力资源</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="appCRM">
                            <Link to='/appCRM/' replace onClick={this.props.siderLinkClick}>
                                <Icon type="contacts"/>
                                <span>客户关系</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="appOrder">
                            <Link to='/appOrder/' replace onClick={this.props.siderLinkClick}>
                                <Icon type="shopping-cart"/>
                                <span>订单管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="appWarehouse">
                            <Link to='/appWarehouse/' replace onClick={this.props.siderLinkClick}>
                                <Icon type="database"/>
                                <span>仓储管理</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>)
        }
    }
}
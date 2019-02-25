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
                        <Menu.Item key="appMarketM">
                            <Link to='/appMarketM/' replace onClick={this.props.siderLinkClick}>
                                <Icon type="global" />
                                <span>销售管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="appDesignM">
                            <Link to='/appDesignM/' replace onClick={this.props.siderLinkClick}>
                                <Icon type="experiment" />
                                <span>设计管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="appPurchaseM">
                            <Link to='/appPurchaseM/' replace onClick={this.props.siderLinkClick}>
                                <Icon type="shopping" />
                                <span>采购管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="appWarehouseM">
                            <Link to='/appWarehouseM/' replace onClick={this.props.siderLinkClick}>
                                <Icon type="database"/>
                                <span>仓库管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="appProduceM">
                            <Link to='/appProduceM/' replace onClick={this.props.siderLinkClick}>
                                <Icon type="fire" />
                                <span>生产管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="appFinanceM">
                            <Link to='/appFinanceM/' replace onClick={this.props.siderLinkClick}>
                                <Icon type="property-safety" />
                                <span>财务管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="appSystemM">
                            <Link to='/appSystemM/' replace onClick={this.props.siderLinkClick}>
                                <Icon type="setting" />
                                <span>系统管理</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>)
        }
    }
}
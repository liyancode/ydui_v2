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
        const authoritizedComponents=this.props.authoritizedComponents
        let menuList=[],comI
        for(let i in authoritizedComponents){
            comI=authoritizedComponents[i]
            menuList.push(
                <Menu.Item key={comI.key}>
                    <Link to={'/'+comI.key+'/'} replace onClick={this.props.siderLinkClick}>
                        <Icon type={comI.iconType}/>
                        <span>{comI.cn}</span>
                    </Link>
                </Menu.Item>
            )
        }
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
                        {menuList}
                    </Menu>
                </Sider>)
        }
    }
}
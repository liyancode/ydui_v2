import React from "react";
import {Layout, Icon, Avatar, Menu, Dropdown} from 'antd';
import {serviceUser} from "../../service/serviceUser"

const {Header} = Layout;
export default class CompHeader extends React.Component {

    render() {
        if (window.location.pathname.indexOf('/notLogin') === 0) {
            return null;
        } else {
            const userName=localStorage.getItem("user_name")
            const menu = (
                <Menu>
                    <Menu.Item>
                        <a rel="noopener noreferrer" href="/appHR">
                            <span>
                                <Icon type={"user"}/>
                                {" 个人中心（"+userName+"）"}
                                </span>
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a rel="noopener noreferrer" type="danger" title={"登出"}
                           onClick={() => {
                               serviceUser.logout();
                           }}
                        ><span><Icon type={"logout"}/>{" 退出"}</span></a>
                    </Menu.Item>
                </Menu>
            );
            return (
                <Header className="header" style={{paddingLeft: 0, position: 'fixed', zIndex: 10, width: '100%'}}>
                    <div style={{fontSize: 16, float: "left", color: "white"}}>
                        <img src={"/images/yd_logo.png"} style={{height: 28}} alt={"耀迪·管理系统"}/>
                        <span>耀迪·管理系统</span>
                    </div>
                    <Icon
                        className="trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggle}
                    />
                    <div style={{fontSize: 16, float: "right", color: "white"}}>
                        <span style={{marginLeft: 20}}><Icon type={"bell"}/></span>
                        <span style={{marginLeft: 20}}><Icon type={"inbox"}/></span>
                        <span style={{fontSize: "large", marginLeft: 20}}>
                        <Dropdown overlay={menu}>
                            <Avatar shape="square" size="small" src={"/images/avatars/"+userName+".jpeg"}/>
                            </Dropdown>
                        </span>
                    </div>
                </Header>
            );
        }
    }
}
import React from "react";
import {Layout,Icon,Tag,Alert} from 'antd';

const {Header,Footer} = Layout;
export default class CompNotLogin extends React.Component {
    render() {
        if (window.location.pathname.indexOf('/login') === 0) {
            return null;
        } else {
            return (
                <div>
                    <Header className="header" style={{marginTop:-64,marginLeft:-24,paddingLeft: 0, position: 'fixed', zIndex: 10, width: '100%'}}>
                        <div style={{fontSize: 16, float: "left", color: "white"}}>
                            <img src={"/images/yd_logo.png"} style={{height: 28}} alt={"耀迪·管理系统"}/>
                            <span>耀迪·管理系统</span>
                        </div>
                    </Header>
                    <div style={{textAlign:"center",padding:24}}>
                        <Alert message="未登录或登录信息已失效！" type="warning" />
                        <a href={"/login"}>去登录</a>
                    </div>
                    <Footer style={{textAlign: 'center', background: 'transparent',marginTop:550}}>
                        <span><Icon type="copyright"/>2019 江苏耀迪新材料有限公司&nbsp;&nbsp;</span>
                        <Tag>版本 v19.1.0</Tag>
                    </Footer>
                </div>
            );
        }
    }
}
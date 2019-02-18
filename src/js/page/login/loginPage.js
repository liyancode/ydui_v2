import React from "react";
import {Layout, Icon, Tag, Card} from 'antd';
import WrappedNormalLoginForm from './loginForm'

const {
    Header, Footer, Content,
} = Layout;
export default class LoginPage extends React.Component {

    render() {
        return (
            <Layout style={{minHeight:"100%"}} className={"background-image"}>
                <Content style={{padding: '24px 40px', maxHeight: 350}}
                         id={"login-wrapper-container"}>
                    <div id={"components-form-normal-login"}>
                        <div style={{fontSize: 24, color:"#ddd",textAlign: "center", marginBottom: 24}}>
                            <img src={"/images/yd_logo.png"} style={{height: 36}} alt={"耀迪·管理系统"}/>
                            <span>耀迪·管理系统</span>
                        </div>
                        <WrappedNormalLoginForm/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center', color:"#ddd",background: 'transparent'}}>
                    <span><Icon type="copyright"/>2019 江苏耀迪新材料有限公司&nbsp;&nbsp;</span>
                    <Tag>版本 v19.1.0</Tag>
                </Footer>
            </Layout>
        );
    }
}
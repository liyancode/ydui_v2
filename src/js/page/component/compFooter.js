import React from "react";
import {Layout, Icon, Tag} from 'antd';

const {Footer} = Layout;
export default class CompFooter extends React.Component {

    render() {
        if (window.location.pathname.indexOf('/notLogin') === 0) {
            return null;
        } else {
            return (
                <Footer style={{textAlign: 'center', background: 'transparent'}}>
                    <span><Icon type="copyright"/>2019 江苏耀迪新材料有限公司&nbsp;&nbsp;</span>
                    <Tag>版本 v19.1.0</Tag>
                </Footer>
            );
        }
    }
}
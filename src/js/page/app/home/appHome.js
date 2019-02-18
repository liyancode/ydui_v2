import React from 'react';
import { Layout,  Breadcrumb,} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"

const {Content,} = Layout;

export default class AppHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadcrumb: '首页',
        }
        console.log("location:"+window.location.pathname)
    }

    render() {
        return (
            <div>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={_globalConstrants._styles.contentStyle}
                >
                    首页
                </Content>
            </div>)
    }
}
const PageContent = (props) => {
}
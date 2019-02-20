import React from 'react';
import {Layout, Breadcrumb,Tabs} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"

const {Content,} = Layout;

const TabPane = Tabs.TabPane;
export default class AppCRM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadcrumb: '客户关系',
        }
    }

    render() {
        return (
            <div>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={_globalConstrants._styles.contentStyle}
                >
                    <Tabs defaultActiveKey={"a"} onChange="" onTabClick="">
                        <TabPane tab="我的客户" key={"a"}>
                            我的客户列表(开发中...)
                        </TabPane>
                        <TabPane tab="所有客户" key={"s"}>
                            所有客户列表(开发中...)
                        </TabPane>
                    </Tabs>
                </Content>
            </div>)
    }
}
const PageContent = (props) => {
}
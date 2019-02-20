import React from 'react';
import {Layout, Breadcrumb, Tabs} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"

const {Content,} = Layout;

const TabPane = Tabs.TabPane;
const PageContent = (props) => {
    return <Tabs defaultActiveKey={"a"} onChange="" onTabClick="">
        <TabPane tab="安全访问控制" key={"a"}>
            (开发中...)
        </TabPane>
        <TabPane tab="系统权限" key={"b"}>
            (开发中...)
        </TabPane>
        <TabPane tab="数据备份" key={"c"}>
            (开发中...)
        </TabPane>
        <TabPane tab="其他设置" key={"d"}>
            (开发中...)
        </TabPane>
    </Tabs>
}

export default class AppSystemM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadcrumb: '系统管理',
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
                    <PageContent/>
                </Content>
            </div>)
    }
}
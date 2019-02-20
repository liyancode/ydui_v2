import React from 'react';
import {Layout, Breadcrumb, Tabs} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"

const {Content,} = Layout;

const TabPane = Tabs.TabPane;
const PageContent = (props) => {
    return <Tabs defaultActiveKey={"a"} onChange="" onTabClick="">
        <TabPane tab="成本管理" key={"a"}>
            (开发中...)
        </TabPane>
        <TabPane tab="生产流程管理" key={"b"}>
            (开发中...)
        </TabPane>
        <TabPane tab="委外加工管理" key={"c"}>
            (开发中...)
        </TabPane>
        <TabPane tab="家纺生产计件管理" key={"d"}>
            (开发中...)
        </TabPane>
        <TabPane tab="生产单管理" key={"e"}>
            (开发中...)
        </TabPane>
        <TabPane tab="生产工艺单管理" key={"f"}>
            (开发中...)
        </TabPane>
        <TabPane tab="品质检验跟踪管理" key={"g"}>
            (开发中...)
        </TabPane>
    </Tabs>
}

export default class AppProduceM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadcrumb: '生产管理',
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
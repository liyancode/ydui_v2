import React from 'react';
import {Layout, Breadcrumb, Tabs} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"

const {Content,} = Layout;

const TabPane = Tabs.TabPane;
const PageContent = (props) => {
    return <Tabs defaultActiveKey={"a"} onChange="" onTabClick="">
        <TabPane tab="订单合同管理" key={"a"}>
            (开发中...)
        </TabPane>
        <TabPane tab="退货管理" key={"b"}>
            (开发中...)
        </TabPane>
        <TabPane tab="销售审批管理" key={"c"}>
            (开发中...)
        </TabPane>
        <TabPane tab="销售对账管理" key={"d"}>
            (开发中...)
        </TabPane>
        <TabPane tab="销售统计" key={"e"}>
            (开发中...)
        </TabPane>
    </Tabs>
}

export default class AppMarketM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadcrumb: '销售管理',
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
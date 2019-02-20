import React from 'react';
import {Layout, Breadcrumb, Tabs} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"

const {Content,} = Layout;

const TabPane = Tabs.TabPane;
const PageContent = (props) => {
    return <Tabs defaultActiveKey={"a"} onChange="" onTabClick="">
        <TabPane tab="审批管理" key={"a"}>
            (开发中...)
        </TabPane>
        <TabPane tab="销售账务" key={"b"}>
            (开发中...)
        </TabPane>
        <TabPane tab="采购账务" key={"c"}>
            (开发中...)
        </TabPane>
        <TabPane tab="发票管理" key={"d"}>
            (开发中...)
        </TabPane>
        <TabPane tab="利润统计" key={"e"}>
            (开发中...)
        </TabPane>
        <TabPane tab="成本核算" key={"f"}>
            (开发中...)
        </TabPane>
        <TabPane tab="其他" key={"g"}>
            (开发中...)
        </TabPane>
    </Tabs>
}

export default class AppFinanceM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadcrumb: '财务管理',
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
import React from 'react';
import {Layout, Breadcrumb, Tabs} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"

const {Content,} = Layout;

const TabPane = Tabs.TabPane;
const PageContent = (props) => {
    return <Tabs defaultActiveKey={"a"} onChange="" onTabClick="">
        <TabPane tab="申请采购单" key={"a"}>
            (开发中...)
        </TabPane>
        <TabPane tab="采购入库" key={"b"}>
            (开发中...)
        </TabPane>
        <TabPane tab="采购应付款" key={"c"}>
            (开发中...)
        </TabPane>
        <TabPane tab="采购退货" key={"d"}>
            (开发中...)
        </TabPane>
        <TabPane tab="采购明细统计" key={"e"}>
            (开发中...)
        </TabPane>
        <TabPane tab="供应商管理" key={"f"}>
            (开发中...)
        </TabPane>
    </Tabs>
}

export default class AppPurchaseM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadcrumb: '采购管理',
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
import React from 'react';
import {Layout, Breadcrumb, Button, Tag, Tabs, Icon, Modal, Spin, Table} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"
import _globalUtil from "../../../util/_globalUtil";
import {serviceWarehouse} from "../../../service/serviceWarehouse";
import {_WH_Config} from "./_wh_config";
import WrappedFormOutWarehouseNew from "./_form/_formOutWarehouseNew"

const {Content,} = Layout;
const TabPane = Tabs.TabPane;

const subConstrants = {
    overView: "overView",
    outManagement: "outManagement",
    inManagement: "inManagement",
    inventoryManagement: "inventoryManagement",
}

const childConstrants = {
    all: 'all',
    viewDetail: 'viewDetail',
    create: 'create',
    edit: 'edit',
}

const PageContent = (props) => {
    const btnStyle = {
        marginRight: 8,
        marginBottom: 12
    }

    // "wh_out_record": {
    //         "item_count": 3,
    //         "other": null,
    //         "item_total_price": 30150,
    //         "delivery_by": "kongm",
    //         "wh_out_record_status": "new",
    //         "created_at": "2019-02-17 20:42:44 +0800",
    //         "ship_to_address": "测试收货地址",
    //         "ship_to_name": "测试收货单位",
    //         "created_by": "admin",
    //         "ship_to_user": "xzjj",
    //         "ship_date": "2019-02-18",
    //         "ship_to_phone_number": "13900001111",
    //         "last_update_by": "admin",
    //         "wh_out_record_id": "",
    //         "last_update_at": "2019-02-17 20:42:44 +0800",
    //         "comment": null,
    //         "salesman": "liud",
    //         "id": 1,
    //         "order_id": "YD-D1902170001",
    //         "status": 1
    //     }
    const wh_out_record_table_columns = [
        {
            title: '出库单号',
            dataIndex: 'wh_out_record_id',
            key: 'wh_out_record_id',
            sorter: (a, b) => a.wh_out_record_id - b.wh_out_record_id ? 1 : -1,
        },
        {
            title: '状态',
            dataIndex: 'wh_out_record_status',
            key: 'wh_out_record_status',
            sorter: (a, b) => a.wh_out_record_status - b.wh_out_record_status ? 1 : -1,
            render: (text, record) => {
                return <Tag><span><Icon type="tag" /> {_WH_Config._wh_record_out_status(record.wh_out_record_status)}</span></Tag>
            },
        },
        {
            title: '制单人',
            dataIndex: 'created_by',
            key: 'created_by',
            sorter: (a, b) => a.created_by > b.created_by ? 1 : -1,
        },
        {
            title: '制单时间',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => a.created_at - b.created_at ? 1 : -1,
            render: (text, record) => {
                return _WH_Config._format_time_string_by_minute(record.created_at)
            },
        },
        {
            title: '关联订单',
            dataIndex: 'order_id',
            key: 'order_id',
            sorter: (a, b) => a.order_id > b.order_id ? 1 : -1,
        },
        {
            title: '业务员',
            dataIndex: 'salesman',
            key: 'salesman',
            sorter: (a, b) => a.salesman > b.salesman ? 1 : -1,
        },
        {
            title: '货品计数',
            dataIndex: 'item_count',
            key: 'item_count',
            sorter: (a, b) => a.item_count > b.item_count ? 1 : -1,
            render: (text, record) => {
                return _WH_Config._format_number(record.item_count)
            },
        },
        {
            title: '送货人',
            dataIndex: 'delivery_by',
            key: 'delivery_by',
            sorter: (a, b) => a.delivery_by > b.delivery_by ? 1 : -1,
        },
        {
            title: '收货单位',
            dataIndex: 'ship_to_name',
            key: 'ship_to_name',
            sorter: (a, b) => a.ship_to_name > b.ship_to_name ? 1 : -1,
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (<span>
                <a href="javascript:;" onClick={props.handleCheckDetailOnclick}
                   wh_out_record_id={record.wh_out_record_id} record_type={"wh_out_record"}>查看详情</a>
                </span>)
            },
        }]

    let tabOverView, tabOutManagement, tabInManagement, tabInventoryManagement;
    switch (props.sub) {
        case subConstrants.overView:
            tabOverView =
                <div>
                    总览
                </div>
            break
        case subConstrants.outManagement:
            switch (props.child) {
                case childConstrants.all:
                    tabOutManagement =
                        <div>
                            <div>
                                <Button style={btnStyle} type="primary" icon="plus" myattr={subConstrants.outManagement}
                                        onClick={props.createButtonClick}>出库单<Icon type="upload"/></Button>
                                <Button type="primary" style={btnStyle} myattr={subConstrants.outManagement}
                                        onClick={props.reloadBtnOnclick}>
                                    <Icon type="reload"/>
                                    <span>刷新</span>
                                </Button>
                            </div>
                            <Spin spinning={props.loading}>
                                <Table rowKey="id" columns={wh_out_record_table_columns}
                                       dataSource={props.wh_out_records} size="small" bordered/>
                            </Spin>
                        </div>
                    break
                case childConstrants.viewDetail:
                    tabOutManagement =
                        <div>
                            <Button type="primary" style={btnStyle} onClick={props.backButtonClickFromViewDetail}>
                                <Icon type="left"/>
                                <span>返回</span>
                            </Button>
                            viewDetail
                        </div>
                    break
                case childConstrants.create:
                    tabOutManagement =
                        <div>
                            <Button type="primary" style={btnStyle} onClick={props.backButtonClickFromCreate}>
                                <Icon type="left"/>
                                <span>返回</span>
                            </Button>
                            <WrappedFormOutWarehouseNew/>
                        </div>
                    break
                case childConstrants.edit:
                    tabOutManagement =
                        <div>
                            <Button type="primary" style={btnStyle} onClick={props.backButtonClickFromEdit}>
                                <Icon type="left"/>
                                <span>返回</span>
                            </Button>
                            edit
                        </div>
                    break
                default:
                    break
            }
            break
        case subConstrants.inManagement:
            switch (props.child) {
                case childConstrants.all:
                    tabInManagement =
                        <div>
                            <Button style={btnStyle} type="primary" icon="plus" myattr={subConstrants.inManagement}
                                    onClick={props.createButtonClick}>入库单<Icon type="download"/></Button>
                            all
                        </div>
                    break
                case childConstrants.viewDetail:
                    tabInManagement =
                        <div>
                            <Button type="primary" style={btnStyle} onClick={props.backButtonClickFromViewDetail}>
                                <Icon type="left"/>
                                <span>返回</span>
                            </Button>
                            viewDetail
                        </div>
                    break
                case childConstrants.create:
                    tabInManagement =
                        <div>
                            <Button type="primary" style={btnStyle} onClick={props.backButtonClickFromCreate}>
                                <Icon type="left"/>
                                <span>返回</span>
                            </Button>
                            create
                        </div>
                    break
                case childConstrants.edit:
                    tabInManagement =
                        <div>
                            <Button type="primary" style={btnStyle} onClick={props.backButtonClickFromEdit}>
                                <Icon type="left"/>
                                <span>返回</span>
                            </Button>
                            edit
                        </div>
                    break
                default:
                    break
            }
            break
        case subConstrants.inventoryManagement:
            switch (props.child) {
                case childConstrants.all:
                    tabInventoryManagement =
                        <div>
                            <Button style={btnStyle} type="primary" icon="plus"
                                    myattr={subConstrants.inventoryManagement}
                                    onClick={props.createButtonClick}>新建库存<Icon type="build"/></Button>
                            all
                        </div>
                    break
                case childConstrants.viewDetail:
                    tabInventoryManagement =
                        <div>
                            <Button type="primary" style={btnStyle} onClick={props.backButtonClickFromViewDetail}>
                                <Icon type="left"/>
                                <span>返回</span>
                            </Button>
                            viewDetail
                        </div>
                    break
                case childConstrants.create:
                    tabInventoryManagement =
                        <div>
                            <Button type="primary" style={btnStyle} onClick={props.backButtonClickFromCreate}>
                                <Icon type="left"/>
                                <span>返回</span>
                            </Button>
                            create
                        </div>
                    break
                case childConstrants.edit:
                    tabInventoryManagement =
                        <div>
                            <Button type="primary" style={btnStyle} onClick={props.backButtonClickFromEdit}>
                                <Icon type="left"/>
                                <span>返回</span>
                            </Button>
                            edit
                        </div>
                    break
                default:
                    break
            }
            break
        default:
            break
    }
    return (
        <Tabs defaultActiveKey={props.sub} onChange={props.tabChange} onTabClick={props.tabClick}>
            {/*<TabPane tab="总览" key={subConstrants.overView}>*/}
                {/*{tabOverView}*/}
            {/*</TabPane>*/}
            <TabPane tab="出库记录" key={subConstrants.outManagement}>
                {tabOutManagement}
            </TabPane>
            <TabPane tab="入库记录" key={subConstrants.inManagement}>
                {tabInManagement}
            </TabPane>
            <TabPane tab="库存信息" key={subConstrants.inventoryManagement}>
                {tabInventoryManagement}
            </TabPane>
        </Tabs>)
}
export default class AppWarehouse extends React.Component {
    constructor(props) {
        super(props);
        const _sub = _globalUtil._getSearchSub()
        this.state = {
            loading: true,
            breadcrumb: '仓储管理',
            sub: _sub ? _sub : subConstrants.outManagement,
            child: childConstrants.all,
            wh_out_records: []
        }

        this.updateSubData = this.updateSubData.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
        this.handleBackButtonClickFromViewDetail = this.handleBackButtonClickFromViewDetail.bind(this);
        this.handleBackButtonClickFromCreate = this.handleBackButtonClickFromCreate.bind(this);
        this.handleBackButtonClickFromEdit = this.handleBackButtonClickFromEdit.bind(this);
        this.handleCheckDetailOnclick = this.handleCheckDetailOnclick.bind(this);
        this.handleReloadBtnOnclick = this.handleReloadBtnOnclick.bind(this);

        serviceWarehouse.getWHOutRecordAll().then(data => {
            this.setState({
                loading: false,
                wh_out_records: data["wh_out_records"]
            });
        })
    }

    updateSubData(sub) {
        this.setState({
            loading: true,
        });
        switch (sub) {
            case subConstrants.outManagement:
                serviceWarehouse.getWHOutRecordAll().then(data => {
                    this.setState({
                        loading: false,
                        wh_out_records: data["wh_out_records"]
                    });
                })
                break
            default:
                this.setState({
                    loading: false,
                });
                // serviceUser.getUserFullInfoByUsername(this.state.userName).then(data => {
                //     this.setState({
                //         loading: false,
                //         userInfo: data
                //     });
                // })
                break
        }
    }

    handleTabClick(e) {
        // console.log(e)
        // if(this.state.child===childConstrants.edit||this.state.child===childConstrants.create){
        //     confirm({
        //         title: '确认离开当前页面？',
        //         content: '还未提交过的信息不会被保留',
        //         onOk() {
        //             _globalUtil._setSearchSub(e)
        //             this.updateSubData(e)
        //             this.setState({
        //                 sub:e,
        //                 child: childConstrants.all
        //             });
        //         },
        //         onCancel() {
        //             console.log('Cancel');
        //         },
        //     });
        // }
    }

    handleTabChange(e) {
        _globalUtil._setSearchSub(e)
        this.updateSubData(e)
        this.setState({
            sub: e,
            child: childConstrants.all
        });
    }

    handleCreateButtonClick(e) {
        this.setState({
            child: childConstrants.create
        });
    }

    handleBackButtonClickFromViewDetail(e) {
        this.setState({
            child: childConstrants.all
        });
    }

    handleBackButtonClickFromCreate(e) {
        this.setState({
            child: childConstrants.all
        });
    }

    handleBackButtonClickFromEdit(e) {
        this.setState({
            child: childConstrants.viewDetail
        });
    }

    handleCheckDetailOnclick(e) {
        const attrs=e.target.attributes
        const record_type=attrs.record_type.value
        console.log(record_type)
    }

    handleReloadBtnOnclick(e){
        console.log(e.target.attributes.myattr.value)
        this.updateSubData(e.target.attributes.myattr.value)
    }

    render() {
        return (
            <div>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={_globalConstrants._styles.contentStyle}
                >
                    <PageContent
                        loading={this.state.loading}
                        sub={this.state.sub}
                        child={this.state.child}
                        wh_out_records={this.state.wh_out_records}
                        tabClick={this.handleTabClick}
                        tabChange={this.handleTabChange}
                        createButtonClick={this.handleCreateButtonClick}
                        reloadBtnOnclick={this.handleReloadBtnOnclick}
                        backButtonClickFromViewDetail={this.handleBackButtonClickFromViewDetail}
                        backButtonClickFromCreate={this.handleBackButtonClickFromCreate}
                        backButtonClickFromEdit={this.handleBackButtonClickFromEdit}
                        handleCheckDetailOnclick={this.handleCheckDetailOnclick}
                    />
                </Content>
            </div>)
    }
}
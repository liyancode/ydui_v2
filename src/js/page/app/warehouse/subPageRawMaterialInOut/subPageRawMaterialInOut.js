import React from 'react';
import {Layout, Breadcrumb, Button, Tag, Tabs, Icon, Radio, Spin, Table} from 'antd';
import _globalConstrants from "../../../../util/_globalConstrants"
import _globalUtil from "../../../../util/_globalUtil";
import {serviceWarehouse} from "../../../../service/serviceWarehouse";
import {_WH_Config} from "./../_wh_config";
import WrappedFormOutWarehouseNew from "./form/_formOutWarehouseNew"

const {Content,} = Layout;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
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

function whLocationMap(whLocation) {
    let tg;
    switch (whLocation) {
        case 'yaodi':
            tg = <Tag color="#2db7f5">耀迪仓库</Tag>
            break;
        case 'other':
            tg = <Tag color="#87d068">其他仓库</Tag>
            break;
        default:
            tg = <Tag>未知<Icon type="minus-circle-o"/></Tag>
            break;
    }
    return <span>{tg}</span>
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
                return <Tag><span><Icon
                    type="tag"/> {_WH_Config._wh_record_out_status(record.wh_out_record_status)}</span></Tag>
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

    const wh_inventory_table_columns = [
        {
            title: '编号',
            dataIndex: 'wh_inventory_id',
            key: 'wh_inventory_id',
            sorter: (a, b) => a.wh_inventory_id - b.wh_inventory_id ? 1 : -1,
        },
        {
            title: '类别',
            dataIndex: 'wh_inventory_type',
            key: 'wh_inventory_type',
            sorter: (a, b) => a.wh_inventory_type - b.wh_inventory_type ? 1 : -1,
            render: (text, record) => {
                return _WH_Config._en_to_cn(props.inventoryManagementRatioValue)
            },
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name > b.name ? 1 : -1,
        },
        {
            title: '规格',
            dataIndex: 'specification',
            key: 'specification',
            sorter: (a, b) => a.specification > b.specification ? 1 : -1,
        },
        // {
        //     title: '单价',
        //     dataIndex: 'unit_price',
        //     key: 'unit_price',
        //     sorter: (a, b) => a.unit_price > b.unit_price ? 1 : -1,
        //     render: (text, record) => {
        //         return eNumber(record.unit_price) + "元"
        //     },
        // },
        {
            title: '库存剩余',
            dataIndex: 'count',
            key: 'count',
            sorter: (a, b) => new Number(a.count) > new Number(b.count) ? 1 : -1,
            render: (text, record) => {
                return _WH_Config._format_number(record.count) + " " + _WH_Config._en_to_cn(record.count_unit)
            },
        },
        {
            title: '辅助计数',
            dataIndex: 'auxiliary_count',
            key: 'auxiliary_count',
            sorter: (a, b) => new Number(a.auxiliary_count) > new Number(b.auxiliary_count) ? 1 : -1,
            render: (text, record) => {
                return _WH_Config._format_number(record.auxiliary_count) + " " + _WH_Config._en_to_cn(record.auxiliary_count_unit)
            },
        },
        {
            title: '管理员',
            dataIndex: 'principal',
            key: 'principal',
        },
        {
            title: '所在仓库',
            key: 'wh_location',
            sorter: (a, b) => a.followup_status > b.followup_status ? 1 : -1,
            render: (text, record) => {
                return whLocationMap(record.wh_location)
            },
        }, {
            title: '最近变更时间',
            dataIndex: 'last_update_at',
            key: 'last_update_at',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.last_update_at > b.last_update_at ? 1 : -1,
            render: (text, record) => {
                return (record.last_update_at.split('+')[0])
            },
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (<span>
                        <a href="javascript:;" onClick={props.handleCheckDetailOnclick}
                           wh_inventory_id={record.wh_inventory_id} record_type="wh_inventory">查看详情</a>
                        </span>)
            },
        }];
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
                            <hr/>
                            <div>
                                <RadioGroup onChange={props.onChangeInventoryManagementRadio}
                                            value={props.inventoryManagementRatioValue}>
                                    <Radio value={'yuanliao'}><Tag>原料</Tag></Radio>
                                    <Radio value={'peibu'}><Tag>胚布</Tag></Radio>
                                    <Radio value={'chengpin'}><Tag>成品</Tag></Radio>
                                    <Radio value={'zhuji'}><Tag>助剂</Tag></Radio>
                                    <Radio value={'fuliao'}><Tag>辅料</Tag></Radio>
                                </RadioGroup>
                            </div>
                            <Spin spinning={props.loading}>
                                <Table rowKey="id" columns={wh_inventory_table_columns}
                                       dataSource={props.inventoryManagementList} size="small" bordered/>
                            </Spin>
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
        <div>
            <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                <Icon type="left"/>
                <span>返回</span>
            </Button>
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
            </Tabs>
        </div>
        )
}
export default class SubPageRawMaterialInOut extends React.Component {
    constructor(props) {
        super(props);
        const _sub = _globalUtil._getSearchSub()
        this.state = {
            loading: true,
            breadcrumb: '仓储管理',
            sub: _sub ? _sub : subConstrants.outManagement,
            child: childConstrants.all,
            inventoryManagementRatioValue: "yuanliao",
            inventoryManagementList: [],
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
        this.onChangeInventoryManagementRadio = this.onChangeInventoryManagementRadio.bind(this);


        serviceWarehouse.getWHOutRecordAll().then(data => {
            if (data) {
                this.setState({
                    loading: false,
                    wh_out_records: data["wh_out_records"]
                });
            }
        })
    }

    updateSubData(sub) {
        this.setState({
            loading: true,
        });
        switch (sub) {
            case subConstrants.outManagement:
                serviceWarehouse.getWHOutRecordAll().then(data => {
                    if (data) {
                        this.setState({
                            loading: false,
                            wh_out_records: data["wh_out_records"]
                        });
                    }
                })
                break
            case subConstrants.inventoryManagement:
                serviceWarehouse.getWHInventoryListByInventoryType("yuanliao").then(data => {
                    this.setState({
                        inventoryManagementList: data,
                        inventoryManagementRatioValue:"yuanliao",
                        loading: false
                    });
                });
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
        const attrs = e.target.attributes
        const record_type = attrs.record_type.value
        console.log(record_type)
    }

    handleReloadBtnOnclick(e) {
        console.log(e.target.attributes.myattr.value)
        this.updateSubData(e.target.attributes.myattr.value)
    }

    onChangeInventoryManagementRadio(e) {
        let value = e.target.value
        this.setState({loading: true});

        serviceWarehouse.getWHInventoryListByInventoryType(value).then(data => {
            this.setState({
                inventoryManagementList: data,
                inventoryManagementRatioValue:value,
                loading: false
            });
        });
    }

    render() {
        return (
            <PageContent
                loading={this.state.loading}
                sub={this.state.sub}
                child={this.state.child}
                wh_out_records={this.state.wh_out_records}
                inventoryManagementRatioValue={this.state.inventoryManagementRatioValue}
                inventoryManagementList={this.state.inventoryManagementList}
                tabClick={this.handleTabClick}
                tabChange={this.handleTabChange}
                createButtonClick={this.handleCreateButtonClick}
                reloadBtnOnclick={this.handleReloadBtnOnclick}
                backButtonClickFromViewDetail={this.handleBackButtonClickFromViewDetail}
                backButtonClickFromCreate={this.handleBackButtonClickFromCreate}
                backButtonClickFromEdit={this.handleBackButtonClickFromEdit}
                handleCheckDetailOnclick={this.handleCheckDetailOnclick}
                onChangeInventoryManagementRadio={this.onChangeInventoryManagementRadio}
                backLandingButtonClick={this.props.backLandingButtonClick}
            />)
    }
}
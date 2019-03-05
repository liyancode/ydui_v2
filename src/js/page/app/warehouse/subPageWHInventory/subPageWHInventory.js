import React from "react";
import {Tag, Icon, Button, Spin, Table, Radio, Divider} from 'antd';
import _globalConstrants from "../../../../util/_globalConstrants"
import {serviceWarehouse} from "../../../../service/serviceWarehouse";
import {_WH_Config} from "../_wh_config";

import WrappedFormFormNewWHInventory from "./form/_formNewWHInventory"
import WrappedFormFormEditWHInventory from "./form/_formEditWHInventory"

const _childPages = _globalConstrants._pages.childPages
const _styles = _globalConstrants._styles

const _constrants = {
    in: "in",
    out: "out"
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

function eNumber(eStr) {
    return new Number(eStr).toString()
}

function recordTypeMap(recordType) {
    let tg;
    switch (recordType) {
        case 'inbound':
            tg = "入库记录"
            break;
        case 'outbound':
            tg = "出库记录"
            break;
        case 'update':
            tg = "手动更新库存记录"
            break;
        case 'add':
            tg = "新增库存记录"
            break;
        default:
            tg = "未知"
            break;
    }
    return tg;
}

const RadioGroup = Radio.Group;
const PageContent = (props) => {
    const btnStyle = {
        marginRight: '8px',
        marginBottom: '12px'
    }
    const _pstate = props._pstate;
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
                return _WH_Config._en_to_cn(_pstate.inventoryManagementRatioValue)
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
                        <a href="javascript:;" onClick={props.checkDetailOnclick}
                           wh_inventory_id={record.wh_inventory_id} record_type="wh_inventory">查看详情</a>
                        </span>)
            },
        }];
    let _pageContent = <div>
        <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
            <Icon type="left"/>
            <span>返回</span>
        </Button>
        {_globalConstrants._pages.errorPage}
    </div>
    switch (_pstate.childPage) {
        case _childPages.createNew:
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backAllBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedFormFormNewWHInventory/>
            </div>
            break
        case _childPages.all:
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <Button style={btnStyle} type="primary" icon="plus"
                            onClick={props.addNewBtnOnclick}>
                        新建库存
                    </Button>
                    <Button type="primary" disabled={_pstate.loading} className="btn_backTOLanding"
                            onClick={props.reloadBtnOnclick}>
                        <Icon type="reload"/>
                        <span>刷新</span>
                    </Button>
                    <hr/>
                    <div>
                        <RadioGroup onChange={props.onChangeInventoryManagementRadio}
                                    value={_pstate.inventoryManagementRatioValue}>
                            <Radio value={'yuanliao'}><Tag>原料</Tag></Radio>
                            <Radio value={'peibu'}><Tag>胚布</Tag></Radio>
                            <Radio value={'chengpin'}><Tag>成品</Tag></Radio>
                            <Radio value={'zhuji'}><Tag>助剂</Tag></Radio>
                            <Radio value={'fuliao'}><Tag>辅料</Tag></Radio>
                        </RadioGroup>
                    </div>
                    <Spin spinning={_pstate.loading}>
                        <Table rowKey="id" columns={wh_inventory_table_columns}
                               dataSource={_pstate.dataList} size="small" bordered/>
                    </Spin>
                </div>
            </div>
            break;
        case _childPages.viewDetail:
            _pageContent = "detail";
            const one_item = _pstate.dataOne;
            console.log(one_item);
            let detailContent = <div className="col-sm-12 col-md-6">...</div>
            if (one_item != null) {
                detailContent = <div className="col-sm-12 col-md-6">
                    <Divider orientation={"left"}>
                        <Icon type="profile"/>
                        <span>[{one_item["wh_inventory_id"]},{one_item["name"]},{one_item["specification"]}] 详细信息</span>
                    </Divider>
                    <table className="table table-bordered table-condensed">
                        <tbody>
                        <tr>
                            <td>名称</td>
                            <td><h4>{one_item["name"]}</h4></td>
                        </tr>
                        <tr>
                            <td>创建时间</td>
                            <td>{one_item["created_at"].split('+')[0]}</td>
                        </tr>
                        <tr>
                            <td>规格</td>
                            <td>{one_item["specification"]}</td>
                        </tr>
                        <tr>
                            <td>库存数量</td>
                            <td>{eNumber(one_item["count"]) + " " + _WH_Config._en_to_cn(one_item["count_unit"])}</td>
                        </tr>
                        <tr>
                            <td>单价</td>
                            <td>{eNumber(one_item["unit_price"])}元</td>
                        </tr>
                        <tr>
                            <td>辅助计数</td>
                            <td>{eNumber(one_item["auxiliary_count"]) + " " + _WH_Config._en_to_cn(one_item["auxiliary_count_unit"])}</td>
                        </tr>
                        <tr>
                            <td>负责人</td>
                            <td>{one_item["principal"]}</td>
                        </tr>
                        <tr>
                            <td>所在仓库</td>
                            <td>{whLocationMap(one_item["wh_location"])}</td>
                        </tr>
                        <tr>
                            <td>仓库内部位置</td>
                            <td>{one_item["wh_inner_location"]}</td>
                        </tr>
                        <tr>
                            <td>描述</td>
                            <td>{one_item["description"]}</td>
                        </tr>
                        <tr>
                            <td>备注</td>
                            <td>{one_item["comment"]}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><Button type="primary" icon="edit" style={btnStyle}
                                        onClick={props.editDetailBtnOnClick}>更新</Button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            }
            let one_item_history = _pstate.dataOneHistory.sort(_WH_Config._sort_list_arr_by_last_update_at).reverse();

            let hist_logs = []
            let log
            let limit = 20;
            for (let i = 0; i < one_item_history.length && limit > 0; i++, limit--) {
                log = one_item_history[i];
                hist_logs.push(<p
                    key={log.id}>{_WH_Config._format_time_string_by_minute(log.last_update_at) + " " + log.last_update_by + " " + recordTypeMap(log.history_type)}</p>)
            }
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backAllBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <Spin spinning={_pstate.loading}>
                    {detailContent}
                    <div className="col-sm-12 col-md-6">
                        <Divider orientation={"left"}>
                            <Icon type="profile"/>
                            <span>出入库记录</span>
                        </Divider>
                        {/*<table className="table table-bordered table-condensed">*/}
                        {/*{batch_list_thead}*/}
                        {/*<tbody>*/}
                        {/*{batch_list}*/}
                        {/*</tbody>*/}
                        {/*</table>*/}
                        {/*<Table rowKey="id" columns={props.table_columns_batch}*/}
                        {/*dataSource={[]} size="small"/>*/}
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <Divider orientation={"left"}>
                            <Icon type="profile"/>
                            <span>更新日志</span>
                        </Divider>
                        {hist_logs}
                    </div>
                </Spin>
            </div>
            break
        case _childPages.edit:
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backViewDetailBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <WrappedFormFormEditWHInventory one_item={_pstate.dataOne}/>
                </div>
            </div>
            break
        default:
            break;
    }
    return _pageContent;
}
export default class SubPageWHInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadcrumb: '原材料出入库',
            page: _constrants.out,
            childPage: _childPages.all,
            dataList: [],
            dataOne: null,
            dataOneHistory:[],
            inventoryManagementRatioValue: "yuanliao",
        }

        this.updateDataOne = this.updateDataOne.bind(this);
        this.handleAddNewBtnOnclick = this.handleAddNewBtnOnclick.bind(this);
        this.handleReloadBtnOnclick = this.handleReloadBtnOnclick.bind(this);
        this.handleCheckDetailOnclick = this.handleCheckDetailOnclick.bind(this);
        this.handleBackAllBtnOnclick = this.handleBackAllBtnOnclick.bind(this);
        this.handleBackViewDetailBtnOnclick = this.handleBackViewDetailBtnOnclick.bind(this);
        this.onChangeInventoryManagementRadio = this.onChangeInventoryManagementRadio.bind(this);

        this.handleEditDetailBtnOnClick = this.handleEditDetailBtnOnClick.bind(this);

        serviceWarehouse.getWHInventoryListByInventoryType("yuanliao").then(data => {
            if (data) {
                this.setState({
                    loading: false,
                    dataList: data
                });
            }
        })

    }

    updateDataOne(wh_inventory_id) {
        if (this.state.page === _constrants.out) {
            this.setState({
                loading: true
            });
            serviceWarehouse.getWHInventoryByInventoryId(wh_inventory_id).then(data => {
                if (data) {
                    serviceWarehouse.getWHInventoryHistoryListByInventoryId(wh_inventory_id).then(data1 => {
                        this.setState({
                            loading: false,
                            dataOne: data,
                            dataOneHistory:data1
                        });
                    })
                }
            });
        } else if (this.state.page === _constrants.in) {

        }
    }

    handleAddNewBtnOnclick(e) {
        this.setState({
            childPage: _childPages.createNew
        });
    }

    handleReloadBtnOnclick(e) {
        this.setState({
            loading: true
        });
        serviceWarehouse.getWHInventoryListByInventoryType(this.state.inventoryManagementRatioValue).then(data => {
            if (data) {
                this.setState({
                    loading: false,
                    dataList: data
                });
            }
        })
    }

    handleCheckDetailOnclick(e) {
        const wh_inventory_id = e.target.attributes.wh_inventory_id.value
        if (wh_inventory_id) {
            this.setState({
                childPage: _childPages.viewDetail
            });
            this.updateDataOne(wh_inventory_id);
        }
    }

    handleBackAllBtnOnclick() {
        this.setState({
            childPage: _childPages.all
        });
    }

    handleBackViewDetailBtnOnclick() {
        this.setState({
            childPage: _childPages.viewDetail
        });
        this.updateDataOne(this.state.dataOne.wh_inventory_id)
    }

    onChangeInventoryManagementRadio(e) {
        let value = e.target.value
        this.setState({loading: true});

        serviceWarehouse.getWHInventoryListByInventoryType(value).then(data => {
            this.setState({
                dataList: data,
                inventoryManagementRatioValue: value,
                loading: false
            });
        });
    }

    handleEditDetailBtnOnClick() {
        this.setState({
            childPage: _childPages.edit
        });
    }

    render() {
        return (<PageContent
            _pstate={this.state}
            backLandingButtonClick={this.props.backLandingButtonClick}
            addNewBtnOnclick={this.handleAddNewBtnOnclick}
            reloadBtnOnclick={this.handleReloadBtnOnclick}
            checkDetailOnclick={this.handleCheckDetailOnclick}
            backAllBtnOnclick={this.handleBackAllBtnOnclick}
            editDetailBtnOnClick={this.handleEditDetailBtnOnClick}
            backViewDetailBtnOnclick={this.handleBackViewDetailBtnOnclick}
            onChangeInventoryManagementRadio={this.onChangeInventoryManagementRadio}
        />);
    }
}
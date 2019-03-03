import React from "react";
import {Tag,Icon,Button,Spin,Table} from 'antd';
import _globalConstrants from "../../../../util/_globalConstrants"
import {serviceWarehouse} from "../../../../service/serviceWarehouse";
import {_WH_Config} from "../_wh_config";
import WrappedFormOutWarehouseNew from "./form/_formOutWarehouseNew"

const _childPages=_globalConstrants._pages.childPages
const _styles=_globalConstrants._styles

const _constrants={
    in:"in",
    out:"out"
}

const PageContent=(props)=>{
    const btnStyle = {
        marginRight: '8px',
        marginBottom: '12px'
    }
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
                <a href="javascript:;" onClick={props.checkDetailOnclick}
                   record_id={record.wh_out_record_id} record_type={"wh_out_record"}>查看详情</a>
                </span>)
            },
        }]
    let _pageContent = <div>
        <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
            <Icon type="left"/>
            <span>返回</span>
        </Button>
        {_globalConstrants._pages.errorPage}
    </div>
    const _pstate=props._pstate;
    switch(_pstate.childPage){
        case _childPages.createNew:
            _pageContent=<div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backAllBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    新建出库单
                </div>
                <WrappedFormOutWarehouseNew/>
            </div>
            break
        case _childPages.all:
            _pageContent=<div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.addNewBtnOnclick}>
                        <Icon type="plus"/>
                        <span>新建出库信息</span>
                    </Button>
                    <Button type="primary" disabled={_pstate.loading} className="btn_backTOLanding" onClick={props.reloadBtnOnclick}>
                        <Icon type="reload"/>
                        <span>刷新</span>
                    </Button>
                </div>
                <Spin spinning={_pstate.loading}>
                    <Table rowKey="id" columns={wh_out_record_table_columns}
                           dataSource={_pstate.dataList} size="small"/>
                </Spin>
            </div>
            break;
        case _childPages.viewDetail:
            _pageContent="detail";
            const dataOne=_pstate.dataOne;

            if(dataOne){
                const wh_out_record=dataOne.wh_out_record
                const items=dataOne.items
            }

            _pageContent=<div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backAllBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>

            </div>
            break
        case _childPages.edit:
            _pageContent=<div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backViewDetailBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
            </div>
            break
        default:
            break;
    }
    return _pageContent;
}
export default class SubPageRawMaterialInOut extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loading: true,
            breadcrumb: '原材料出入库',
            page:_constrants.out,
            childPage:_childPages.all,
            dataList:[],
            dataOne:{}
        }

        this.updateDataOne = this.updateDataOne.bind(this);
        this.handleAddNewBtnOnclick = this.handleAddNewBtnOnclick.bind(this);
        this.handleReloadBtnOnclick = this.handleReloadBtnOnclick.bind(this);
        this.handleCheckDetailOnclick = this.handleCheckDetailOnclick.bind(this);
        this.handleBackAllBtnOnclick = this.handleBackAllBtnOnclick.bind(this);
        this.handleBackViewDetailBtnOnclick = this.handleBackViewDetailBtnOnclick.bind(this);


        serviceWarehouse.getWHOutRecordAll().then(data => {
            if (data) {
                this.setState({
                    loading: false,
                    dataList: data["wh_out_records"]
                });
            }
        })

    }

    updateDataOne(recordId){
        if(this.state.page===_constrants.out){
            this.setState({
                loading: true
            });
            serviceWarehouse.getWHOutRecordById(recordId).then(data=>{
                if(data){
                    this.setState({
                        loading: false,
                        dataOne: data
                    });
                }
            });
        }else if(this.state.page===_constrants.in){

        }
    }

    handleAddNewBtnOnclick(e){
        this.setState({
            childPage:_childPages.createNew
        });
    }

    handleReloadBtnOnclick(e){
        this.setState({
            loading: true
        });
        serviceWarehouse.getWHOutRecordAll().then(data => {
            if (data) {
                this.setState({
                    loading: false,
                    dataList: data["wh_out_records"]
                });
            }
        })
    }

    handleCheckDetailOnclick(e){
        const record_id=e.target.attributes.record_id.value
        if(record_id){
            this.setState({
                childPage:_childPages.viewDetail
            });
            this.updateDataOne(record_id);
        }
    }
    handleBackAllBtnOnclick(){
        this.setState({
            childPage:_childPages.all
        });
    }

    handleBackViewDetailBtnOnclick(){
        this.setState({
            childPage:_childPages.viewDetail
        });
        this.updateDataOne(this.state.dataOne.wh_out_record.wh_out_record_id)
    }

    render(){
        return (<PageContent
            _pstate={this.state}
            backLandingButtonClick={this.props.backLandingButtonClick}
            addNewBtnOnclick={this.handleAddNewBtnOnclick}
            reloadBtnOnclick={this.handleReloadBtnOnclick}
            checkDetailOnclick={this.handleCheckDetailOnclick}
            backAllBtnOnclick={this.handleBackAllBtnOnclick}
            backViewDetailBtnOnclick={this.handleBackViewDetailBtnOnclick}
        />);
    }
}
import React from "react";
import {Tag, Icon, Button, Spin, Table, Card,Modal,Select} from 'antd';
import _globalConstrants from "../../../../util/_globalConstrants"
import _globalUtil from "../../../../util/_globalUtil"
import {serviceWarehouse} from "../../../../service/serviceWarehouse";
import {_WH_Config} from "../_wh_config";
import WrappedFormOutWarehouseNew from "./form/_formOutWarehouseNew"
const Option = Select.Option;

const _childPages = _globalConstrants._pages.childPages
const _styles = _globalConstrants._styles

const _constrants = {
    in: "in",
    out: "out"
}

const PageContent = (props) => {
    const btnStyle = {
        marginRight: '8px',
        marginBottom: '12px'
    }
    const wh_out_record_table_columns = [
        {
            title: '出库单号',
            dataIndex: 'wh_out_record_id',
            key: 'wh_out_record_id',
            defaultSortOrder: 'ascend',
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
    const _pstate = props._pstate;
    switch (_pstate.childPage) {
        case _childPages.createNew:
            _pageContent = <div>
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
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.addNewBtnOnclick}>
                        <Icon type="plus"/>
                        <span>新建出库信息</span>
                    </Button>
                    <Button type="primary" disabled={_pstate.loading} className="btn_backTOLanding"
                            onClick={props.reloadBtnOnclick}>
                        <Icon type="reload"/>
                        <span>刷新</span>
                    </Button>
                </div>
                <Spin spinning={_pstate.loading}>
                    <div style={{overflow: "scroll"}}>
                        <Table rowKey="id" columns={wh_out_record_table_columns}
                               style={{minWidth: 1200}}
                               dataSource={_pstate.dataList} size="small"/>
                    </div>
                </Spin>
            </div>
            break;
        case _childPages.viewDetail:
            _pageContent = "detail";
            const dataOne = _pstate.dataOne;
            const styleInline = {
                display: "inline"
            }
            let detailDiv = "", baseInfo = ""
            let itemsTrs = []
            if (dataOne) {
                console.log(dataOne);
                const wh_out_record = dataOne.wh_out_record
                const items = dataOne.items
                if (items !== undefined) {
                    for (let i = 0; i < items.length; i++) {
                        let itemI = items[i]
                        itemsTrs.push(
                            <tr key={i + 1}>
                                <td colSpan={1}>{i + 1}</td>
                                <td colSpan={2}>{itemI.wh_inventory_id}</td>
                                <td colSpan={3}>{itemI.name}</td>
                                <td colSpan={3}>{itemI.specific}</td>
                                <td colSpan={2}>
                                    {_WH_Config._format_number(itemI.packing_count)}
                                </td>
                                <td colSpan={1}>{_WH_Config._en_to_cn(itemI.packing_count_unit)}</td>
                                <td colSpan={2}>
                                    {_WH_Config._format_number(itemI.auxiliary_count)}
                                </td>
                                <td colSpan={1}>{_WH_Config._en_to_cn(itemI.auxiliary_count_unit)}</td>
                                <td colSpan={3}>
                                    {_WH_Config._format_number(itemI.unit_price)}
                                </td>
                                <td colSpan={2}>{_WH_Config._format_number(itemI.total_price)}</td>
                                <td colSpan={4}>
                                    {itemI.comment}
                                </td>
                            </tr>
                        )
                    }
                    const lgth = itemsTrs.length
                    if (lgth < 5) {
                        for (let i = 0; i < 5 - lgth; i++) {
                            itemsTrs.push(
                                <tr key={i + lgth + 1}>
                                    <td colSpan={1}></td>
                                    <td colSpan={2}></td>
                                    <td colSpan={3}></td>
                                    <td colSpan={3}></td>
                                    <td colSpan={2}></td>
                                    <td colSpan={1}></td>
                                    <td colSpan={2}></td>
                                    <td colSpan={1}></td>
                                    <td colSpan={3}></td>
                                    <td colSpan={2}></td>
                                    <td colSpan={4}></td>
                                </tr>
                            )
                        }
                    }
                }
                baseInfo = <div>
                    <h5>出库单编号：{wh_out_record.wh_out_record_id}</h5>
                    <h5>生成时间：{wh_out_record.created_at}</h5>
                    <h5 style={styleInline}>当前状态：{_WH_Config._wh_record_out_status(wh_out_record.wh_out_record_status)}</h5>
                    <Button style={{marginLeft: 10}} type={"primary"} size={"small"}
                            onClick={() => props.showupdateWhOutRecordStatusModal(wh_out_record.wh_out_record_id)}>
                        更新状态
                    </Button>
                    <h5>最后更新时间：{wh_out_record.last_update_at}</h5>
                    <Modal
                        title="更新出库单状态"
                        visible={_pstate.updateWhOutRecordStatusVisible}
                        onOk={props.updateWhOutRecordStatus}
                        onCancel={props.closeUpdateWhOutRecordStatusModal}
                    >
                        <h5>出库单编号：{wh_out_record.wh_out_record_id}</h5>
                        出库单状态：
                        <Select defaultValue={wh_out_record.wh_out_record_status}
                                style={{ width: 120 }}
                                onChange={(e)=>props.updateWhOutRecordStatusModalSelectChange(e,wh_out_record.wh_out_record_id)}>
                            <Option value="new">新增</Option>
                            <Option value="prepare">备货中</Option>
                            <Option value="wait">备货完成待发货</Option>
                            <Option value="shipped">已发货</Option>
                            <Option value="received">已确认收货</Option>
                            <Option value="done">完成</Option>
                            <Option value="return">退回</Option>
                            <Option value="cancel">取消</Option>
                            <Option value="lost">丢失</Option>
                            <Option value="unknown">未知</Option>
                        </Select>
                    </Modal>
                </div>
                detailDiv =
                    <table id="wh_out_record_form_table">
                        <thead>
                        <tr>
                            <td rowSpan={2} colSpan={18} style={{textAlign: "center"}}><h4 style={styleInline}><img
                                src={"/images/yd_logo_form.png"} style={{height: 50}}/>江苏耀迪新材料有限公司
                                - 出库单</h4></td>
                            <td rowSpan={2} colSpan={6}><img id={"wh_out_record_id_barcode"}/></td>
                        </tr>
                        <tr></tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colSpan={2}><b>收货单位</b></td>
                            <td colSpan={10}>
                                {wh_out_record.ship_to_name}
                            </td>
                            <td colSpan={2}><b>订单编号</b></td>
                            <td colSpan={6}>
                                {wh_out_record.order_id}
                            </td>
                            <td colSpan={4}></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><b>收货地址</b></td>
                            <td colSpan={10}>
                                {wh_out_record.ship_to_address}
                            </td>
                            <td colSpan={2}><b>收货电话</b></td>
                            <td colSpan={4}>
                                {wh_out_record.ship_to_phone_number}
                            </td>
                            <td colSpan={2}><b>发货日期</b></td>
                            <td colSpan={4}>
                                {_WH_Config._format_time_string_by_day(wh_out_record.ship_date)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={1}><b>序号</b></td>
                            <td colSpan={2}><b>品名</b></td>
                            <td colSpan={3}><b>品名</b></td>
                            <td colSpan={3}><b>产品规格</b></td>
                            <td colSpan={2}><b>包装规格</b></td>
                            <td colSpan={1}><b>单位</b></td>
                            <td colSpan={2}><b>数量</b></td>
                            <td colSpan={1}><b>单位</b></td>
                            <td colSpan={3}><b>单价</b></td>
                            <td colSpan={2}><b>金额</b></td>
                            <td colSpan={4}><b>备注</b></td>
                        </tr>
                        {itemsTrs}
                        <tr>
                            <td colSpan={1}><b>总计</b></td>
                            <td colSpan={11}>{_WH_Config._format_number(wh_out_record.item_total_price)}</td>
                            <td colSpan={2}></td>
                            <td colSpan={1}></td>
                            <td colSpan={3}><b>总计</b></td>
                            <td colSpan={2}>{_WH_Config._format_number(wh_out_record.item_total_price)}</td>
                            <td colSpan={4}></td>
                        </tr>
                        <tr>
                            <td colSpan={4}><b>说明</b></td>
                            <td colSpan={20} style={{color: "red"}}>
                                <p>备注：本出库与合同具有同等效力。</p>
                                <p>1.收货后请及时检查，如有质量问题请7天内书面通知，协商解决。一经加工，恕我司一概不负责。</p>
                                <p>2.本出库单经收货单位工作人员或其委托的人员签收即生效，谢谢合作！</p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}><b>业务员</b></td>
                            <td colSpan={4}>
                                {wh_out_record.salesman}
                            </td>
                            <td colSpan={2}><b>制单人</b></td>
                            <td colSpan={4}>
                                {wh_out_record.created_by}
                            </td>
                            <td colSpan={2}><b>送货人</b></td>
                            <td colSpan={4}>
                                {wh_out_record.delivery_by}
                            </td>
                            <td colSpan={2}><b>收货人</b></td>
                            <td colSpan={4}>
                                {wh_out_record.ship_to_user}
                            </td>
                        </tr>
                        </tbody>
                    </table>

            }
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backAllBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                {baseInfo}
                <br/>
                <Button type={"primary"} onClick={()=>_globalUtil._saveHtmlToPDFFile('wh_out_record_form_table','test.pdf')}>打印</Button>
                <Card style={{backgroundColor: "#e8e8e8", padding: 0, overflow: "scroll"}}>{detailDiv}</Card>
            </div>
            break
        case _childPages.edit:
            _pageContent = <div>
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
        this.state = {
            loading: true,
            breadcrumb: '原材料出入库',
            page: _constrants.out,
            childPage: _childPages.all,
            dataList: [],
            dataOne: null,
            updateWhOutRecordStatusVisible:false,
            updateWhOutRecordStatusKV:null,
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

    componentDidUpdate(prevProps, prevState) {
        if (this.state.dataOne != null && this.state.childPage === _childPages.viewDetail) {
            const wh_out_record_id = this.state.dataOne.wh_out_record.wh_out_record_id
            if (wh_out_record_id !== undefined) {
                console.log("barcode....");
                _globalUtil._generateBarcode("wh_out_record_id_barcode", wh_out_record_id)
            } else {
                console.log("____barcode")
                console.log(this.state.dataOne)
            }
        }
    }

    updateDataOne(recordId) {
        if (this.state.page === _constrants.out) {
            this.setState({
                loading: true
            });
            serviceWarehouse.getWHOutRecordById(recordId).then(data => {
                if (data) {
                    this.setState({
                        loading: false,
                        dataOne: data
                    });
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
        serviceWarehouse.getWHOutRecordAll().then(data => {
            if (data) {
                this.setState({
                    loading: false,
                    dataList: data["wh_out_records"]
                });
            }
        })
    }

    handleCheckDetailOnclick(e) {
        const record_id = e.target.attributes.record_id.value
        if (record_id) {
            this.setState({
                childPage: _childPages.viewDetail
            });
            this.updateDataOne(record_id);
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
        this.updateDataOne(this.state.dataOne.wh_out_record.wh_out_record_id)
    }

    showupdateWhOutRecordStatusModal = (wh_out_record_id) => {
        this.setState({
            updateWhOutRecordStatusVisible: true,
            updateWhOutRecordStatusKV:[wh_out_record_id,this.state.dataOne.wh_out_record.wh_out_record_status]
        });
    }

    closeUpdateWhOutRecordStatusModal=()=>{
        this.setState({
            updateWhOutRecordStatusVisible: false,
            updateWhOutRecordStatusKV:null
        });
    }

    updateWhOutRecordStatusModalSelectChange=(e,wh_out_record_id)=>{
        this.setState(
            {
                updateWhOutRecordStatusKV:[wh_out_record_id,e]
            }
        )
    }

    updateWhOutRecordStatus=()=>{
        const kv=this.state.updateWhOutRecordStatusKV;
        if(kv!=null){
            serviceWarehouse.updateWHOutRecordStatus(kv[0],kv[1]).then(data=>{
                if(data!=null){
                    this.closeUpdateWhOutRecordStatusModal()
                    let dataOne=this.state.dataOne
                    let wh_out_record=dataOne.wh_out_record;
                    wh_out_record.wh_out_record_status=kv[1]
                    dataOne.wh_out_record=wh_out_record
                    this.setState({
                        dataOne:dataOne
                    })
                }
            })
        }
    }

    render() {
        return (<PageContent
            _pstate={this.state}
            backLandingButtonClick={this.props.backLandingButtonClick}
            addNewBtnOnclick={this.handleAddNewBtnOnclick}
            reloadBtnOnclick={this.handleReloadBtnOnclick}
            checkDetailOnclick={this.handleCheckDetailOnclick}
            backAllBtnOnclick={this.handleBackAllBtnOnclick}
            backViewDetailBtnOnclick={this.handleBackViewDetailBtnOnclick}
            showupdateWhOutRecordStatusModal={this.showupdateWhOutRecordStatusModal}
            closeUpdateWhOutRecordStatusModal={this.closeUpdateWhOutRecordStatusModal}
            updateWhOutRecordStatusModalSelectChange={this.updateWhOutRecordStatusModalSelectChange}
            updateWhOutRecordStatus={this.updateWhOutRecordStatus}
        />);
    }
}
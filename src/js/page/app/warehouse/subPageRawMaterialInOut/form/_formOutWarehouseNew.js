import React from 'react';
import {
    Form,
    Spin,
    Table,
    Input,
    Select,
    Popconfirm,
    Icon,
    Button,
    Radio,
    DatePicker,
    Drawer,
    Tag,
    InputNumber,
    Modal
} from 'antd';
import {_WH_Config} from '../../_wh_config';
import {serviceWarehouse} from '../../../../../service/serviceWarehouse';

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;
const Search = Input.Search;
const RadioGroup = Radio.Group;

const _selectedStr="_selected"

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

class _formOutWarehouseNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            confirmDirty: false,
            autoCompleteResult: [],
            items: [],
            dataList: [],
            inventoryType: 'all',
            inventoryIdsToSearch: [],
            totalPrice:0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.updateDataList = this.updateDataList.bind(this);
        this.selectOneInventory = this.selectOneInventory.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if(this.state.items.length===0){
                    Modal.warning({
                        title: '提示',
                        content: '出库单不能为空，至少包含一条出库信息！',
                    });
                }else{

                }
                this.setState({loading: true});
                //     "wh_out_record": {
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
                //         "order_id": "YD-D1902170006",
                //         "status": 1
                //     }
                let wh_out_record={
                            "item_count": this.state.items.length,
                            "other": null,
                            "item_total_price": this.state.totalPrice,
                            "delivery_by": values["delivery_by"],
                            "wh_out_record_status": "new",
                            "created_at": "",
                            "ship_to_address": values["ship_to_address"],
                            "ship_to_name": values["ship_to_name"],
                            "created_by": values["created_by"],
                            "ship_to_user": values["ship_to_user"],
                            "ship_date": values["ship_date"],
                            "ship_to_phone_number": values["ship_to_phone_number"],
                            "last_update_by": "admin",
                            "wh_out_record_id": "",
                            "last_update_at": "",
                            "comment": null,
                            "salesman": values["salesman"],
                            "id": 1,
                            "order_id": values["order_id"],
                            "status": 1
                }

                let body={
                    wh_out_record:wh_out_record,
                    items:this.state.items
                }

                serviceWarehouse.addWHOutRecord(body).then(data=>{
                    if(data!=null){
                        this.setState({
                            loading: false,
                            visible: false,
                            confirmDirty: false,
                            autoCompleteResult: [],
                            items: [],
                            dataList: [],
                            inventoryType: 'all',
                            inventoryIdsToSearch: [],
                            totalPrice:0
                        })
                    }else{

                    }
                })
            }
        });
    }

    //inventory_type: type or 'all'
    //ids: '09,87,3388'
    updateDataList = (inventory_type, ids) => {
        this.setState({loading: true});
        serviceWarehouse.getWHInventoryListByInventoryTypeIds(inventory_type, ids).then(data => {
            if (data) {
                let newList = this.diffDataListAndItems(data, this.state.items);
                this.setState({
                    dataList: newList,
                    loading: false
                });
            }
        })
    }

    diffDataListAndItems(dataList, items) {
        let itemsIds = []
        for (let i = 0; i < items.length; i++) {
            itemsIds.push(items[i].wh_inventory_id)
        }
        console.log(itemsIds)
        let newDataList = []
        for (let i = 0; i < dataList.length; i++) {
            if (itemsIds.includes(dataList[i].wh_inventory_id)) {
                dataList[i].other=_selectedStr
            }
            newDataList.push(dataList[i])
        }

        return newDataList
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
        if(this.state.dataList.length===0){
            this.updateDataList('all', '')
        }
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onChangeInventoryTypeRadio = (e) => {
        const type=e.target.value
        this.setState({
            loading: true,
        });
        this.updateDataList(type,'')
    }

    updateTotalPrice=(items)=>{
        let totalPrice=0;

        for(let i=0;i<items.length;i++){
            let itemI=items[i];
            totalPrice+=parseFloat(itemI.total_price)
        }
        this.setState({
            totalPrice:totalPrice.toFixed(2)
        })
    }

    selectOneInventory = (e) => {
        const wh_inventory_id = e.target.attributes.wh_inventory_id.value
        const dataList = this.state.dataList
        let newList = []
        let items = this.state.items;
        for (let i = 0; i < dataList.length; i++) {
            let dataI = dataList[i];
            if (dataI.wh_inventory_id === wh_inventory_id) {
                dataI.other=_selectedStr
                items.push(
                    {
                        "auxiliary_count_unit": dataI.auxiliary_count_unit,
                        "other": null,
                        "total_price": dataI.unit_price,
                        "packing_count": 1,
                        "created_at": "2019-02-17 20:46:36 +0800",
                        "unit_price": dataI.unit_price,
                        "created_by": "admin",
                        "packing_count_unit": dataI.count_unit,
                        "last_update_by": "admin",
                        "wh_out_record_id": '-1',
                        "last_update_at": "2019-02-17 20:46:36 +0800",
                        "comment": null,
                        "auxiliary_count": 1,
                        "id": 1,
                        "wh_inventory_id": dataI.wh_inventory_id,
                        "status": 1,
                        "specific": dataI.specification,
                        "name": dataI.name
                    }
                )
            }
            newList.push(dataI)
        }
        this.setState({
            dataList: newList
        })
    }

    deleteOneItem = (e) => {
        const wh_inventory_id = e.target.attributes.wh_inventory_id.value
        let newItems = []
        const items = this.state.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].wh_inventory_id !== wh_inventory_id) {
                newItems.push(items[i])
            }
        }
        this.updateTotalPrice(newItems)
        this.setState({
            items: newItems
        })
    }


    changeItemNumber = (e, type, wh_inventory_id) => {
        const newValue = e
        let items = this.state.items;
        switch (type) {
            case 'packing_count':
                for (let i = 0; i < items.length; i++) {
                    if (items[i].wh_inventory_id === wh_inventory_id) {
                        items[i].packing_count = newValue
                        items[i].total_price = (newValue*items[i].unit_price).toFixed(2)
                    }
                }
                break;
            case 'auxiliary_count':
                for (let i = 0; i < items.length; i++) {
                    if (items[i].wh_inventory_id === wh_inventory_id) {
                        items[i].auxiliary_count = newValue
                    }
                }
                break;
            case 'unit_price':
                for (let i = 0; i < items.length; i++) {
                    if (items[i].wh_inventory_id === wh_inventory_id) {
                        items[i].unit_price = newValue
                        items[i].total_price = (newValue*items[i].packing_count).toFixed(2)
                    }
                }
                break;
            default:
                break;
        }
        this.updateTotalPrice(items)
        this.setState({
            items: items
        })
    }

    changeItemComment=(e,wh_inventory_id)=>{
        const newValue = e.target.value
        let items = this.state.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].wh_inventory_id === wh_inventory_id) {
                items[i].comment = newValue
            }
        }
        this.setState({
            items: items
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 10,
                },
            },
        };

        const styleInline = {
            display: "inline"
        }

        let items = []
        for (let i = 0; i < this.state.items.length; i++) {
            let itemI = this.state.items[i]

            //         {
            //             "auxiliary_count_unit": "tong",
            //             "other": null,
            //             "total_price": 10050,
            //             "packing_count": 10,
            //             "created_at": "2019-02-17 20:46:36 +0800",
            //             "unit_price": 100,
            //             "created_by": "admin",
            //             "packing_count_unit": "kg",
            //             "last_update_by": "admin",
            //             "wh_out_record_id": "YD-CKD1902170006",
            //             "last_update_at": "2019-02-17 20:46:36 +0800",
            //             "comment": null,
            //             "auxiliary_count": 1,
            //             "id": 1,
            //             "wh_inventory_id": "YD-WH-PB0003",
            //             "status": 1
            //         }
            items.push(
                <tr key={i + 1}>
                    <td colSpan={1}>{i + 1}</td>
                    <td colSpan={2}>{itemI.wh_inventory_id}</td>
                    <td colSpan={3}>{itemI.name}</td>
                    <td colSpan={3}>{itemI.specific}</td>
                    <td colSpan={2}>
                        <InputNumber min={0} step={0.1} size={"small"}
                                     value={itemI.packing_count}
                                     onChange={(e) => this.changeItemNumber(e, 'packing_count', itemI.wh_inventory_id)}
                        />
                    </td>
                    <td colSpan={1}>{_WH_Config._en_to_cn(itemI.packing_count_unit)}</td>
                    <td colSpan={2}>
                        <InputNumber min={0} step={0.1} size={"small"}
                                     value={itemI.auxiliary_count}
                                     onChange={(e) => this.changeItemNumber(e, 'auxiliary_count', itemI.wh_inventory_id)}
                        />
                    </td>
                    <td colSpan={1}>{_WH_Config._en_to_cn(itemI.auxiliary_count_unit)}</td>
                    <td colSpan={3}>
                        <InputNumber min={0} step={0.1} size={"small"}
                                     value={itemI.unit_price}
                                     onChange={(e) => this.changeItemNumber(e, 'unit_price', itemI.wh_inventory_id)}
                        />
                    </td>
                    <td colSpan={2}>{itemI.total_price}</td>
                    <td colSpan={4}>
                        <Input value={itemI.comment}
                               size={"small"}
                               style={{width:"70%"}}
                               onChange={(e)=>this.changeItemComment(e,itemI.wh_inventory_id)}/>
                        <Button size={"small"} type={"danger"} style={{float: "right"}}
                                wh_inventory_id={itemI.wh_inventory_id}
                                onClick={this.deleteOneItem}
                        >
                            <Icon type={"close"}/>
                        </Button>
                    </td>
                </tr>
            )
        }

        const wh_inventory_table_columns = [
            {
                title: '编号',
                dataIndex: 'wh_inventory_id',
                key: 'wh_inventory_id',
                fixed: 'left',
                width: 150,
                defaultSortOrder: '',
                sorter: (a, b) => a.wh_inventory_id - b.wh_inventory_id ? 1 : -1,
            },
            {
                title: '类别',
                dataIndex: 'wh_inventory_type',
                key: 'wh_inventory_type',
                sorter: (a, b) => a.wh_inventory_type - b.wh_inventory_type ? 1 : -1,
                render: (text, record) => {
                    return _WH_Config._en_to_cn(record.wh_inventory_type)
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
                title: '所在仓库',
                key: 'wh_location',
                sorter: (a, b) => a.followup_status > b.followup_status ? 1 : -1,
                render: (text, record) => {
                    return whLocationMap(record.wh_location)
                },
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 80,
                render: (text, record) => {
                    let btn=<Button type={"primary"} size={"small"}
                                    onClick={this.selectOneInventory}
                                    wh_inventory_id={record.wh_inventory_id}
                    >添加</Button>
                    if(record.other===_selectedStr){
                        btn=<Button type={"primary"} size={"small"} disabled={true}
                                    wh_inventory_id={record.wh_inventory_id}
                        >已添加</Button>
                    }
                    return (
                        <span>
                            {btn}
                        </span>)
                },
            }];

        //{
        //     "items": [
        //         {
        //             "auxiliary_count_unit": "tong",
        //             "other": null,
        //             "total_price": 10050,
        //             "packing_count": 10,
        //             "created_at": "2019-02-17 20:46:36 +0800",
        //             "unit_price": 100,
        //             "created_by": "admin",
        //             "packing_count_unit": "kg",
        //             "last_update_by": "admin",
        //             "wh_out_record_id": "YD-CKD1902170006",
        //             "last_update_at": "2019-02-17 20:46:36 +0800",
        //             "comment": null,
        //             "auxiliary_count": 1,
        //             "id": 1,
        //             "wh_inventory_id": "YD-WH-PB0001",
        //             "status": 1
        //         },
        //         {
        //             "auxiliary_count_unit": "tong",
        //             "other": null,
        //             "total_price": 10050,
        //             "packing_count": 10,
        //             "created_at": "2019-02-17 20:46:36 +0800",
        //             "unit_price": 100,
        //             "created_by": "admin",
        //             "packing_count_unit": "kg",
        //             "last_update_by": "admin",
        //             "wh_out_record_id": "YD-CKD1902170006",
        //             "last_update_at": "2019-02-17 20:46:36 +0800",
        //             "comment": null,
        //             "auxiliary_count": 1,
        //             "id": 1,
        //             "wh_inventory_id": "YD-WH-PB0002",
        //             "status": 1
        //         },
        //         {
        //             "auxiliary_count_unit": "tong",
        //             "other": null,
        //             "total_price": 10050,
        //             "packing_count": 10,
        //             "created_at": "2019-02-17 20:46:36 +0800",
        //             "unit_price": 100,
        //             "created_by": "admin",
        //             "packing_count_unit": "kg",
        //             "last_update_by": "admin",
        //             "wh_out_record_id": "YD-CKD1902170006",
        //             "last_update_at": "2019-02-17 20:46:36 +0800",
        //             "comment": null,
        //             "auxiliary_count": 1,
        //             "id": 1,
        //             "wh_inventory_id": "YD-WH-PB0003",
        //             "status": 1
        //         }
        //     ],
        //     "wh_out_record": {
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
        //         "order_id": "YD-D1902170006",
        //         "status": 1
        //     }
        // }
        //<Card style={{background: "rgb(236, 236, 236)", overflow: "scroll"}}>
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <div style={{background: "rgb(236, 236, 236)", overflow: "scroll"}}>
                        <table id="wh_out_record_form_table">
                            <thead>
                            <tr>
                                <td rowSpan={2} colSpan={18} style={{textAlign: "center"}}><h4 style={styleInline}><img
                                    src={"/images/yd_logo_form.png"} style={{height: 50}}/>江苏耀迪新材料有限公司
                                    - 出库单</h4></td>
                                <td rowSpan={2} colSpan={6} style={{color: "green"}}>[单号条形码 提交生成]</td>
                            </tr>
                            <tr></tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colSpan={2}><b>收货单位</b></td>
                                <td colSpan={10}>
                                    <FormItem>
                                        {getFieldDecorator('ship_to_name', {
                                            rules: [{
                                                required: true, message: '请输入收货单位!',
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                                <td colSpan={2}><b>订单编号</b></td>
                                <td colSpan={6}>
                                    <FormItem>
                                        {getFieldDecorator('order_id', {
                                            rules: [{
                                                required: true, message: '请输入订单编号!',
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                                <td colSpan={4}></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><b>收货地址</b></td>
                                <td colSpan={10}>
                                    <FormItem>
                                        {getFieldDecorator('ship_to_address', {
                                            rules: [{
                                                required: true, message: '请输入收货地址!',
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                                <td colSpan={2}><b>收货电话</b></td>
                                <td colSpan={4}>
                                    <FormItem>
                                        {getFieldDecorator('ship_to_phone_number', {
                                            rules: [{
                                                required: true, message: '请输入收货电话!',
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                                <td colSpan={2}><b>发货日期</b></td>
                                <td colSpan={4}>
                                    <FormItem>
                                        {getFieldDecorator('ship_date', {
                                            rules: [{
                                                required: true, message: '请输入发货日期!',
                                            }],
                                        })(
                                            <DatePicker/>
                                        )}
                                    </FormItem>
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
                            {items}
                            <tr>
                                <td colSpan={1}>
                                    <Button type="primary" style={{}} onClick={this.showDrawer}>
                                        <Icon type="plus"/>
                                    </Button>
                                </td>
                                <td colSpan={4}></td>
                                <td colSpan={4}></td>
                                <td colSpan={2}></td>
                                <td colSpan={1}></td>
                                <td colSpan={2}></td>
                                <td colSpan={1}></td>
                                <td colSpan={3}></td>
                                <td colSpan={2}></td>
                                <td colSpan={4}></td>
                            </tr>
                            {/*<tr>*/}
                            {/*<td colSpan={1}></td>*/}
                            {/*<td colSpan={4}></td>*/}
                            {/*<td colSpan={4}></td>*/}
                            {/*<td colSpan={2}></td>*/}
                            {/*<td colSpan={1}></td>*/}
                            {/*<td colSpan={2}></td>*/}
                            {/*<td colSpan={1}></td>*/}
                            {/*<td colSpan={3}></td>*/}
                            {/*<td colSpan={2}></td>*/}
                            {/*<td colSpan={4}></td>*/}
                            {/*</tr>*/}
                            <tr>
                                <td colSpan={1}><b>总计</b></td>
                                <td colSpan={11}>{this.state.totalPrice}</td>
                                <td colSpan={2}></td>
                                <td colSpan={1}></td>
                                <td colSpan={3}><b>总计</b></td>
                                <td colSpan={2}>{this.state.totalPrice}</td>
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
                                    <FormItem>
                                        {getFieldDecorator('salesman',
                                            {})(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                                <td colSpan={2}><b>制单人</b></td>
                                <td colSpan={4}>
                                    <FormItem>
                                        {getFieldDecorator('created_by',
                                            {})(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                                <td colSpan={2}><b>送货人</b></td>
                                <td colSpan={4}>
                                    <FormItem>
                                        {getFieldDecorator('delivery_by',
                                            {})(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                                <td colSpan={2}><b>收货人</b></td>
                                <td colSpan={4}>
                                    <FormItem>
                                        {getFieldDecorator('ship_to_user',
                                            {})(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <FormItem {...tailFormItemLayout}>
                        <Popconfirm title="确认提交？" onConfirm={this.handleSubmit}
                                    okText="是" cancelText="否">
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Popconfirm>
                    </FormItem>
                </Form>
                <Drawer
                    title="选择要出库的库存"
                    width="50%"
                    onClose={this.onClose}
                    visible={this.state.visible}
                    style={{
                        overflow: 'auto',
                        height: 'calc(100% - 108px)',
                        paddingBottom: '108px',
                    }}
                >
                    <div>
                        <RadioGroup onChange={this.onChangeInventoryTypeRadio}
                                    defaultValue={'all'}>
                            <Radio value={'all'}><Tag>所有</Tag></Radio>
                            <Radio value={'yuanliao'}><Tag>原料</Tag></Radio>
                            <Radio value={'peibu'}><Tag>胚布</Tag></Radio>
                            <Radio value={'chengpin'}><Tag>成品</Tag></Radio>
                            <Radio value={'zhuji'}><Tag>助剂</Tag></Radio>
                            <Radio value={'fuliao'}><Tag>辅料</Tag></Radio>
                        </RadioGroup>
                    </div>
                    <br/>
                    {/*<Input placeholder="编号"/>*/}
                    <Spin spinning={this.state.loading}>
                        <Table rowKey="id" columns={wh_inventory_table_columns}
                               dataSource={this.state.dataList}
                               scroll={{x: 1280, y: 420}}
                               size="small" bordered/>
                    </Spin>
                    <p>已选 {this.state.items.length} 条目</p>
                    <table id="wh_out_record_form_table_modal">
                        <thead>
                        <tr>
                            <td colSpan={1}>序号</td>
                            <td colSpan={2}>品名</td>
                            <td colSpan={3}>品名</td>
                            <td colSpan={3}>产品规格</td>
                            <td colSpan={2}>包装规格</td>
                            <td colSpan={1}>单位</td>
                            <td colSpan={2}>数量</td>
                            <td colSpan={1}>单位</td>
                            <td colSpan={3}>单价</td>
                            <td colSpan={2}>金额</td>
                            <td colSpan={4}>备注</td>
                        </tr>
                        </thead>
                        <tbody>
                        {items}
                        </tbody>
                    </table>
                </Drawer>
            </div>
        );
    }
}

const WrappedFormOutWarehouseNew = Form.create()(_formOutWarehouseNew);
export default WrappedFormOutWarehouseNew;
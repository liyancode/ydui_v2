import React from 'react';
import {Form, Input, Select, Popconfirm, Icon, Button, Card,DatePicker} from 'antd';
import {_WH_Config} from '../../_wh_config';

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

// import {serviceWarehouse} from '../../../_services/service.warehouse';

class _formOutWarehouseNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            autoCompleteResult: [],
            items: [
                {
                    num: 1,
                    name: "春秋丁",
                    specific: "320cm",
                    packingCount: 5,
                    packingCountUnit: 'kg',
                    aCount: 1,
                    aCountUnit: 'juan',
                    comment: "ddd",
                    unitPrice: 22,
                    totalPrice: 110
                }
            ]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        //#--- common property
        //             dest_obj.id = meta_hash["id"]
        //             dest_obj.created_by = meta_hash["created_by"]
        //             dest_obj.last_update_by = meta_hash["last_update_by"]
        //             dest_obj.status = meta_hash["status"]
        //             dest_obj.comment = meta_hash["comment"]
        //             #--- customized property
        //             dest_obj.wh_inventory_id = meta_hash["wh_inventory_id"]
        //             dest_obj.wh_inventory_type = meta_hash["wh_inventory_type"]
        //             dest_obj.wh_location = meta_hash["wh_location"]
        //             dest_obj.wh_inner_location = meta_hash["wh_inner_location"]
        //             dest_obj.principal = meta_hash["principal"]
        //             dest_obj.name = meta_hash["name"]
        //             dest_obj.specification = meta_hash["specification"]
        //             dest_obj.description = meta_hash["description"]
        //             dest_obj.count = meta_hash["count"]
        //             dest_obj.count_unit = meta_hash["count_unit"]
        //             dest_obj.unit_price = meta_hash["unit_price"]
        //             dest_obj.auxiliary_count = meta_hash["auxiliary_count"]
        //             dest_obj.auxiliary_count_unit = meta_hash["auxiliary_count_unit"]
        //             dest_obj.other = meta_hash["other"]
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let wh_inventory = {
                    "id": -1,
                    "created_by": "",
                    "last_update_by": "",
                    "status": 1,
                    "comment": values["comment"],
                    "wh_inventory_id": "",
                    "wh_inventory_type": values["wh_inventory_type"],
                    "wh_location": values["wh_location"],
                    "wh_inner_location": values["wh_inner_location"],
                    "principal": values["principal"],
                    "name": values["name"],
                    "specification": values["specification"],
                    "description": values["description"],
                    "count": values["count"],
                    "count_unit": values["count_unit"],
                    "unit_price": values["unit_price"],
                    "auxiliary_count": values["auxiliary_count"],
                    "auxiliary_count_unit": values["auxiliary_count_unit"],
                    "other": values["other"],
                };
                // serviceWarehouse.addWHInventory(wh_inventory).then(data => {
                //     this.setState({loading: false});
                // });
            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const formItemLayoutType1 = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 3},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 9},
            },
        };

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
        const whLocationSelector = getFieldDecorator('wh_location', {
            initialValue: 'yaodi',
        })(
            <Select>
                <Option value="yaodi">耀迪仓库</Option>
                <Option value="other">其他仓库</Option>
            </Select>
        );

        const typeSelector = getFieldDecorator('wh_inventory_type', {
            initialValue: 'yuanliao',
        })(
            <Select>
                {_WH_Config._inventory_type_options()}
            </Select>
        );

        const countUnitSelector = getFieldDecorator('count_unit', {
            initialValue: 'meter',
        })(
            <Select>
                {_WH_Config._measure_unit_options()}
            </Select>
        );

        const auxiliaryCountUnitSelector = getFieldDecorator('auxiliary_count_unit', {
            initialValue: 'meter',
        })(
            <Select>
                {_WH_Config._measure_unit_options()}
            </Select>
        );

        const styleInline = {
            display: "inline"
        }

        let items = []
        for (let i = 0; i < this.state.items.length; i++) {
            let itemI = this.state.items[i]

            items.push(
                <tr>
                    <td colSpan={1}>{itemI.num}</td>
                    <td colSpan={4}>{itemI.name}</td>
                    <td colSpan={4}>{itemI.specific}</td>
                    <td colSpan={2}>{itemI.packingCount}</td>
                    <td colSpan={1}>{itemI.packingCountUnit}</td>
                    <td colSpan={2}>{itemI.aCount}</td>
                    <td colSpan={1}>{itemI.aCountUnit}</td>
                    <td colSpan={3}>{itemI.unitPrice}</td>
                    <td colSpan={2}>{itemI.unitPrice * itemI.packingCount}</td>
                    <td colSpan={4}>{itemI.comment}</td>
                </tr>
            )
        }

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
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Card style={{background: "rgb(236, 236, 236)", overflow: "scroll"}}>
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
                                <td colSpan={2}>收货单位</td>
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
                                <td colSpan={2}>订单编号</td>
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
                                <td colSpan={2}>收货地址</td>
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
                                <td colSpan={2}>收货电话</td>
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
                                <td colSpan={2}>发货日期</td>
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
                                <td colSpan={1}>序号</td>
                                <td colSpan={4}>品名</td>
                                <td colSpan={4}>产品规格</td>
                                <td colSpan={2}>包装规格</td>
                                <td colSpan={1}>单位</td>
                                <td colSpan={2}>数量</td>
                                <td colSpan={1}>单位</td>
                                <td colSpan={3}>单价</td>
                                <td colSpan={2}>金额</td>
                                <td colSpan={4}>备注</td>
                            </tr>
                            {items}
                            <tr>
                                <td colSpan={1}>
                                    <Button type="primary" style={{}} onClick="">
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
                                <td colSpan={1}>总计</td>
                                <td colSpan={11}></td>
                                <td colSpan={2}></td>
                                <td colSpan={1}></td>
                                <td colSpan={3}>总计</td>
                                <td colSpan={2}></td>
                                <td colSpan={4}></td>
                            </tr>
                            <tr>
                                <td colSpan={4}>说明</td>
                                <td colSpan={20} style={{color: "red"}}>
                                    <p>备注：本出库与合同具有同等效力。</p>
                                    <p>1.收货后请及时检查，如有质量问题请7天内书面通知，协商解决。一经加工，恕我司一概不负责。</p>
                                    <p>2.本出库单经收货单位工作人员或其委托的人员签收即生效，谢谢合作！</p>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>业务员</td>
                                <td colSpan={4}>
                                    <FormItem>
                                        {getFieldDecorator('salesman',
                                            {})(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                                <td colSpan={2}>制单人</td>
                                <td colSpan={4}>
                                    <FormItem>
                                        {getFieldDecorator('created_by',
                                            {})(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                                <td colSpan={2}>送货人</td>
                                <td colSpan={4}>
                                    <FormItem>
                                        {getFieldDecorator('delivery_by',
                                            {})(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                                <td colSpan={2}>收货人</td>
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
                    </Card>
                    <FormItem {...tailFormItemLayout}>
                        <Popconfirm title="确认提交？" onConfirm={this.handleSubmit}
                                    okText="是" cancelText="否">
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Popconfirm>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedFormOutWarehouseNew = Form.create()(_formOutWarehouseNew);
export default WrappedFormOutWarehouseNew;
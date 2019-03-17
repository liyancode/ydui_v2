import React from 'react';
import {Form, Input, Tooltip, Icon, Radio, Select, Popconfirm, Spin, Divider, Button, AutoComplete,DatePicker} from 'antd';
import moment from 'moment'
import {serviceUser} from "../../../../../service/serviceUser";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class formEditEmployeeProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            one_user:props.one_user,
            defaultPassword:Math.random().toString(36).slice(-8),
            resetPassword:'***',
            autoCompleteResult: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.handleResetPasswordBtnOnclick = this.handleResetPasswordBtnOnclick.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        //"user_account": {
        //         "password": "***",
        //         "last_update_by": "new01",
        //         "user_name": "admin",
        //         "last_update_at": "2018-12-22 13:44:37 +0800",
        //         "created_at": "2018-12-08 17:53:31 +0800",
        //         "comment": null,
        //         "id": 11,
        //         "created_by": "new01",
        //         "authorities": "hr:rw,crm:rw,order:rw,fin:rw,product:rw,warehouse:rw",
        //         "status": 1
        //     },

        //"user_employee_info": {
        //         "level": 1,
        //         "department_id": "d001",
        //         "user_name": "admin",
        //         "cm_group_short_number": "1234",
        //         "bank_card_number": "660000000000",
        //         "created_at": "2019-03-13 22:06:16 +0800",
        //         "title": "Admin",
        //         "created_by": "admin",
        //         "resignation_date": null,
        //         "employee_type": "fte",
        //         "last_update_by": "admin",
        //         "entrance_card_number": "0000",
        //         "report_to": null,
        //         "last_update_at": "2019-03-13 22:06:16 +0800",
        //         "annual_leave_left": 0,
        //         "employee_number": "10000",
        //         "comment": null,
        //         "id": 1,
        //         "employee_status": "normal",
        //         "onboard_date": "2000-01-01",
        //         "sub_tel_number": "0001",
        //         "bank_card_belong_to": "CM",
        //         "status": 1,
        //         "attendance_number": "0000"
        //     },

        //"user_private_info": {
        //         "personal_id": "310771198801012346",
        //         "qq": "1098767778",
        //         "birthday": "1988-01-01",
        //         "hometown": "shanghai",
        //         "address": "add for test",
        //         "education": "master",
        //         "gender": 1,
        //         "user_name": "admin",
        //         "wechat": "jacktest",
        //         "created_at": "2018-12-09 21:00:57 +0800",
        //         "discipline": "cs",
        //         "created_by": "admin",
        //         "dingding": "jack998",
        //         "last_update_by": "admin",
        //         "full_name": "è¯¸è\u0091\u009Bå­\u0094æ\u0098\u008E",
        //         "hobbies": "basketbal",
        //         "last_update_at": "2018-12-15 22:45:52 +0800",
        //         "graduated_school": "NKU",
        //         "comment": null,
        //         "phone_number": "13023456789",
        //         "id": 2,
        //         "age": 30,
        //         "email": "jack@test.com",
        //         "status": 1
        //     }

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let auth_str=values["authorities"].toString();
                if(auth_str.indexOf('(')>=0){
                    auth_str=auth_str.substring(1,auth_str.length-1)
                }

                const user_account= {
                        "password": "***",
                        "last_update_by": "",
                        "user_name": values["user_name"],
                        "comment": this.state.one_user.user_employee_info.comment,
                        "id": this.state.one_user.user_employee_info.id,
                        "created_by": this.state.one_user.user_employee_info.created_by,
                        "authorities": auth_str,
                        "status": this.state.one_user.user_employee_info.status
                    }
                const user_employee_info= {
                        "level": this.state.one_user.user_employee_info.level,
                        "department_id": values["department_id"],
                        "user_name": values["user_name"],
                        "cm_group_short_number": values["cm_group_short_number"],
                        "bank_card_number": values["bank_card_number"],
                        "title": values["title"],
                        "created_by": this.state.one_user.user_employee_info.created_by,
                        "resignation_date": "",
                        "employee_type": values["employee_type"],
                        "last_update_by": "",
                        "entrance_card_number": values["entrance_card_number"],
                        "report_to": this.state.one_user.user_employee_info.report_to,
                        "annual_leave_left": values["annual_leave_left"],
                        "employee_number": values["employee_number"],
                        "comment": values["employee_comment"],
                        "id": this.state.one_user.user_employee_info.id,
                        "employee_status": values["employee_status"],
                        "onboard_date": values["onboard_date"],
                        "sub_tel_number": values["sub_tel_number"],
                        "bank_card_belong_to": values["bank_card_belong_to"],
                        "status": this.state.one_user.user_employee_info.status,
                        "attendance_number": values["attendance_number"]
                    }

                const user_private_info={
                        "personal_id": values["personal_id"],
                        "qq": this.state.one_user.user_private_info.qq,
                        "birthday": values["birthday"],
                        "hometown": this.state.one_user.user_private_info.hometown,
                        "address": values["address"],
                        "education": values["education"],
                        "gender": values["gender"],
                        "user_name": values["user_name"],
                        "wechat": this.state.one_user.user_private_info.wechat,
                        "discipline": this.state.one_user.user_private_info.discipline,
                        "created_by": this.state.one_user.user_private_info.created_by,
                        "dingding": this.state.one_user.user_private_info.dingding,
                        "last_update_by": "",
                        "full_name": values["full_name"],
                        "hobbies": this.state.one_user.user_private_info.qq,
                        "graduated_school": this.state.one_user.user_private_info.graduated_school,
                        "comment": this.state.one_user.user_private_info.comment,
                        "phone_number": values["phone_number"],
                        "id": this.state.one_user.user_private_info.id,
                        "age": this.state.one_user.user_private_info.age,
                        "email": values["email"],
                        "status": this.state.one_user.user_private_info.status,
                    }
                let userData={
                    user_account:user_account,
                    user_employee_info:user_employee_info,
                    user_private_info:user_private_info
                }
                serviceUser.updateUserAccountEmployeePrivateInfo(userData).then(data=>{
                    this.setState({loading: false});
                });
            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    handleResetPasswordBtnOnclick(){
        this.setState({
            resetPassword:Math.random().toString(36).slice(-8),
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const allDepartments=this.props.allDepartments
        const one_user=this.state.one_user;
        const user_account=one_user.user_account
        const user_employee_info=one_user.user_employee_info
        const user_private_info=one_user.user_private_info

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        //allDepartments
        let departmentOptions=[]
        let dprtI=''
        for(let i=0;i<allDepartments.length;i++){
            dprtI=allDepartments[i]
            departmentOptions.push(<Option key={dprtI.id} value={dprtI.department_id}>{dprtI.department_name}</Option>)
        }
        const departmentSelector = getFieldDecorator('department_id', {
            rules: [{
                required: true, message: '选择部门!',
            }],
            initialValue: user_employee_info.department_id,
        })(
            <Select
                placeholder="选择部门"
            >
                {departmentOptions}
            </Select>

        );

        const authoritySelectOptions=[
            <Option key='admin' value='hr:rw,crm:rw,order:rw,fin:rw,product:rw,warehouse:rw'>超级管理员(最高权限)</Option>,
            <Option key='hr:r' value='hr:r'>员工档案(普通用户)</Option>,
            <Option key='hr:rw' value='hr:rw'>员工档案(管理员)</Option>,
            <Option key='crm:rw' value='crm:rw'>客户管理</Option>,
            <Option key='order:rw' value='order:rw'>订单管理</Option>,
            <Option key='fin:rw' value='fin:rw'>财务审批</Option>,
            <Option key='product:rw' value='product:rw'>产品管理</Option>,
            <Option key='warehouse:rw' value='warehouse:rw'>库存管理</Option>,
        ]
        const authoritySelector = getFieldDecorator('authorities', {
            rules: [{
                required: true, message: '至少需要 员工档案 !',
            }],
            initialValue: user_account.authorities.split(','),
        })(
            <Select
                mode="multiple"
                placeholder="至少一个权限"
            >
                {authoritySelectOptions}
            </Select>

        );

        // const officeSelector = getFieldDecorator('office', {
        //     rules: [{
        //         required: true, message: '请选择办公地点!',
        //     }],
        //     initialValue: one_user.user_employee_info.office,
        // })(
        //     <Select
        //         placeholder="办公地点"
        //     >
        //         <Option key='suzhou.shengze' value='苏州盛泽'>苏州盛泽</Option>
        //     </Select>
        //
        // );

        const positionStatusSelector = getFieldDecorator('employee_status', {
            rules: [{
                required: true, message: '请选择员工状态!',
            }],
            initialValue: user_employee_info.employee_status,
        })(
            <Select
                placeholder="职位状态"
            >
                <Option key='position_status.normal' value='normal'>正常在职</Option>
                <Option key='position_status.probation' value='probation'>试用期内</Option>
                <Option key='position_status.dismiss' value='dismiss'>已离职</Option>
                <Option key='position_status.vacation' value='vacation'>休假中</Option>
            </Select>

        );

        const employeeTypeSelector = getFieldDecorator('employee_type', {
            rules: [{
                required: true, message: '请选择员工状态!',
            }],
            initialValue: user_employee_info.employee_type,
        })(
            <Select
                placeholder="员工类别"
            >
                <Option key='employee_type.fte' value='fte'>全职员工</Option>
                <Option key='employee_type.temp' value='temp'>临时工</Option>
                <Option key='employee_type.intern' value='intern'>实习员工</Option>
            </Select>

        );

        const educationSelector = getFieldDecorator('education', {
            initialValue: user_private_info.education,
        })(
            <Select
                placeholder="教育程度"
            >
                <Option key='education.xiaoxue' value='小学'>小学</Option>
                <Option key='education.chuzhong' value='初中'>初中</Option>
                <Option key='education.gaozhong' value='高中'>高中</Option>
                <Option key='education.dazhuan' value='大专'>大专</Option>
                <Option key='education.benke' value='本科'>本科</Option>
                <Option key='education.shuoshi' value='硕士'>硕士</Option>
            </Select>
        );

        const resetPasswordBtn=(<Button onClick={this.handleResetPasswordBtnOnclick}>重置密码</Button>);

        const userGenderRadio = getFieldDecorator('gender', {
            initialValue: user_private_info.gender,
        })(
            <RadioGroup>
                <Radio value={0}>女</Radio>
                <Radio value={1}>男</Radio>
            </RadioGroup>
        );

        const styleMarginBottom0={marginBottom:0};
        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="用户名"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('user_name', {
                            rules: [{
                                required: true,
                            }],
                            initialValue: user_account.user_name,
                        })(
                            <Input disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="姓名"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('full_name', {
                            rules: [{
                                required: true, message: '请输入员工真实姓名!',
                            }],
                            initialValue: user_private_info.full_name,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <Divider orientation={"left"}><span>工作信息</span><Icon type="solution"/></Divider>
                    <FormItem
                        {...formItemLayout}
                        label="员工编号"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('employee_number', {
                            rules: [{
                                required: true,
                            }],
                            initialValue: user_employee_info.employee_number,
                        })(
                            <Input disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="部门"
                        style={styleMarginBottom0}
                    >
                        {departmentSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="职位"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true, message: '请输入职位信息!',
                            }],
                            initialValue: user_employee_info.title,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="员工状态"
                        style={styleMarginBottom0}
                    >
                        {positionStatusSelector}
                    </FormItem>

                    {/*const user_employee_info= {*/}
                    {/*"level": 1,*/}
                    {/*"department_id": values["department_id"],*/}
                    {/*"user_name": values["user_name"],*/}
                    {/*"cm_group_short_number": values["cm_group_short_number"],*/}
                    {/*"bank_card_number": values["bank_card_number"],*/}
                    {/*"title": values["title"],*/}
                    {/*"created_by": "",*/}
                    {/*"resignation_date": values["resignation_date"],*/}
                    {/*"employee_type": values["employee_type"],*/}
                    {/*"last_update_by": "",*/}
                    {/*"entrance_card_number": values["entrance_card_number"],*/}
                    {/*"report_to": null,*/}
                    {/*"annual_leave_left": values["annual_leave_left"],*/}
                    {/*"employee_number": values["employee_number"],*/}
                    {/*"comment": null,*/}
                    {/*"id": 1,*/}
                    {/*"employee_status": values["employee_status"],*/}
                    {/*"onboard_date": values["onboard_date"],*/}
                    {/*"sub_tel_number": values["sub_tel_number"],*/}
                    {/*"bank_card_belong_to": values["bank_card_belong_to"],*/}
                    {/*"status": 1,*/}
                    {/*"attendance_number": values["attendance_number"]*/}
                {/*}*/}
                    <FormItem
                        {...formItemLayout}
                        label="分机号"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('sub_tel_number', {
                            initialValue: user_employee_info.sub_tel_number,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="移动集团短号"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('cm_group_short_number', {
                            initialValue: user_employee_info.cm_group_short_number,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="门禁卡号"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('entrance_card_number', {
                            initialValue: user_employee_info.entrance_card_number,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="考勤编号"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('attendance_number', {
                            initialValue: user_employee_info.attendance_number,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="员工类别"
                        style={styleMarginBottom0}
                    >
                        {employeeTypeSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="银行卡号"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('bank_card_number', {
                            initialValue: user_employee_info.bank_card_number,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="入职时间"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('onboard_date', {
                            rules: [{
                                required: true, message: '请输入职日期!',
                            }],
                            initialValue: moment(user_employee_info.onboard_date, "YYYY-MM-DD"),
                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="年假剩余天数"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('annual_leave_left', {
                            initialValue: user_employee_info.annual_leave_left,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('employee_comment', {
                            initialValue: user_employee_info.comment,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    {/*const user_private_info={*/}
                    {/*"personal_id": values["personal_id"],*/}
                    {/*"qq": "",*/}
                    {/*"birthday": values["birthday"],*/}
                    {/*"hometown": "",*/}
                    {/*"address": values["address"],*/}
                    {/*"education": values["education"],*/}
                    {/*"gender": values["gender"],*/}
                    {/*"user_name": values["user_name"],*/}
                    {/*"wechat": "",*/}
                    {/*"discipline": "",*/}
                    {/*"created_by": "",*/}
                    {/*"dingding": "",*/}
                    {/*"last_update_by": "",*/}
                    {/*"full_name": values["full_name"],*/}
                    {/*"hobbies": "",*/}
                    {/*"graduated_school": "",*/}
                    {/*"comment": null,*/}
                    {/*"phone_number": values["phone_number"],*/}
                    {/*"id": 2,*/}
                    {/*"age": "",*/}
                    {/*"email": values["email"],*/}
                    {/*"status": 1*/}
                {/*}*/}
                    <Divider orientation={"left"}><span>个人信息</span><Icon type="solution"/></Divider>
                    <FormItem
                        {...formItemLayout}
                        label="用户权限"
                        style={styleMarginBottom0}
                    >
                        {authoritySelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="身份证号"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('personal_id', {
                            rules: [{
                                required: true, message: '请输入身份证号!',
                            }],
                            initialValue: user_private_info.personal_id,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="性别"
                        style={styleMarginBottom0}
                    >
                        {userGenderRadio}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="教育程度"
                        style={styleMarginBottom0}
                    >
                        {educationSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="手机"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('phone_number', {
                            rules: [{
                                required: true, message: '请输入手机号!',
                            }],
                            initialValue: user_private_info.phone_number,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('email', {
                            rules: [],
                            initialValue: user_private_info.email,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="生日"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('birthday', {
                            rules: [],
                            initialValue: moment(user_private_info.birthday, "YYYY-MM-DD"),
                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="地址"
                        style={styleMarginBottom0}
                    >
                        {getFieldDecorator('address', {
                            rules: [],
                            initialValue: user_private_info.address,
                        })(
                            <Input/>
                        )}
                    </FormItem>


                    <FormItem {...tailFormItemLayout}>
                        <Popconfirm title="确认提交更新？" onConfirm={this.handleSubmit}
                                    okText="是" cancelText="否">
                            <Button type="primary" htmlType="submit">提交更新</Button>
                        </Popconfirm>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

const WrappedFormEditEmployeeProfile = Form.create()(formEditEmployeeProfile);

export default WrappedFormEditEmployeeProfile;
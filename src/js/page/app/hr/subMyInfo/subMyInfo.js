import React from "react";
import {List, Icon, Button, Spin, Table, Tag, Divider} from 'antd';
import _globalConstrants from "../../../../util/_globalConstrants";
import {serviceUser} from "../../../../service/serviceUser";
import WrappedFormResetPassword from "./form/_formResetPassword"

const _childPages = _globalConstrants._pages.childPages

const PageContent = (props) => {

    const _pstate = props._pstate;

    const positionStatusTag = {
        'normal': <Tag color="#108ee9">正常在职</Tag>,
        'probation': <Tag color="#2db7f5">试用期内</Tag>,
        'dismiss': <Tag color="#f50">已离职</Tag>,
        'vacation': <Tag color="#87d068">休假中</Tag>,
    }

    let _pageContent = <div>
        <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
            <Icon type="left"/>
            <span>返回</span>
        </Button>
        {_globalConstrants._pages.errorPage}
    </div>

    const fileList = [
        '员工手册-2019.3.3.pdf',
        '考勤管理制度-2019.2.22.pdf'
    ]
    switch (_pstate.childPage) {
        case _childPages.all:
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
            </div>
            break
        case _childPages.viewDetail:
            let infoContent = "..."
            if (_pstate.dataOne != null) {
                const user_account = _pstate.dataOne.user_account;
                const user_department = _pstate.dataOne.user_department;
                const user_private_info = _pstate.dataOne.user_private_info;
                const user_employee_info = _pstate.dataOne.user_employee_info;
                const user_login_history = _pstate.dataOne.user_login_history.login_history;
                let login_hist = []
                let ip_info = ''
                for (let i = 0; i < user_login_history.length; i++) {
                    ip_info = user_login_history[i].ip_location_info
                    login_hist.push(
                        <p>{user_login_history[i].created_at} IP:{user_login_history[i].rq_ip} {ip_info.country_name+" "+ip_info.city}</p>)
                }
                infoContent = <div>
                    <div className="col-sm-12 col-md-4">
                        {/*authorities: "hr:rw,crm:rw,order:rw,fin:rw,product:rw,warehouse:rw"*/}
                        {/*comment: null*/}
                        {/*created_at: "2018-12-08 17:53:31 +0800"*/}
                        {/*created_by: "new01"*/}
                        {/*id: 11*/}
                        {/*last_update_at: "2018-12-22 13:44:37 +0800"*/}
                        {/*last_update_by: "new01"*/}
                        {/*password: "***"*/}
                        {/*status: 1*/}
                        {/*user_name: "admin"*/}
                        <Divider orientation={"left"}><span>账号信息</span><Icon type="key"/></Divider>
                        <div className="btn_backTOLanding">
                            用户名：{user_account.user_name}
                        </div>
                        <div className="btn_backTOLanding">
                            <Button type="danger" className="btn_backTOLanding" size={"small"}
                                    onClick={props.updatePasswordBtnOnclick}>
                                <Icon type="unlock"/>
                                <span>修改密码</span>
                            </Button>
                            <Icon type="bulb" style={{color: "#00ac47"}}/>
                            <span>修改其他信息，请找管理员。</span>
                        </div>
                        <div className="btn_backTOLanding">系统权限：<Tag style={{color: "red"}}>管理员</Tag></div>
                        <div className="btn_backTOLanding">
                            <h5>最近登录:</h5>
                            {login_hist}
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        {/*annual_leave_left: 0*/}
                        {/*attendance_number: "0000"*/}
                        {/*bank_card_belong_to: "CM"*/}
                        {/*bank_card_number: "660000000000"*/}
                        {/*cm_group_short_number: "1234"*/}
                        {/*comment: null*/}
                        {/*created_at: "2019-03-13 22:06:16 +0800"*/}
                        {/*created_by: "admin"*/}
                        {/*department_id: "d001"*/}
                        {/*employee_number: "10000"*/}
                        {/*employee_status: "normal"*/}
                        {/*employee_type: "fte"*/}
                        {/*entrance_card_number: "0000"*/}
                        {/*id: 1*/}
                        {/*last_update_at: "2019-03-13 22:06:16 +0800"*/}
                        {/*last_update_by: "admin"*/}
                        {/*level: 1*/}
                        {/*onboard_date: "2000-01-01"*/}
                        {/*report_to: null*/}
                        {/*resignation_date: null*/}
                        {/*status: 1*/}
                        {/*sub_tel_number: "0001"*/}
                        {/*title: "Admin"*/}
                        {/*user_name: "admin"*/}
                        <Divider orientation={"left"}><span>工作信息</span><Icon type="team"/></Divider>
                        <table className="table table-bordered table-condensed">
                            <tbody>
                            {/*<tr>*/}
                            {/*<td>姓名</td>*/}
                            {/*<td>{this.state.user_employee_info["full_name"]}</td>*/}
                            {/*</tr>*/}
                            <tr>
                                <td>员工编号</td>
                                <td>{user_employee_info["employee_number"]}</td>
                            </tr>
                            <tr>
                                <td>职位</td>
                                <td>{user_employee_info["title"]}</td>
                            </tr>
                            <tr>
                                <td>汇报对象</td>
                                <td>{user_department["department_manager"]}</td>
                            </tr>
                            <tr>
                                <td>部门</td>
                                <td>{user_department["department_id"]}</td>
                            </tr>
                            {/*<tr>*/}
                            {/*<td>办公地点</td>*/}
                            {/*<td><Icon type="environment-o"/><span>{user_employee_info["office"]}</span></td>*/}
                            {/*</tr>*/}
                            <tr>
                                <td>入职时间</td>
                                <td>{user_employee_info["onboard_date"]}</td>
                            </tr>
                            <tr>
                                <td>状态</td>
                                <td>{positionStatusTag[user_employee_info['employee_status']]}</td>
                            </tr>
                            <tr>
                                <td>门禁卡号</td>
                                <td><span> {user_employee_info["attendance_number"]}</span></td>
                            </tr>
                            <tr>
                                <td>公司分机号<Icon type="phone"/></td>
                                <td>{user_employee_info["sub_tel_number"]}</td>
                            </tr>
                            <tr>
                                <td>公司集团短号<Icon type="phone"/></td>
                                <td>{user_employee_info["cm_group_short_number"]}</td>
                            </tr>
                            <tr>
                                <td>工资卡号<Icon type="credit-card"/></td>
                                <td>{user_employee_info["bank_card_number"]}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        {/*address: "add for test"*/}
                        {/*age: 30*/}
                        {/*birthday: "1988-01-01"*/}
                        {/*comment: null*/}
                        {/*created_at: "2018-12-09 21:00:57 +0800"*/}
                        {/*created_by: "admin"*/}
                        {/*dingding: "jack998"*/}
                        {/*discipline: "cs"*/}
                        {/*education: "master"*/}
                        {/*email: "jack@test.com"*/}
                        {/*full_name: "诸葛孔明"*/}
                        {/*gender: 1*/}
                        {/*graduated_school: "NKU"*/}
                        {/*hobbies: "basketbal"*/}
                        {/*hometown: "shanghai"*/}
                        {/*id: 2*/}
                        {/*last_update_at: "2018-12-15 22:45:52 +0800"*/}
                        {/*last_update_by: "admin"*/}
                        {/*personal_id: "310771198801012346"*/}
                        {/*phone_number: "13023456789"*/}
                        {/*qq: "1098767778"*/}
                        {/*status: 1*/}
                        {/*user_name: "admin"*/}
                        {/*wechat: "jacktest"*/}
                        <Divider orientation={"left"}><span>个人信息</span><Icon type="solution"/></Divider>
                        <table className="table table-bordered table-condensed">
                            <tbody>
                            <tr>
                                <td>照片</td>
                                <td><img
                                    src={"/images/avatars/default.png"}
                                    style={{width: 120, border: 'solid 2px white'}}/>
                                </td>
                            </tr>
                            <tr>
                                <td>姓名</td>
                                <td>{user_private_info["full_name"]}</td>
                            </tr>
                            <tr>
                                <td>性别</td>
                                <td>{user_private_info["gender"] === 0 ?
                                    <div><Icon type="woman" style={{color: 'pink'}}/><span>女</span></div> :
                                    <div><Icon type="man" style={{color: 'blue'}}/><span>男</span></div>}</td>
                            </tr>
                            <tr>
                                <td>身份证号</td>
                                <td>{user_private_info["personal_id"]}</td>
                            </tr>
                            <tr>
                                <td>生日</td>
                                <td><span
                                    className="glyphicon glyphicon-gift"/> {user_private_info["birthday"]}</td>
                            </tr>
                            <tr>
                                <td>籍贯</td>
                                <td>{user_private_info["hometown"]}</td>
                            </tr>
                            <tr>
                                <td>手机号码</td>
                                <td>{user_private_info["phone_number"]}</td>
                            </tr>
                            <tr>
                                <td>学历</td>
                                <td>{user_private_info["education"]}</td>
                            </tr>
                            </tbody>
                        </table>
                        {/*<Upload {...rsm_props}>*/}
                        {/*<Button>*/}
                        {/*<Icon type="upload" /> 上传简历*/}
                        {/*</Button>*/}
                        {/*</Upload>*/}
                    </div>
                </div>
            }


            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <Spin spinning={_pstate.loading} tip="加载中..." size="large">
                    {infoContent}
                    <div className="col-sm-12 col-md-4">

                    </div>
                </Spin>
            </div>
            break;
        case _childPages.edit:
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backViewDetailBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedFormResetPassword one_user={_pstate.dataOne.user_account}/>
            </div>
            break;
        default:
            break;
    }
    return _pageContent;
}
export default class SubPageMyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadcrumb: '我的页面',
            childPage: _childPages.viewDetail,
            dataList: [],
            dataOne: null
        }

        serviceUser.getUserFullInfoByUsername(localStorage.getItem('user_name')).then(data => {
            if (data != null) {
                this.setState({
                    dataOne: data,
                    loading: false,
                })
            }
        });

    }

    handleCheckDetailOnclick = (e) => {
        this.setState({
            childPage: _childPages.viewDetail
        });
    }

    handleBackViewDetailBtnOnclick = (e) => {
        this.setState({
            childPage: _childPages.viewDetail
        });
    }

    updatePasswordBtnOnclick = () => {
        this.setState({
            childPage: _childPages.edit
        });
    }

    render() {
        return (<PageContent
            _pstate={this.state}
            backLandingButtonClick={this.props.backLandingButtonClick}
            checkDetailOnclick={this.handleCheckDetailOnclick}
            backViewDetailBtnOnclick={this.handleBackViewDetailBtnOnclick}
            updatePasswordBtnOnclick={this.updatePasswordBtnOnclick}
        />);
    }

}
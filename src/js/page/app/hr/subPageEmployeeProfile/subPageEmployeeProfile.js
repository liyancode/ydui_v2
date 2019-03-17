import React from "react";
import {Empty, Icon, Button, Spin, Table, Tag, Divider, Statistic, Row, Col} from 'antd';
import _globalConstrants from "../../../../util/_globalConstrants";
import _globalUtil from "../../../../util/_globalUtil"
import {serviceUser} from "../../../../service/serviceUser";
import WrappedFormEditEmployeeProfile from "./form/_formEditEmployeeProfile"
import WrappedFormNewEmployeeProfile from "./form/_formNewEmployeeProfile"

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

    switch (_pstate.childPage) {
        case _childPages.all:
            const users_table_columns = [
                {
                    title: '员工ID',
                    dataIndex: 'employee_number',
                    key: 'employee_number',
                    defaultSortOrder: 'ascend',
                    sorter: (a, b) => a.employee_number > b.employee_number?1:-1,
                },
                {
                    title: '用户名',
                    dataIndex: 'user_name',
                    key: 'user_name',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.user_name > b.user_name?1:-1,
                },
                {
                    title: '姓名',
                    dataIndex: 'full_name',
                    key: 'full_name',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.full_name > b.full_name?1:-1,
                },
                {
                    title: '性别',
                    dataIndex: 'gender',
                    key: 'gender',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.gender > b.gender?1:-1,
                    render: (text, record) => (
                        record["gender"] === 0 ?
                            <div><Icon type="woman" style={{color: 'pink'}}/><span>女</span></div>
                            : <div><Icon type="man" style={{color: 'blue'}}/><span>男</span></div>)
                },
                {
                    title: '部门',
                    dataIndex: 'department_name',
                    key: 'department_name',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.department_name > b.department_name?1:-1,
                },
                {
                    title: '职位',
                    dataIndex: 'title',
                    key: 'title',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.title > b.title?1:-1,
                },
                {
                    title: '入职时间',
                    dataIndex: 'onboard_date',
                    key: 'onboard_date',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.onboard_date > b.onboard_date?1:-1,
                    render:(text, record)=>{
                        return _globalUtil._format_time_string_by_day(record.onboard_date)
                    }
                },
                {
                    title: '当前状态',
                    dataIndex: 'employee_status',
                    key: 'employee_status',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.employee_status > b.employee_status?1:-1,
                    render: (text, record) => (
                        positionStatusTag[record["employee_status"]]
                    )
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        return (<span>
                        <a href="javascript:;" onClick={props.checkDetailOnclick}
                           user_name={record["user_name"]}>详细信息</a>
                        </span>)
                    },
                }
            ]

            let manCount=0;
            for(let i=0;i<_pstate.dataList.length;i++){
                if(_pstate.dataList[i].gender===1){
                    manCount+=1
                }
            }
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <Spin spinning={_pstate.loading} tip="加载中..." size="large">
                        <Row gutter={16}>
                            <Col span={8} style={{textAlign:"center"}}>
                                <Statistic title="员工总数" value={_pstate.dataList.length} prefix={<Icon type="user"/>} />
                            </Col>
                            <Col span={8} style={{textAlign:"center"}}>
                                <Statistic title="女员工" value={_pstate.dataList.length-manCount} prefix={<Icon type="woman" style={{color: 'pink'}}/>}/>
                            </Col>
                            <Col span={8} style={{textAlign:"center"}}>
                                <Statistic title="男员工" value={manCount} prefix={<Icon type="man" style={{color: 'blue'}}/>}/>
                            </Col>
                        </Row>
                        <hr/>
                        <Button type="primary" className="btn_backTOLanding" onClick={props.addNewBtnOnclick}>
                            <Icon type="user-add"/>
                            <span>添加员工信息</span>
                        </Button>
                        <Button type="primary" className="btn_backTOLanding"
                                loading={_pstate.loading} onClick={props.reloadBtnOnclick}>
                            <Icon type="reload"/>
                            <span>刷新</span>
                        </Button>
                        <Table rowKey="user_name" columns={users_table_columns}
                               dataSource={_pstate.dataList} size="small"/>
                    </Spin>
                </div>
            </div>
            break
        case _childPages.viewDetail:
            let infoContent = "..."
            if (_pstate.dataOne != null) {
                let login_hist = []
                let ip_info = ''
                try{
                    const user_account = _pstate.dataOne.user_account;
                    const user_department = _pstate.dataOne.user_department;
                    const user_private_info = _pstate.dataOne.user_private_info;
                    const user_employee_info = _pstate.dataOne.user_employee_info;
                    const user_login_history = _pstate.dataOne.user_login_history.login_history;
                    for (let i = 0; i < user_login_history.length; i++) {
                        ip_info = user_login_history[i].ip_location_info
                        login_hist.push(
                            <p>{user_login_history[i].created_at} IP:{user_login_history[i].rq_ip} {ip_info.country_name+" "+ip_info.city}</p>)
                    }
                    if(login_hist.length===0){
                        login_hist = [<Empty size={"small"}/>]
                    }

                    infoContent = <div>
                        <div className="col-sm-12 col-md-4">
                            <Divider orientation={"left"}><span>账号信息</span><Icon type="key"/></Divider>
                            <div className="btn_backTOLanding">
                                用户名：{user_account.user_name}
                            </div>
                            {/*<div className="btn_backTOLanding">*/}
                                {/*<Button type="danger" className="btn_backTOLanding" size={"small"}*/}
                                        {/*onClick={props.updatePasswordBtnOnclick}>*/}
                                    {/*<Icon type="unlock"/>*/}
                                    {/*<span>修改密码</span>*/}
                                {/*</Button>*/}
                                {/*<Icon type="bulb" style={{color: "#00ac47"}}/>*/}
                                {/*<span>修改其他信息，请找管理员。</span>*/}
                            {/*</div>*/}
                            <div className="btn_backTOLanding">系统权限：<Tag style={{color: "red"}}>-</Tag></div>
                            <div className="btn_backTOLanding">
                                <h5>最近登录:</h5>
                                {login_hist}
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <Divider orientation={"left"}><span>工作信息</span><Icon type="team"/></Divider>
                            <table className="table table-bordered table-condensed">
                                <tbody>
                                <tr>
                                    <td>员工编号</td>
                                    <td>{user_employee_info["employee_number"]}</td>
                                </tr>
                                <tr>
                                    <td>职位</td>
                                    <td>{user_employee_info["title"]}</td>
                                </tr>
                                <tr>
                                    <td>部门</td>
                                    <td>{user_department["department_name"]}</td>
                                </tr>
                                <tr>
                                    <td>部门经理</td>
                                    <td>{user_department["department_manager"]}</td>
                                </tr>
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
                                    <td>地址</td>
                                    <td>{user_private_info["address"]}</td>
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
                        </div>
                    </div>
                }catch(e){
                    console.log(e)
                    infoContent="未知错误"
                }
            }

            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backAllBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.editOneBtnOclick}>
                        <Icon type="edit"/>
                        <span>更新信息</span>
                    </Button>
                </div>
                <Spin spinning={_pstate.loading} tip="加载中..." size="large">
                    {infoContent}
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
                <WrappedFormEditEmployeeProfile one_user={_pstate.dataOne} allDepartments={_pstate.allDepartments}/>
            </div>
            break;
        case _childPages.createNew:
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backAllBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedFormNewEmployeeProfile allDepartments={_pstate.allDepartments}/>
            </div>
            break;
        default:
            break;
    }
    return _pageContent;
}
export default class SubPageEmployeeProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadcrumb: '员工档案',
            childPage: _childPages.all,
            dataList: [],
            dataOne: null,
            allDepartments:[]
        }

        serviceUser.getUserListForAdmin().then(data => {
            if (data != null) {
                this.setState({
                    dataList: data,
                    loading: false,
                })
            }
        });

        serviceUser.getAllUserDepartment().then(data=>{
            if(data!=null){
                this.setState({
                    allDepartments: data,
                })
            }
        });
    }

    updateDataOne=(user_name)=>{
        this.setState({
            loading: true
        });
        serviceUser.getUserFullInfoByUsername(user_name).then(data => {
            if (data != null) {
                this.setState({
                    dataOne: data,
                    loading: false,
                })
            }
        });
    }

    handleBackViewDetailBtnOnclick = (e) => {
        this.setState({
            childPage: _childPages.viewDetail,
        });
        this.updateDataOne(this.state.dataOne.user_account.user_name)
    }

    updatePasswordBtnOnclick = () => {
        this.setState({
            childPage: _childPages.edit
        });
    }

    handleAddNewBtnOnclick=()=>{
        this.setState({
            childPage: _childPages.createNew
        });
    }

    handleReloadBtnOnclick=()=>{
        this.setState({
            loading: true
        });
        serviceUser.getUserListForAdmin().then(data => {
            if (data != null) {
                this.setState({
                    dataList: data,
                    loading: false,
                })
            }
        });
    }

    handleCheckDetailOnclick = (e) => {
        const user_name=e.target.attributes.user_name.value;

        this.setState({
            childPage: _childPages.viewDetail
        });
        this.updateDataOne(user_name)
    }

    handleBackAllBtnOnclick=()=>{
        this.setState({
            childPage: _childPages.all
        });
    }

    handleEditOneBtnOclick=()=>{
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
            editOneBtnOclick={this.handleEditOneBtnOclick}
            backViewDetailBtnOnclick={this.handleBackViewDetailBtnOnclick}
            updatePasswordBtnOnclick={this.updatePasswordBtnOnclick}
        />);
    }

}
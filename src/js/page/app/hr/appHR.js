import React from 'react';
import {Layout, Breadcrumb, Tabs, Collapse, Spin, Icon,Row,Col, Divider,Table, Button} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"
import _globalUtil from "../../../util/_globalUtil"
import {serviceUser} from "../../../service/serviceUser";

const {Content,} = Layout
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

const subConstrants = {
    hrMy: "hrMy",
    hrApplication: "hrApplication",
    hrDepartment: "hrDepartment",
}
const PageContent = (props) => {
    const userAccount = props.userInfo["user_account"]
    const userEmployeeInfo = props.userInfo["user_employee_info"]
    const userDepartment = props.userInfo["user_department"]
    const userPrivateInfo = props.userInfo["user_employee_info"]
    const styleRow = {padding: 8}

    let workInfo = ""
    if (userEmployeeInfo && userDepartment) {
        workInfo =
            <div>
                <div className={"row"} style={styleRow}>
                    <div className={"col-md-3 col-xs-6"}>部门：</div>
                    <div className={"col-md-3 col-xs-6"}>{userDepartment.department_name}</div>
                </div>
                <div className={"row"} style={styleRow}>
                    <div className={"col-md-3 col-xs-6"}>职位：</div>
                    <div className={"col-md-3 col-xs-6"}>{userEmployeeInfo.title}</div>
                </div>
                <div className={"row"} style={styleRow}>
                    <div className={"col-md-3 col-xs-6"}>入职时间：</div>
                    <div className={"col-md-3 col-xs-6"}>{userEmployeeInfo.onboard_date}</div>
                </div>
            </div>
    }

    let personalInfo = ""
    if (userAccount && userPrivateInfo) {
        personalInfo =
            <div>
                <div className={"row"} style={styleRow}>
                    <div className={"col-md-3 col-xs-6"}>账号：</div>
                    <div className={"col-md-3 col-xs-6"}>{userPrivateInfo.user_name}</div>
                </div>
                <div className={"row"} style={styleRow}>
                    <div className={"col-md-3 col-xs-6"}>姓名：</div>
                    <div className={"col-md-3 col-xs-6"}>{userPrivateInfo.full_name}</div>
                </div>
                <div className={"row"} style={styleRow}>
                    <div className={"col-md-3 col-xs-6"}>性别：</div>
                    <div className={"col-md-3 col-xs-6"}>{userPrivateInfo.gender}</div>
                </div>
                <div className={"row"} style={styleRow}>
                    <div className={"col-md-3 col-xs-6"}>身份证号：</div>
                    <div className={"col-md-3 col-xs-6"}>{userPrivateInfo.personal_id}</div>
                </div>
                <div className={"row"} style={styleRow}>
                    <div className={"col-md-3 col-xs-6"}>电话：</div>
                    <div className={"col-md-3 col-xs-6"}>{userPrivateInfo.phone_number}</div>
                </div>
                <div className={"row"} style={styleRow}>
                    <div className={"col-md-3 col-xs-6"}>E-mail：</div>
                    <div className={"col-md-3 col-xs-6"}>{userPrivateInfo.email}</div>
                </div>
                <div className={"row"} style={styleRow}>
                    <div className={"col-md-3 col-xs-6"}>地址：</div>
                    <div className={"col-md-3 col-xs-6"}>{userPrivateInfo.address}</div>
                </div>
                <div className={"row"} style={styleRow}>
                    <div className={"col-md-3 col-xs-6"}>学历：</div>
                    <div className={"col-md-3 col-xs-6"}>{userPrivateInfo.education}</div>
                </div>
            </div>
    }

    // applications
    // application_id: "AP201812220524_FVBJ"
    // approve_by: "boss"
    // approve_status: "wait"
    // comment: ""
    // created_at: "2018-12-22 13:24:53 +0800"
    // created_by: "admin"
    // description: "[20181224132421,20181229132421]年底休假"
    // id: 13
    // last_update_at: "2018-12-22 13:24:53 +0800"
    // last_update_by: "admin"
    // status: 1
    // type: "leave"
    // user_name: "admin"
    const applicationsTableColumns = [
        {
            title: '编号',
            dataIndex: 'application_id',
            key: 'application_id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.application_id > b.application_id ? 1 : -1,
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.created_at > b.created_at ? 1 : -1,
        },
        {
            title: '申请类型',
            dataIndex: 'type',
            key: 'type',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.type > b.type ? 1 : -1,
        },
        {
            title: '审批状态',
            dataIndex: 'approve_status',
            key: 'approve_status',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.approve_status > b.approve_status ? 1 : -1,
        },
        {
            title: '审批人',
            dataIndex: 'approve_by',
            key: 'approve_by',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.approve_by > b.approve_by ? 1 : -1,
        },
        {
            title: '最后更新',
            dataIndex: 'last_update_at',
            key: 'last_update_at',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.last_update_at > b.last_update_at ? 1 : -1,
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (<div>
                    <span>
                        <a href="javascript:;" onClick={props.checkDetailApplication}
                           application_id={record["application_id"]}>详情</a>
                        </span>
                </div>)
            },
        }
    ]
    const btnStyle = {
        marginRight: 8,
        marginBottom: 12
    }


    // return (
    //     <Tabs defaultActiveKey={props.sub} onChange={props.tabChange} onTabClick={props.tabClick}>
    //         <TabPane tab="个人中心" key={subConstrants.hrMy}>
    //             <Spin spinning={props.loading} tip="加载中..." size="large">
    //                 <Collapse defaultActiveKey={['1']}>
    //                     <Panel header="工作信息" key="1">
    //                         {workInfo}
    //                     </Panel>
    //                     <Panel header="个人信息" key="2">
    //                         {personalInfo}
    //                     </Panel>
    //                 </Collapse>
    //             </Spin>
    //         </TabPane>
    //         <TabPane tab="申请单管理" key={subConstrants.hrApplication}>
    //             <div>
    //                 <Button style={btnStyle} type="primary" icon="plus" myattr={"leave"}
    //                         onClick={props.createButtonClick}>请假单<Icon type="schedule"/></Button>
    //                 <Button style={btnStyle} icon="plus" myattr={"office_supplies"} onClick={props.createButtonClick}>办公用品申请<Icon
    //                     type="laptop"/></Button>
    //                 <Button style={{
    //                     marginRight: 8,
    //                     marginBottom: 12,
    //                     float: "right"
    //                 }} type="danger" icon="plus" myattr={"resignation"}
    //                         onClick={props.createButtonClick}>离职申请<Icon
    //                     type="frown"/></Button>
    //             </div>
    //             <Table rowKey="application_id" columns={applicationsTableColumns}
    //                    dataSource={props.userApplications} size="small"/>
    //         </TabPane>
    //         <TabPane tab="部门信息" key={subConstrants.hrDepartment}>部门信息(开发中...)</TabPane>
    //     </Tabs>
    // )
    const styleFLogo={
        display:"inline-block",
        minWidth:88,
        height:88,
        textAlign:"center",
        verticalAlign:"middle",
        backgroundColor:"#fff",
        border:"1px solid #d9d9d9",
        borderRadius:"4px",
        outline:0,
        cursor:"pointer",
        padding:8,
        margin:8
    }
    // display: inline-block;
    // min-width: 32px;
    // height: 32px;
    // text-align: center;
    // vertical-align: middle;
    return (<div>
        <Divider orientation="left">办公人事管理</Divider>
        <Row gutter={ {xs: 8, sm: 16, md: 24, lg: 32} }>
            <Col className="gutter-row">
                <Button style={styleFLogo} onClick={props.testClick}>
                    <Icon style={{fontSize:36}} type={"user"}/>
                    <span style={{display:"block",marginLeft:0}}>我的信息</span>
                </Button>
                <Button style={styleFLogo} onClick={props.testClick}>
                    <Icon style={{fontSize:36}} type={"desktop"}/>
                    <span style={{display:"block",marginLeft:0}}>办公用品</span>
                </Button>
                <Button style={styleFLogo} onClick={props.testClick}>
                    <Icon style={{fontSize:36}} type={"solution"}/>
                    <span style={{display:"block",marginLeft:0}}>员工档案</span>
                </Button>
                <Button style={styleFLogo} onClick={props.testClick}>
                    <Icon style={{fontSize:36}} type={"schedule"}/>
                    <span style={{display:"block",marginLeft:0}}>请假调休</span>
                </Button>
                <Button style={styleFLogo} onClick={props.testClick}>
                    <Icon style={{fontSize:36}} type={"property-safety"}/>
                    <span style={{display:"block",marginLeft:0}}>报销管理</span>
                </Button>
                <Button style={styleFLogo} onClick={props.testClick}>
                    <Icon style={{fontSize:36}} type={"user-delete"}/>
                    <span style={{display:"block",marginLeft:0}}>离职申请</span>
                </Button>
            </Col>
        </Row>
        <Divider orientation="left">信息通讯管理</Divider>
        <Row gutter={ {xs: 8, sm: 16, md: 24, lg: 32} }>
            <Col className="gutter-row">
                <Button style={styleFLogo} onClick={props.testClick}>
                    <Icon style={{fontSize:36}} type={"notification"}/>
                    <span style={{display:"block",marginLeft:0}}>通知公告</span>
                </Button>
                <Button style={styleFLogo} onClick={props.testClick}>
                    <Icon style={{fontSize:36}} type={"read"}/>
                    <span style={{display:"block",marginLeft:0}}>规章制度</span>
                </Button>
            </Col>
        </Row>
        <Divider orientation="left">资料档案管理</Divider>
        <Row gutter={ {xs: 8, sm: 16, md: 24, lg: 32} }>
            <Col className="gutter-row">
                <Button style={styleFLogo} onClick={props.testClick}>
                    <Icon style={{fontSize:36}} type={"usb"}/>
                    <span style={{display:"block",marginLeft:0}}>电子资料</span>
                </Button>
            </Col>
        </Row>
        <Divider orientation="left">员工考核管理</Divider>
        <Row gutter={ {xs: 8, sm: 16, md: 24, lg: 32} }>
            <Col className="gutter-row">
                <Button style={styleFLogo} onClick={props.testClick}>
                    <Icon style={{fontSize:36}} type={"trophy"}/>
                    <span style={{display:"block",marginLeft:0}}>绩效考核</span>
                </Button>
            </Col>
        </Row>
    </div>)
}

export default class AppHR extends React.Component {
    constructor(props) {
        super(props);
        const _sub = _globalUtil._getSearchSub()
        const userName = localStorage.getItem('user_name');
        this.state = {
            userName: userName,
            loading: true,
            breadcrumbLanding:"人力资源",
            breadcrumb: '人力资源',
            sub: _sub ? _sub : subConstrants.hrMy,
            userInfo: {},
            userApplications: []
        }
        serviceUser.getUserFullInfoByUsername(userName).then(data => {
            this.setState({
                loading: false,
                userInfo: data
            });
        })

        serviceUser.getUserApplicationListByUsername(userName).then(data => {
            this.setState({
                loading: false,
                userApplications: data
            });
        })

        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.updateSubData = this.updateSubData.bind(this);
        this.testClick = this.testClick.bind(this);
    }

    updateSubData(sub) {
        this.setState({
            loading: true,
        });
        switch (sub) {
            case subConstrants.hrApplication:
                serviceUser.getUserApplicationListByUsername(this.state.userName).then(data => {
                    this.setState({
                        loading: false,
                        userApplications: data
                    });
                })
                break
            default:
                serviceUser.getUserFullInfoByUsername(this.state.userName).then(data => {
                    this.setState({
                        loading: false,
                        userInfo: data
                    });
                })
                break
        }
    }

    handleTabClick(e) {
        // console.log(e)
    }

    handleTabChange(e) {
        _globalUtil._setSearchSub(e)
        this.updateSubData(e)
    }

    testClick(e){
        console.log(e.target)
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <h4 style={{display: "inline"}}>
                        <Icon type="user" />
                        <span>{this.state.breadcrumbLanding}</span>
                    </h4>
                    <Breadcrumb style={{display: "inline"}}>
                        <Breadcrumb.Item> </Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Content style={_globalConstrants._styles.contentStyle}
                >
                    <PageContent loading={this.state.loading}
                                 tabClick={this.handleTabClick}
                                 tabChange={this.handleTabChange}
                                 sub={this.state.sub}
                                 userInfo={this.state.userInfo}
                                 userApplications={this.state.userApplications}
                                 testClick={this.testClick}
                    />
                </Content>
            </div>)
    }
}
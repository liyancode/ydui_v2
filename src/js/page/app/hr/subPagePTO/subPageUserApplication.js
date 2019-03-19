import React from "react";
import {Empty, Icon, Button, Spin, Table, Tag, Divider, Statistic, Row, Col} from 'antd';
import _globalConstrants from "../../../../util/_globalConstrants";
import {serviceUser} from "../../../../service/serviceUser";
import WrappedFormNewPTO from "./form/_formNewPTO"
import WrappedFormNewOfficeSuppliesApplication from "./form/_formNewOfficeSuppliesApplication"
import WrappedFormNewResignationApplication from "./form/_formNewResignationApplication"

const _childPages = _globalConstrants._pages.childPages

const PageContent = (props) => {

    const _pstate = props._pstate;

    let _pageContent = <div>
        <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
            <Icon type="left"/>
            <span>返回</span>
        </Button>
        {_globalConstrants._pages.errorPage}
    </div>

    switch (_pstate.childPage) {
        case _childPages.all:
            const app_types = {
                leave: '请假申请',
                office_supplies: '办公用品申请',
                resignation: '离职申请'
            }
            const table_columns = [
                {
                    title: '申请编号',
                    dataIndex: 'application_id',
                    key: 'application_id',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.application_id > b.application_id ? 1 : -1,
                },
                {
                    title: '申请类型',
                    dataIndex: 'type',
                    key: 'type',
                    sorter: (a, b) => a.type > b.type ? 1 : -1,
                    render: (text, record) => {
                        return app_types[record.type]
                    }
                },
                {
                    title: '申请人',
                    dataIndex: 'user_name',
                    key: 'user_name',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.user_name > b.user_name ? 1 : -1,
                },
                {
                    title: '申请时间',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    sorter: (a, b) => a.created_at > b.created_at ? 1 : -1,
                },
                {
                    title: '审批人',
                    dataIndex: 'approve_by',
                    key: 'approve_by',
                    sorter: (a, b) => a.approve_by > b.approve_by ? 1 : -1,
                },
                {
                    title: '审批状态',
                    dataIndex: 'approve_status',
                    key: 'approve_status',
                    sorter: (a, b) => a.approve_status > b.approve_status ? 1 : -1,
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        return (<span>
                        <a href="javascript:;" onClick={props.checkDetailOnclick}
                           application_id={record["application_id"]}>详细信息</a>
                        </span>)
                    },
                }
            ]

            let manCount = 0;
            for (let i = 0; i < _pstate.dataList.length; i++) {
                if (_pstate.dataList[i].gender === 1) {
                    manCount += 1
                }
            }
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.addNewBtnOnclick}>
                        <Icon type="plus"/>
                        <span>新建申请</span>
                    </Button>
                    <Button type="primary" className="btn_backTOLanding"
                            loading={_pstate.loading} onClick={props.reloadBtnOnclick}>
                        <Icon type="reload"/>
                        <span>刷新</span>
                    </Button>
                    <Spin spinning={_pstate.loading} tip="加载中..." size="large">
                        {/*<Row gutter={16}>*/}
                        {/*<Col span={8} style={{textAlign:"center"}}>*/}
                        {/*<Statistic title="员工总数" value={_pstate.dataList.length} prefix={<Icon type="user"/>} />*/}
                        {/*</Col>*/}
                        {/*<Col span={8} style={{textAlign:"center"}}>*/}
                        {/*<Statistic title="女员工" value={_pstate.dataList.length-manCount} prefix={<Icon type="woman" style={{color: 'pink'}}/>}/>*/}
                        {/*</Col>*/}
                        {/*<Col span={8} style={{textAlign:"center"}}>*/}
                        {/*<Statistic title="男员工" value={manCount} prefix={<Icon type="man" style={{color: 'blue'}}/>}/>*/}
                        {/*</Col>*/}
                        {/*</Row>*/}
                        {/*<hr/>*/}
                        <Table rowKey="user_name" columns={table_columns}
                               dataSource={_pstate.dataList} size="small"/>
                    </Spin>
                </div>
            </div>
            break
        case _childPages.viewDetail:
            let infoContent = "..."
            if (_pstate.dataOne != null) {
                const one_item = _pstate.dataOne
                if (one_item["type"] === "leave") {
                    let description = one_item["description"];
                    let descriptionText = description.substring(description.indexOf("]") + 1);
                    let seDate = description.substring(0, description.indexOf("]") + 1);
                    seDate = seDate.replace("[", "");
                    seDate = seDate.replace("]", "");
                    let seDateArr = seDate.split(',')
                    let startDate = seDateArr[0].substring(0, 4) + "-"
                        + seDateArr[0].substring(4, 6) + "-"
                        + seDateArr[0].substring(6, 8) + ' '
                        + seDateArr[0].substring(8, 10) + ':' + seDateArr[0].substring(10, 12)

                    let endDate = seDateArr[1].substring(0, 4) + "-"
                        + seDateArr[1].substring(4, 6) + "-"
                        + seDateArr[1].substring(6, 8) + ' '
                        + seDateArr[1].substring(8, 10) + ':' + seDateArr[1].substring(10, 12)
                    infoContent = <div>
                        <div className="col-sm-12 col-md-4">
                            <Divider orientation={"left"}><span>请假申请</span><Icon type="team"/></Divider>
                            <table className="table table-bordered table-condensed">
                                <tbody>
                                <tr>
                                    <td>申请编号</td>
                                    <td>{one_item["application_id"]}</td>
                                </tr>
                                <tr>
                                    <td>提交时间</td>
                                    <td>{one_item["created_at"]}</td>
                                </tr>
                                <tr>
                                    <td>休假时间</td>
                                    <td>{startDate + "到" + endDate}</td>
                                </tr>
                                <tr>
                                    <td>申请描述</td>
                                    <td>{descriptionText}</td>
                                </tr>
                                <tr>
                                    <td>审批人</td>
                                    <td>{one_item["approve_by"]}</td>
                                </tr>
                                <tr>
                                    <td>审批状态</td>
                                    <td>{one_item["approve_status"]}</td>
                                </tr>
                                <tr>
                                    <td>最后更新时间</td>
                                    <td>{one_item["last_update_at"]}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>;
                } else if (one_item["type"] === "office_supplies") {
                    infoContent = <div>
                        <div className="col-sm-12 col-md-4">
                            <Divider orientation={"left"}><span>办公用品申请</span><Icon type="team"/></Divider>
                            <table className="table table-bordered table-condensed">
                                <tbody>
                                <tr>
                                    <td>申请编号</td>
                                    <td>{one_item["application_id"]}</td>
                                </tr>
                                <tr>
                                    <td>提交时间</td>
                                    <td>{one_item["created_at"]}</td>
                                </tr>
                                <tr>
                                    <td>申请描述</td>
                                    <td>{one_item["description"]}</td>
                                </tr>
                                <tr>
                                    <td>审批人</td>
                                    <td>{one_item["approve_by"]}</td>
                                </tr>
                                <tr>
                                    <td>审批状态</td>
                                    <td>{one_item["approve_status"]}</td>
                                </tr>
                                <tr>
                                    <td>最后更新时间</td>
                                    <td>{one_item["last_update_at"]}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>;
                } else if (one_item["type"] === "resignation") {
                    infoContent = <div>
                        <div className="col-sm-12 col-md-4">
                            <Divider orientation={"left"}><span>离职申请</span><Icon type="team"/></Divider>
                            <table className="table table-bordered table-condensed">
                                <tbody>
                                <tr>
                                    <td>申请编号</td>
                                    <td>{one_item["application_id"]}</td>
                                </tr>
                                <tr>
                                    <td>提交时间</td>
                                    <td>{one_item["created_at"]}</td>
                                </tr>
                                <tr>
                                    <td>申请描述</td>
                                    <td><h4 style={{textAlign: "center"}}>辞职申请书</h4>

                                        <p>江苏耀迪新材料有限公司（苏州致豪新材料科技有限公司）：</p>

                                        <p>本人系江苏耀迪新材料有限公司（苏州致豪新材料科技有限公司）的员工，因本人另有发展需要，特向贵公司提出辞职申请！
                                            特此申请！</p></td>
                                </tr>
                                <tr>
                                    <td>审批人</td>
                                    <td>{one_item["approve_by"]}</td>
                                </tr>
                                <tr>
                                    <td>审批状态</td>
                                    <td>{one_item["approve_status"]}</td>
                                </tr>
                                <tr>
                                    <td>最后更新时间</td>
                                    <td>{one_item["last_update_at"]}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>;
                }
            }

            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backAllBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    {/*<Button type="primary" className="btn_backTOLanding" onClick={props.editOneBtnOclick}>*/}
                    {/*<Icon type="edit"/>*/}
                    {/*<span>更新信息</span>*/}
                    {/*</Button>*/}
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
                {/*<WrappedFormEditEmployeeProfile one_user={_pstate.dataOne} allDepartments={_pstate.allDepartments}/>*/}
            </div>
            break;
        case _childPages.createNew:
            let newTable = ''
            if (_pstate.type === 'leave') {
                newTable = <WrappedFormNewPTO/>
            } else if (_pstate.type === 'office_supplies') {
                newTable = <WrappedFormNewOfficeSuppliesApplication/>
            } else if (_pstate.type === 'resignation') {
                newTable = <WrappedFormNewResignationApplication/>
            } else {

            }
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backAllBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                {newTable}
            </div>
            break;
        default:
            break;
    }
    return _pageContent;
}
export default class SubPageUserApplication extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.userApplicationType)
        this.state = {
            loading: true,
            breadcrumb: '申请',
            childPage: _childPages.all,
            dataList: [],
            dataOne: null,
            type: props.userApplicationType
        }

        serviceUser.getUserApplicationListByUsernameAndType(localStorage.getItem('user_name'), props.userApplicationType).then(data => {
            if (data != null) {
                this.setState({
                    dataList: data,
                    loading: false,
                })
            }
        });
    }

    updateDataOne = (application_id) => {
        this.setState({
            loading: true
        });
        serviceUser.getUserApplicationByApplicationId(application_id).then(data => {
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
        this.updateDataOne(this.state.dataOne.application_id)
    }

    updatePasswordBtnOnclick = () => {
        this.setState({
            childPage: _childPages.edit
        });
    }

    handleAddNewBtnOnclick = () => {
        this.setState({
            childPage: _childPages.createNew
        });
    }

    handleReloadBtnOnclick = () => {
        this.setState({
            loading: true
        });
        serviceUser.getUserApplicationListByUsernameAndType(localStorage.getItem('user_name'), this.state.type).then(data => {
            if (data != null) {
                this.setState({
                    dataList: data,
                    loading: false,
                })
            }
        });
    }

    handleCheckDetailOnclick = (e) => {
        const application_id = e.target.attributes.application_id.value;

        this.setState({
            childPage: _childPages.viewDetail
        });
        this.updateDataOne(application_id)
    }

    handleBackAllBtnOnclick = () => {
        this.setState({
            childPage: _childPages.all
        });
    }

    handleEditOneBtnOclick = () => {
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
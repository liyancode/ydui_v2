import React from 'react';
import {Layout, Breadcrumb, Tabs, Collapse, Tag, Spin, Icon, Row, Col, Divider, Table, Button} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"
import _globalUtil from "../../../util/_globalUtil";

import {serviceCustomer} from "../../../service/serviceCustomer"
import WrappedFormNewCustomer from "./form/_formNewCustomer";
import WrappedFormNewCustomerContact from "./form/_formNewCustomerContact";
import WrappedFormEditCustomer from "./form/_formEditCustomer";
import WrappedFormEditContact from "./form/_formEditContact";
import WrappedFormNewCustomerFollowup from "./form/_formNewCustomerFollowup";


const {Content,} = Layout;
const TabPane = Tabs.TabPane;
const _styles = _globalConstrants._styles
// sub module key words
const _subConstrants = _globalConstrants._pages.apps.appMarketM
const _childPages = _globalConstrants._pages.childPages
const _childPageExtras={
    crm:{
        followUps:{
            view:"followUpsView",
            add:"followUpsAdd"
        },
        contacts:{
            edit:"contactsEdit",
            add:"contactsAdd",
        }
    }
}

//potential潜在/intentional有意向合作/intentional_order意向订单/formal_order正式订单
function func_followup_status_tag(followup_status) {
    let tg;
    switch (followup_status) {
        case 'potential':
            tg = <Tag color="#2db7f5">潜在客户</Tag>
            break;
        case 'intentional':
            tg = <Tag color="#87d068">有合作意向的客户</Tag>
            break;
        case 'intentional_order':
            tg = <Tag color="#87d068">已下意向订单</Tag>
            break;
        case 'formal_order':
            tg = <Tag color="#87d068">已下正式订单</Tag>
            break;
        default:
            tg = <Tag>未知<Icon type="minus-circle-o"/></Tag>
            break;
    }
    return <span>{tg}</span>
}

function sortFollowupArr(a, b) {
    return a.last_update_at > b.last_update_at ? 1 : -1
}

const PageContent = (props) => {
    //default lading page
    let _pageContent = <div>
        <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
            <Icon type="left"/>
            <span>返回</span>
        </Button>
        {_globalConstrants._pages.errorPage}
    </div>

    //which page?
    switch (props.sub) {
        case _globalConstrants._pages.landingPage:
            _pageContent = <div>
                <Divider orientation="left">客户订单管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.crm.en}
                                onClick={props.moduleButtonClick}>
                            <span className="module_button_icon iconfont_marketM">&#xe623;</span>
                            <span className="module_button_text">{_subConstrants.crm.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.order.en}
                                onClick={props.moduleButtonClick}>
                            <span className="module_button_icon iconfont_marketM">&#xe62e;</span>
                            <span className="module_button_text">{_subConstrants.order.cn}</span>
                        </Button>
                    </Col>
                </Row>
                <Divider orientation="left">销售审批管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.approvePrice.en}
                                onClick={props.moduleButtonClick}>
                            <span className="module_button_icon iconfont_marketM">&#xe681;</span>
                            <span className="module_button_text">{_subConstrants.approvePrice.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.approveDeliveryDate.en}
                                onClick={props.moduleButtonClick}>
                            <span className="module_button_icon iconfont_marketM">&#xe6c3;</span>
                            <span className="module_button_text">{_subConstrants.approveDeliveryDate.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.approvePurchaseRequest.en}
                                onClick={props.moduleButtonClick}>
                            <span className="module_button_icon iconfont_marketM">&#xe64f;</span>
                            <span className="module_button_text">{_subConstrants.approvePurchaseRequest.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.approvePrepareGoods.en}
                                onClick={props.moduleButtonClick}>
                            <span className="module_button_icon iconfont_marketM">&#xe651;</span>
                            <span className="module_button_text">{_subConstrants.approvePrepareGoods.cn}</span>
                        </Button>
                    </Col>
                </Row>
                <Divider orientation="left">销售对账管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.reconciliation.en}
                                onClick={props.moduleButtonClick}>
                            <span className="module_button_icon iconfont_marketM">&#xe60d;</span>
                            <span className="module_button_text">{_subConstrants.reconciliation.cn}</span>
                        </Button>
                    </Col>
                </Row>
                <Divider orientation="left">销售数据统计</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.saleStats.en}
                                onClick={props.moduleButtonClick}>
                            <span className="module_button_icon iconfont_marketM">&#xe637;</span>
                            <span className="module_button_text">{_subConstrants.saleStats.cn}</span>
                        </Button>
                    </Col>
                </Row>
                <Divider orientation="left">销售退货管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.returnGoods.en}
                                onClick={props.moduleButtonClick}>
                            <span className="module_button_icon iconfont_marketM">&#xe602;</span>
                            <span className="module_button_text">{_subConstrants.returnGoods.cn}</span>
                        </Button>
                    </Col>
                </Row>
            </div>
            break;
        case _subConstrants.crm.en:
            const _customerTableColumns = [
                {
                    title: '客户编号',
                    dataIndex: 'customer_id',
                    key: 'customer_id',
                    sorter: (a, b) => a.customer_id - b.customer_id,
                },
                {
                    title: '客户名称',
                    dataIndex: 'company_name',
                    key: 'company_name',
                    sorter: (a, b) => a.company_name > b.company_name ? 1 : -1,
                },
                {
                    title: '公司所在地',
                    dataIndex: 'company_location',
                    key: 'company_location',
                    sorter: (a, b) => a.company_location > b.company_location ? 1 : -1,
                },
                {
                    title: '创建者',
                    dataIndex: 'added_by_user_name',
                    key: 'added_by_user_name',
                },
                {
                    title: '跟进状态',
                    key: 'followup_status',
                    sorter: (a, b) => a.followup_status > b.followup_status ? 1 : -1,
                    render: (text, record) => {
                        return func_followup_status_tag(record.followup_status)
                    },
                }, {
                    title: '最后更新时间',
                    dataIndex: 'followup_last_update_at',
                    key: 'followup_last_update_at',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.followup_last_update_at > b.followup_last_update_at ? 1 : -1,
                    render: (text, record) => {
                        return (record.followup_last_update_at.split('+')[0])
                    },
                }, {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        return (<span>
                        <a href="javascript:;" onClick={props.checkDetailButtonClick}
                           _id_={record.customer_id}>查看详情</a>
                            {/*<Divider type="vertical"/>*/}
                            {/*<a href="javascript:;">Delete</a>*/}
                            {/*<Divider type="vertical"/>*/}
                            {/*<a href="javascript:;" className="ant-dropdown-link">*/}
                            {/*More actions <Icon type="down"/>*/}
                            {/*</a>*/}
                        </span>)
                    },
                }]

            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.crm.cn}
            </div>
            switch (props.childPage) {
                case _childPages.all:
                    _pageContent = <div>
                        <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                            <Icon type="left"/>
                            <span>返回</span>
                        </Button>
                        <Button type="primary" className="btn_backTOLanding" onClick={props.createNewButtonClick}>
                            <Icon type="plus"/>
                            <span>添加客户信息</span>
                        </Button>
                        <Button type="primary" disabled={props.loading} className="btn_backTOLanding"
                                onClick={props.reloadButtonClick}>
                            <Icon type="reload"/>
                            <span>刷新</span>
                        </Button>
                        <Spin spinning={props.loading}>
                            <Table rowKey="id" columns={_customerTableColumns}
                                   dataSource={props.dataList} size="small"/>
                        </Spin>
                    </div>
                    break;
                case _childPages.viewDetail:
                    let customer = props.dataDetail["customer"];
                    let contacts = props.dataDetail["contacts"];
                    let conatct_info_div = [];
                    for (let i = 0; i < contacts.length; i++) {
                        let contact_i = contacts[i];
                        conatct_info_div.push(
                            <table className="table" key={i}>
                                <tbody>
                                <tr>
                                    <td>姓名</td>
                                    <td>{contact_i["fullname"] + " " + ((contact_i["gender"] == 1) ? "先生" : "女士")}</td>
                                </tr>
                                <tr>
                                    <td><span>职务</span><Icon type="tag-o"/></td>
                                    <td>{contact_i["title"]}</td>
                                </tr>
                                <tr>
                                    <td><span>电话</span><Icon type="mobile"/></td>
                                    <td>{contact_i["phone_number"]}</td>
                                </tr>
                                <tr>
                                    <td><span>邮箱</span><Icon type="mail"/></td>
                                    <td>{contact_i["email"]}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <Button type="primary" icon="edit" className="btn_backTOLanding"
                                                contact_id={contact_i["id"]}
                                                onClick={props.editContactBtnOnclick}>更新</Button>
                                        {/*<Button type="danger" icon="delete" className="btn_backTOLanding"*/}
                                                {/*onClick={props.deleteContactBtnOnclick}*/}
                                                {/*id={"" + contact_i["id"] + ""}>删除</Button>*/}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        );
                    }

                    let one_customer_followups = props.dataDetailExtraInfo.customer_followups.sort(sortFollowupArr).reverse();
                    let followup_logs = [];
                    let followup = '';
                    let followup_status = 'potential';
                    for (let i = 0; i < one_customer_followups.length; i++) {
                        followup = one_customer_followups[i];
                        followup_logs.push(<p
                            key={followup.id}>{followup.last_update_at.split('+')[0] + followup.followup_method + " " + followup.followup_description}</p>)
                        if (i === 0) {
                            followup_status = followup.followup_status;
                        }
                    }

                    let followup_view_content = "";
                    switch (props.childPageExtra) {
                        case _childPageExtras.crm.followUps.view:
                            followup_view_content = <div>
                                <div className={"text-center"}>
                                    <Button type="primary" icon="edit" className="btn_backTOLanding"
                                            onClick={props.followUpAddBtnOnclick}>添加跟进记录</Button>
                                </div>
                                <Divider orientation={"left"}><span>客户当前跟进状态</span><Icon type="loading"/></Divider>
                                {func_followup_status_tag(followup_status)}
                                <br/>
                                <Divider orientation={"left"}><span>客户跟进历史记录</span><Icon type="area-chart"/></Divider>
                                {followup_logs}
                            </div>
                            break;
                        case _childPageExtras.crm.followUps.add:
                            followup_view_content = <div>
                                <div>
                                    <Button type="primary" className="btn_backTOLanding"
                                            onClick={props.backFromAddNewFollowup}>
                                        <Icon type="left"/>
                                        <span>返回</span>
                                    </Button>
                                    <h5>添加客户跟进记录</h5>
                                </div>
                                <WrappedFormNewCustomerFollowup one_customer={props.dataDetail}/>
                            </div>
                            break;
                        case _childPageExtras.crm.contacts.add:

                            break;
                        case _childPageExtras.crm.contacts.edit:

                            break;
                        default:
                            break;
                    }
                    _pageContent = <div>
                        <Button type="primary" className="btn_backTOLanding"
                                onClick={props.backAllButtonClick}>
                            <Icon type="left"/>
                            <span>返回</span>
                        </Button>

                        <Spin spinning={props.loading}>
                            <div className="col-sm-12 col-md-6">
                                <Divider orientation={"left"}>
                                    <Icon type="profile"/>
                                    <span>客户{customer["customer_id"]}详细信息 创建者:{customer["added_by_user_name"]} 创建时间:{customer["created_at"].split('+')[0]}</span>
                                </Divider>
                                <table className="table table-condensed">
                                    <tbody>
                                    <tr>
                                        <td><span>公司名称</span><Icon type="copyright"/></td>
                                        <td><h4>{customer["company_name"]}</h4></td>
                                    </tr>
                                    <tr>
                                        <td><span>公司所在地</span>
                                            <Icon type="environment-o"/></td>
                                        <td>{customer["company_location"]}</td>
                                    </tr>
                                    <tr>
                                        <td><span>公司税号</span>
                                            <Icon type="safety" style={{color: "#52c41a"}}/></td>
                                        <td>{customer["company_tax_number"]}</td>
                                    </tr>
                                    <tr>
                                        <td><span>公司法人</span>
                                            <Icon type="user"/></td>
                                        <td>{customer["company_legal_person"]}</td>
                                    </tr>
                                    <tr>
                                        <td style={{minWidth: 120}}><span>公司主营业务</span><Icon type="global"/></td>
                                        <td>{customer["company_main_business"]}</td>
                                    </tr>
                                    <tr>
                                        <td><span>公司网站</span><Icon type="link"/></td>
                                        <td><a target={"_blank"} href={customer["company_description"]}>
                                            {customer["company_description"]}
                                        </a></td>
                                    </tr>
                                    <tr>
                                        <td><span>公司电话</span><Icon type="phone"/></td>
                                        <td>{customer["company_tel_number"]}</td>
                                    </tr>
                                    <tr>
                                        <td><span>公司邮箱</span><Icon type="mail"/></td>
                                        <td>{customer["company_email"]}</td>
                                    </tr>
                                    <tr>
                                        <td style={{minWidth: 120}}>备注</td>
                                        <td>{customer["comment"]}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><Button type="primary" icon="edit" className="btn_backTOLanding"
                                                    onClick={props.editButtonClick}>更新</Button></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <Divider orientation={"left"}><Icon type="team"/><span>公司联系人</span></Divider>
                                {conatct_info_div}
                                <Divider><Button type="primary" icon="user-add" className="btn_backTOLanding"
                                                 onClick={props.addContactBtnOnclick}>添加新联系人</Button></Divider>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                {followup_view_content}
                            </div>
                        </Spin>
                    </div>
                    break;
                case _childPages.edit:
                    _pageContent=<div>
                        <div>
                            <Button type="primary" className="btn_backTOLanding" onClick={props.backDetailButtonClick}>
                                <Icon type="left"/>
                                <span>返回</span>
                            </Button>
                        </div>
                        <WrappedFormEditCustomer customer={props.dataDetail["customer"]}/>
                    </div>
                    break;
                case _childPages.createNew:
                    _pageContent=<div>
                        <div>
                            <Button type="primary" className="btn_backTOLanding" onClick={props.backAllButtonClick}>
                                <Icon type="left"/>
                                <span>返回</span>
                            </Button>
                        </div>
                        <WrappedFormNewCustomer/>
                    </div>
                    break;
                default:
                    break;
            }
            break;
        case _subConstrants.order.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.order.cn}
            </div>
            break;
        case _subConstrants.approvePrice.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.approvePrice.cn}
            </div>
            break;
        case _subConstrants.approveDeliveryDate.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.approveDeliveryDate.cn}
            </div>
            break;
        case _subConstrants.approvePurchaseRequest.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.approvePurchaseRequest.cn}
            </div>
            break;
        case _subConstrants.approvePrepareGoods.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.approvePrepareGoods.cn}
            </div>
            break;
        case _subConstrants.reconciliation.en: //对账
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.reconciliation.cn}
            </div>
            break;
        case _subConstrants.saleStats.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.saleStats.cn}
            </div>
            break;
        case _subConstrants.returnGoods.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.returnGoods.cn}
            </div>
            break;
        default:
            break;
    }
    return _pageContent
}

export default class AppMarketM extends React.Component {
    constructor(props) {
        super(props);
        const _sub = _globalUtil._getSearchSub()
        this.state = {
            loading: false,
            breadcrumbLanding: "销售管理",
            breadcrumb: _subConstrants[_sub] ? _subConstrants[_sub].cn : '',
            sub: _subConstrants[_sub] ? _sub : _globalConstrants._pages.landingPage,
            childPage: _childPages.all,
            childPageExtra:_childPageExtras.crm.followUps.view,
            dataList: [],
            dataDetail: {},
            dataDetailExtraInfo: {},
        }
        this.reloadDataList = this.reloadDataList.bind(this);
        this.updateDataDetail = this.updateDataDetail.bind(this);
        this.handleModuleButtonClick = this.handleModuleButtonClick.bind(this);
        this.handleBackLandingButtonClick = this.handleBackLandingButtonClick.bind(this);
        this.handleCreateNewButtonClick = this.handleCreateNewButtonClick.bind(this);
        this.handleReloadButtonClick = this.handleReloadButtonClick.bind(this);
        this.handleCheckDetailButtonClick = this.handleCheckDetailButtonClick.bind(this);
        this.handleBackAllButtonClick = this.handleBackAllButtonClick.bind(this);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleBackDetailButtonClick = this.handleBackDetailButtonClick.bind(this);

        //crm
        this.followUpAddBtnOnclick = this.followUpAddBtnOnclick.bind(this);
        this.backFromAddNewFollowup = this.backFromAddNewFollowup.bind(this);

        if (this.state.sub !== _globalConstrants._pages.landingPage) {
            switch (this.state.sub) {
                case _subConstrants.crm.en:
                    serviceCustomer.getCustomers(localStorage.getItem('user_name'), 'crm_my').then(data => {
                        this.setState({dataList: data["customers"], loading: false});
                    });
                    break;
                default:
                    break;
            }
        }
    }

    reloadDataList(sub) {
        if (sub !== _globalConstrants._pages.landingPage) {
            this.setState({loading: true})
            switch (sub) {
                case _subConstrants.crm.en:
                    serviceCustomer.getCustomers(localStorage.getItem('user_name'), 'crm_my').then(data => {
                        this.setState({dataList: data["customers"], loading: false});
                    });
                    break;
                default:
                    this.setState({loading: false})
                    break;
            }
        }
    }

    updateDataDetail(sub, _id_) {
        if (sub !== _globalConstrants._pages.landingPage) {
            this.setState({loading: true})
            switch (sub) {
                case _subConstrants.crm.en:
                    serviceCustomer.getByCustomerId(_id_).then(data => {
                        serviceCustomer.getCustomerFollowupsByCIdUname(_id_, localStorage.getItem('user_name')).then(data1 => {
                            this.setState({
                                childPage: _childPages.viewDetail,
                                breadcrumb: _subConstrants[sub].cn + ":" + _id_,
                                dataDetail: data,
                                dataDetailExtraInfo: {customer_followups: data1["customer_followups"]},
                                loading: false
                            });
                        });
                    });
                    break;
                default:
                    this.setState({loading: false})
                    break;
            }
        }
    }


    handleModuleButtonClick(e) {
        const subModule = e.target.attributes.module;
        if (subModule) {
            console.log(subModule.value)
            this.setState({
                loading: true,
            });
            _globalUtil._setSearchSub(subModule.value)
            this.setState({
                loading: false,
                sub: subModule.value,
                childPage: _childPages.all,
                breadcrumb: _subConstrants[subModule.value].cn
            });
            this.reloadDataList(subModule.value);
        } else {
            alert("未知页面！")
        }
    }

    handleBackLandingButtonClick() {
        _globalUtil._setSearchSub(_globalConstrants._pages.landingPage)
        this.setState({
            sub: _globalConstrants._pages.landingPage,
            breadcrumb: "所有"
        });
    }

    handleCreateNewButtonClick(e) {
        this.setState({
            childPage: _childPages.createNew
        });
    }

    handleReloadButtonClick(e) {
        this.reloadDataList(this.state.sub);
    }

    handleCheckDetailButtonClick(e) {
        if (e.target.attributes._id_) {
            this.updateDataDetail(this.state.sub, e.target.attributes._id_.value)
        }
    }

    handleBackAllButtonClick(e) {
        this.setState({
            childPage: _childPages.all
        });
    }

    handleEditButtonClick(e){
        this.setState({
            childPage: _childPages.edit
        });
    }

    handleBackDetailButtonClick(){
        const customer_id=this.state.dataDetail.customer.customer_id;
        this.setState({
            loading: true,
        });
        serviceCustomer.getByCustomerId(customer_id).then(data => {
            serviceCustomer.getCustomerFollowupsByCIdUname(customer_id, localStorage.getItem('user_name')).then(data1 => {
                this.setState({
                    childPage: _childPages.viewDetail,
                    breadcrumb: _subConstrants[this.state.sub].cn + ":" + customer_id,
                    dataDetail: data,
                    dataDetailExtraInfo: {customer_followups: data1["customer_followups"]},
                    loading: false
                });
            });
        });
    }

    followUpAddBtnOnclick(e){
        this.setState({
            childPageExtra: _childPageExtras.crm.followUps.add
        });
    }
    backFromAddNewFollowup(){
        serviceCustomer.getCustomerFollowupsByCIdUname(this.state.dataDetail["customer"].customer_id, localStorage.getItem('user_name')).then(data1 => {
            this.setState({
                childPageExtra:_childPageExtras.crm.followUps.view,
                dataDetailExtraInfo: {customer_followups: data1["customer_followups"]},
                loading: false
            });
        });
    }

    editContactBtnOnclick(e){

    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h4 style={{display: "inline"}}>
                        <Icon type="global"/>
                        <span>{this.state.breadcrumbLanding}</span>
                    </h4>
                    <Breadcrumb style={{display: "inline"}}>
                        <Breadcrumb.Item> </Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Content style={_styles.contentStyle}
                >
                    <PageContent
                        loading={this.state.loading}
                        sub={this.state.sub}
                        childPage={this.state.childPage}
                        childPageExtra={this.state.childPageExtra}
                        dataList={this.state.dataList}
                        dataDetail={this.state.dataDetail}
                        dataDetailExtraInfo={this.state.dataDetailExtraInfo}
                        //call back functions
                        moduleButtonClick={this.handleModuleButtonClick}
                        backLandingButtonClick={this.handleBackLandingButtonClick}
                        createNewButtonClick={this.handleCreateNewButtonClick}
                        reloadButtonClick={this.handleReloadButtonClick}
                        checkDetailButtonClick={this.handleCheckDetailButtonClick}
                        backAllButtonClick={this.handleBackAllButtonClick}
                        editButtonClick={this.handleEditButtonClick}
                        backDetailButtonClick={this.handleBackDetailButtonClick}

                        //crm
                        followUpAddBtnOnclick={this.followUpAddBtnOnclick}
                        backFromAddNewFollowup={this.backFromAddNewFollowup}
                        editContactBtnOnclick={this.editContactBtnOnclick}
                    />
                </Content>
            </div>)
    }
}
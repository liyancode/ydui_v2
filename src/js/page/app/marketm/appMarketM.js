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

import SubPageCustomer from "./subPageCustomer/subPageCustomer"

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
            _pageContent=<SubPageCustomer backLandingButtonClick={props.backLandingButtonClick}/>
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
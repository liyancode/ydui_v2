import React from 'react';
import {Layout, Breadcrumb, Tabs, Collapse, Spin, Icon, Row, Col, Divider, Table, Button} from 'antd';
import _globalConstrants from "../../util/_globalConstrants"
import _globalUtil from "../../util/_globalUtil";

const {Content,} = Layout;
const TabPane = Tabs.TabPane;
const _styles = _globalConstrants._styles
// sub module key words
const _subConstrants = _globalConstrants._pages.apps.appMarketM
const _childPages = _globalConstrants._pages.childPages

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
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.crm.cn}
            </div>
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
    return <Spin spinning={props.loading}>{_pageContent}</Spin>
}

export default class AppMarketM extends React.Component {
    constructor(props) {
        super(props);
        const _sub = _globalUtil._getSearchSub()
        this.state = {
            loading: false,
            breadcrumbLanding:"销售管理",
            breadcrumb: _subConstrants[_sub]?_subConstrants[_sub].cn:'',
            sub: _sub ? _sub : _globalConstrants._pages.landingPage,
            childPage: _childPages.all,
        }
        this.handleModuleButtonClick = this.handleModuleButtonClick.bind(this);
        this.handleBackLandingButtonClick = this.handleBackLandingButtonClick.bind(this);
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
                breadcrumb:_subConstrants[subModule.value].cn
            });
        } else {
            alert("未知页面！")
        }
    }

    handleBackLandingButtonClick() {
        _globalUtil._setSearchSub(_globalConstrants._pages.landingPage)
        this.setState({
            sub: _globalConstrants._pages.landingPage,
            breadcrumb:"所有"
        });
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
                        //call back functions
                        moduleButtonClick={this.handleModuleButtonClick}
                        backLandingButtonClick={this.handleBackLandingButtonClick}
                    />
                </Content>
            </div>)
    }
}
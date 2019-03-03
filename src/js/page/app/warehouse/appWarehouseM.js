import React from 'react';
import {Layout, Breadcrumb, Tabs, Collapse, Spin, Icon, Row, Col, Divider, Table, Button} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"
import _globalUtil from "../../../util/_globalUtil";
// import SubPageRawMaterialInOut from "./subPageRawMaterialInOut/subPageRawMaterialInOut"
import SubPageRawMaterialInOut from "./subPageRawMaterialInOut/subPageRMInOut"

const {Content,} = Layout;
const TabPane = Tabs.TabPane;
const _styles = _globalConstrants._styles
// sub module key words
const _subConstrants = _globalConstrants._pages.apps.appWarehouseM
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
                <Divider orientation="left">出/入库管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.productsInOut.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"interation"}/>
                            <span className="module_button_text">{_subConstrants.productsInOut.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.rawMaterialInOut.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"interation"}/>
                            <span className="module_button_text">{_subConstrants.rawMaterialInOut.cn}</span>
                        </Button>
                    </Col>
                </Row>
                <Divider orientation="left">库存管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.inventory.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"table"}/>
                            <span className="module_button_text">{_subConstrants.inventory.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.pickRW.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"file-done"}/>
                            <span className="module_button_text">{_subConstrants.pickRW.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.returnRW.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"exception"}/>
                            <span className="module_button_text">{_subConstrants.returnRW.cn}</span>
                        </Button>
                    </Col>
                </Row>
                <Divider orientation="left">物流管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.packaging.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"dropbox"}/>
                            <span className="module_button_text">{_subConstrants.packaging.cn}</span>
                        </Button>
                    </Col>
                </Row>
            </div>
            break;
        case _subConstrants.productsInOut.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.productsInOut.cn}
            </div>
            break;
        case _subConstrants.rawMaterialInOut.en:
            _pageContent =
                <SubPageRawMaterialInOut backLandingButtonClick={props.backLandingButtonClick}/>
            break;
        case _subConstrants.inventory.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.inventory.cn}
            </div>
            break;
        case _subConstrants.pickRW.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.pickRW.cn}
            </div>
            break;
        case _subConstrants.returnRW.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.returnRW.cn}
            </div>
            break;
        case _subConstrants.packaging.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.packaging.cn}
            </div>
            break;
        default:
            break;
    }
    return <Spin spinning={props.loading}>{_pageContent}</Spin>
}

export default class AppWarehouseM extends React.Component {
    constructor(props) {
        super(props);
        const _sub = _globalUtil._getSearchSub()
        this.state = {
            loading: false,
            breadcrumbLanding:"仓库管理",
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
                        <Icon type="database" />
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
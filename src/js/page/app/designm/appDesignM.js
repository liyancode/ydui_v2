import React from 'react';
import {Layout, Breadcrumb, Tabs, Collapse, Spin, Icon, Row, Col, Divider, Table, Button} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"
import _globalUtil from "../../../util/_globalUtil";

const {Content,} = Layout;
const TabPane = Tabs.TabPane;
const _styles = _globalConstrants._styles
// sub module key words
const _subConstrants = _globalConstrants._pages.apps.appDesignM
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
                <Divider orientation="left">风管设计管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.design.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"project"}/>
                            <span className="module_button_text">{_subConstrants.design.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.specification.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"read"}/>
                            <span className="module_button_text">{_subConstrants.specification.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.install.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"tool"}/>
                            <span className="module_button_text">{_subConstrants.install.cn}</span>
                        </Button>
                    </Col>
                </Row>
            </div>
            break;
        case _subConstrants.design.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.design.cn}
            </div>
            break;
        case _subConstrants.specification.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.specification.cn}
            </div>
            break;
        case _subConstrants.install.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.install.cn}
            </div>
            break;
        default:
            break;
    }
    return <Spin spinning={props.loading}>{_pageContent}</Spin>
}

export default class AppDesignM extends React.Component {
    constructor(props) {
        super(props);
        const _sub = _globalUtil._getSearchSub()
        this.state = {
            loading: false,
            breadcrumbLanding:"设计管理",
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
                        <Icon type="experiment" />
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
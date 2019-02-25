import React from 'react';
import {Layout, Breadcrumb, Tabs, Collapse, Spin, Icon, Row, Col, Divider, Table, Button} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"
import _globalUtil from "../../../util/_globalUtil";

const {Content,} = Layout;
const _styles = _globalConstrants._styles
// sub module key words
const _subConstrants = _globalConstrants._pages.apps.appSystemM
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
                <Divider orientation="left">系统管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.passwordReset.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"key"}/>
                            <span className="module_button_text">{_subConstrants.passwordReset.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.authority.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"team"}/>
                            <span className="module_button_text">{_subConstrants.authority.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.information.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"edit"}/>
                            <span className="module_button_text">{_subConstrants.information.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.dataArchive.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"save"}/>
                            <span className="module_button_text">{_subConstrants.dataArchive.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.systemSetting.en}
                                onClick={props.moduleButtonClick}>
                            <Icon className="module_button_icon" type={"setting"}/>
                            <span className="module_button_text">{_subConstrants.systemSetting.cn}</span>
                        </Button>
                    </Col>
                </Row>
            </div>
            break;
        case _subConstrants.passwordReset.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.passwordReset.cn}
            </div>
            break;
        case _subConstrants.authority.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.authority.cn}
            </div>
            break;
        case _subConstrants.information.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.information.cn}
            </div>
            break;
        case _subConstrants.dataArchive.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.dataArchive.cn}
            </div>
            break;
        case _subConstrants.systemSetting.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.systemSetting.cn}
            </div>
            break;
        default:
            break;
    }
    return <Spin spinning={props.loading}>{_pageContent}</Spin>
}

export default class AppPurchaseM extends React.Component {
    constructor(props) {
        super(props);
        const _sub = _globalUtil._getSearchSub()
        this.state = {
            loading: false,
            breadcrumbLanding:"系统管理",
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
                        <Icon type="setting"/>
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
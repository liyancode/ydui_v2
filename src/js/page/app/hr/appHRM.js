import React from 'react';
import {Layout, Breadcrumb, Tabs, Collapse, Spin, Icon, Row, Col, Divider, Table, Button} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"
import _globalUtil from "../../../util/_globalUtil";

import SubPageMyInfo from "./subMyInfo/subMyInfo";
import SubPageEmployeeProfile from "./subPageEmployeeProfile/subPageEmployeeProfile"
import SubPageRulesAndRegulations from "./subPageRulesAndRegulations/subPageRulesAndRegulations";

const {Content,} = Layout;
const TabPane = Tabs.TabPane;
const _styles = _globalConstrants._styles
// sub module key words
const _subConstrants = _globalConstrants._pages.apps.appHR
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
                <Divider orientation="left">办公人事管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.myInfo.en}
                                onClick={props.moduleButtonClick}>
                            <Icon style={{fontSize: 36}} type={"user"}/>
                            <span style={{display: "block", marginLeft: 0}}>{_subConstrants.myInfo.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.employeeProfile.en}
                                onClick={props.moduleButtonClick}>
                            <Icon style={{fontSize: 36}} type={"solution"}/>
                            <span style={{display: "block", marginLeft: 0}}>{_subConstrants.employeeProfile.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.officeSupplies.en}
                                onClick={props.moduleButtonClick}
                                disabled={true} title={"开发中..."}
                        >
                            <Icon style={{fontSize: 36}} type={"desktop"}/>
                            <span style={{display: "block", marginLeft: 0}}>{_subConstrants.officeSupplies.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.pto.en}
                                onClick={props.moduleButtonClick} disabled={true} title={"开发中..."}>
                            <Icon style={{fontSize: 36}} type={"schedule"}/>
                            <span style={{display: "block", marginLeft: 0}}>{_subConstrants.pto.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.reimbursement.en}
                                onClick={props.moduleButtonClick} disabled={true} title={"开发中..."}>
                            <Icon style={{fontSize: 36}} type={"property-safety"}/>
                            <span style={{display: "block", marginLeft: 0}}>{_subConstrants.reimbursement.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.resignationLetter.en}
                                onClick={props.moduleButtonClick} disabled={true} title={"开发中..."}>
                            <Icon style={{fontSize: 36}} type={"user-delete"}/>
                            <span style={{display: "block", marginLeft: 0}}>{_subConstrants.resignationLetter.cn}</span>
                        </Button>
                    </Col>
                </Row>
                <Divider orientation="left">信息通讯管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.announcement.en}
                                onClick={props.moduleButtonClick} disabled={true} title={"开发中..."}>
                            <Icon style={{fontSize: 36}} type={"notification"}/>
                            <span style={{display: "block", marginLeft: 0}}>{_subConstrants.announcement.cn}</span>
                        </Button>
                        <Button style={_styles.styleFLogo} module={_subConstrants.rulesAndRegulations.en}
                                onClick={props.moduleButtonClick}>
                            <Icon style={{fontSize: 36}} type={"read"}/>
                            <span
                                style={{display: "block", marginLeft: 0}}>{_subConstrants.rulesAndRegulations.cn}</span>
                        </Button>
                    </Col>
                </Row>
                <Divider orientation="left">资料档案管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.electronicData.en}
                                onClick={props.moduleButtonClick} disabled={true} title={"开发中..."}>
                            <Icon style={{fontSize: 36}} type={"usb"}/>
                            <span style={{display: "block", marginLeft: 0}}>{_subConstrants.electronicData.cn}</span>
                        </Button>
                    </Col>
                </Row>
                <Divider orientation="left">员工考核管理</Divider>
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row">
                        <Button style={_styles.styleFLogo} module={_subConstrants.performanceAppraisal.en}
                                onClick={props.moduleButtonClick} disabled={true} title={"开发中..."}>
                            <Icon style={{fontSize: 36}} type={"trophy"}/>
                            <span style={{
                                display: "block",
                                marginLeft: 0
                            }}>{_subConstrants.performanceAppraisal.cn}</span>
                        </Button>
                    </Col>
                </Row>
            </div>
            break;
        case _subConstrants.myInfo.en:
            _pageContent =
                <SubPageMyInfo backLandingButtonClick={props.backLandingButtonClick}/>
            break;
        case _subConstrants.officeSupplies.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.officeSupplies.cn}
            </div>
            break;
        case _subConstrants.employeeProfile.en:
            _pageContent = <SubPageEmployeeProfile backLandingButtonClick={props.backLandingButtonClick}/>
            break;
        case _subConstrants.pto.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.pto.cn}
            </div>
            break;
        case _subConstrants.reimbursement.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.reimbursement.cn}
            </div>
            break;
        case _subConstrants.resignationLetter.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.resignationLetter.cn}
            </div>
            break;
        case _subConstrants.announcement.en: //对账
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.announcement.cn}
            </div>
            break;
        case _subConstrants.rulesAndRegulations.en:
            _pageContent = <SubPageRulesAndRegulations backLandingButtonClick={props.backLandingButtonClick}/>
            break;
        case _subConstrants.electronicData.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.electronicData.cn}
            </div>
            break;
        case _subConstrants.performanceAppraisal.en:
            _pageContent = <div>
                <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                {_subConstrants.performanceAppraisal.cn}
            </div>
            break;
        default:
            break;
    }
    return <Spin spinning={props.loading}>{_pageContent}</Spin>
}

export default class AppHR extends React.Component {
    constructor(props) {
        super(props);
        const _sub = _globalUtil._getSearchSub()
        this.state = {
            loading: false,
            breadcrumbLanding: "人力资源",
            breadcrumb: _subConstrants[_sub] ? _subConstrants[_sub].cn : '',
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
                breadcrumb: _subConstrants[subModule.value].cn
            });
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

    render() {
        return (
            <div>
                <div className="page-header">
                    <h4 style={{display: "inline"}}>
                        <Icon type="user"/>
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
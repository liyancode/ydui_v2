import React from "react";
import {List, Icon, Button, Spin, Table, Radio, Divider} from 'antd';
import _globalConstrants from "../../../../util/_globalConstrants";

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

    const fileList=[
        '员工手册-2019.3.3.pdf',
        '考勤管理制度-2019.2.22.pdf'
    ]
    switch (_pstate.childPage) {
        case _childPages.all:
            _pageContent = <div>
                <div>
                    <Button type="primary" className="btn_backTOLanding" onClick={props.backLandingButtonClick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <h3 style={{ margin: '16px 0' }}>规章制度文件</h3>
                <List
                    size="small"
                    bordered
                    dataSource={fileList}
                    renderItem={
                        item => (<List.Item><a href={"/files/"+item} target={"_blank"}>{item}</a></List.Item>)}
                />
            </div>
            break
        case _childPages.viewDetail:
            break;
        default:
            break;
    }
    return _pageContent;
}
export default class SubPageRulesAndRegulations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadcrumb: '规章制度',
            childPage: _childPages.all,
            dataList: [],
            dataOne: null
        }
    }

    handleCheckDetailOnclick=(e) =>{
        this.setState({
            childPage: _childPages.viewDetail
        });
    }
    render() {
        return (<PageContent
            _pstate={this.state}
            backLandingButtonClick={this.props.backLandingButtonClick}
            checkDetailOnclick={this.handleCheckDetailOnclick}
        />);
    }

}
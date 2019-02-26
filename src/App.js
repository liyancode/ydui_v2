import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Layout,} from 'antd';
import history from "./js/util/_globalHistory"
import _globalUtil from "./js/util/_globalUtil"
import {service_Util_} from "../src/js/service/serviceUtil"
import {tokenExpired} from "./js/service/tokenExpired";

import LoginPage from "./js/page/login/loginPage"
import CompHeader from "./js/page/component/compHeader"
import CompSider from "./js/page/component/compSider"
import CompFooter from "./js/page/component/compFooter"
import CompNotLogin from "./js/page/component/compNotLogin"
import {PrivateRoute} from "./PrivateRoute";
import AppHome from "./js/page/app/home/appHome"
import AppHR from "./js/page/app/hr/appHR"
import AppDesignM from "./js/page/app/designm/appDesignM"
import AppFinanceM from "./js/page/app/financem/appFinanceM"
import AppMarketM from "./js/page/app/marketm/appMarketM"
import AppProduceM from "./js/page/app/producem/appProduceM"
import AppPurchaseM from "./js/page/app/purchasem/appPurchaseM"
import AppSystemM from "./js/page/app/systemm/appSystemM"
import AppWarehouseM from "./js/page/app/warehouse/appWarehouseM"


const P404 = () => <h2>404</h2>;
const NotLogin = () => <div>
    <h2>未登录</h2>
    <a href={"/login"}>去登录</a>
</div>;


// add path to history

function handleSiderLinkClick(e) {
    history.push(e.target.pathname)
}

window.addEventListener('popstate', function() {
    console.log("back")
},false);
export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    componentDidMount(){
        // 设置定时器并赋值给 timer
        if(window.location.pathname.indexOf('/login')!==0){
            setInterval(function(){
                service_Util_.heart_beat().then(response=>{
                    if (!response.ok) {
                        tokenExpired();
                        return null;
                    } else {
                        console.log("ok")
                    }
                })
            },15000)
        }else{
            console.log("login page")
        }
    }

    render() {
        let defaultSelectedKeys=[_globalUtil._pathnameToMenukey()]
        console.log(defaultSelectedKeys)
        if(window.location.pathname.indexOf('/login')===0){
            return (<Router><LoginPage/></Router>)
        }else{
            return (<Router>
                <Layout style={{minHeight:"100%"}}>
                    <CompHeader collapsed={this.state.collapsed} toggle={this.toggle}/>
                    <Layout style={{marginTop:64}}>
                        <CompSider
                            collapsed={this.state.collapsed}
                            defaultMenuKey={defaultSelectedKeys}
                            siderLinkClick={handleSiderLinkClick}
                        />
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Switch>
                                <PrivateRoute path="/" exact component={AppHome}/>
                                <PrivateRoute path="/home/" component={AppHome}/>
                                <PrivateRoute path="/appHR/" component={AppHR}/>
                                <PrivateRoute path="/appDesignM/" component={AppDesignM}/>
                                <PrivateRoute path="/appFinanceM/" component={AppFinanceM}/>
                                <PrivateRoute path="/appMarketM/" component={AppMarketM}/>
                                <PrivateRoute path="/appProduceM/" component={AppProduceM}/>
                                <PrivateRoute path="/appPurchaseM/" component={AppPurchaseM}/>
                                <PrivateRoute path="/appSystemM/" component={AppSystemM}/>
                                <PrivateRoute path="/appWarehouseM/" component={AppWarehouseM}/>
                                <Route path="/notLogin" component={CompNotLogin}/>
                                <Route component={P404}/>
                            </Switch>
                            <CompFooter/>
                        </Layout>
                    </Layout>
                </Layout>
            </Router>)
        }
    }
}

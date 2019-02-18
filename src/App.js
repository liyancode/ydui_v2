import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Layout,} from 'antd';
import history from "./js/util/_globalHistory"
import _globalUtil from "./js/util/_globalUtil"
import LoginPage from "./js/page/login/loginPage"
import CompHeader from "./js/page/component/compHeader"
import CompSider from "./js/page/component/compSider"
import CompFooter from "./js/page/component/compFooter"
import CompNotLogin from "./js/page/component/compNotLogin"
import {PrivateRoute} from "./PrivateRoute";
import AppHome from "./js/page/app/home/appHome"
import AppHR from "./js/page/app/hr/appHR"
import AppCRM from "./js/page/app/crm/appCRM"
import AppOrder from "./js/page/app/order/appOrder"
import AppWarehouse from "./js/page/app/warehouse/appWarehouse"

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

    render() {
        if(window.location.pathname.indexOf('/login')===0){
            return <LoginPage/>
        }else{
            return (<Router>
                <Layout style={{minHeight:"100%"}}>
                    <CompHeader collapsed={this.state.collapsed} toggle={this.toggle}/>
                    <Layout style={{marginTop:64}}>
                        <CompSider
                            collapsed={this.state.collapsed}
                            defaultMenuKey={[_globalUtil._pathnameToMenukey()]}
                            siderLinkClick={handleSiderLinkClick}
                        />
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Switch>
                                <PrivateRoute path="/" exact component={AppHome}/>
                                <PrivateRoute path="/home/" component={AppHome}/>
                                <PrivateRoute path="/appHR/" component={AppHR}/>
                                <PrivateRoute path="/appCRM/" component={AppCRM}/>
                                <PrivateRoute path="/appOrder/" component={AppOrder}/>
                                <PrivateRoute path="/appWarehouse/" component={AppWarehouse}/>
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

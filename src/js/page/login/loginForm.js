import React from "react";
import {
    Form, Icon, Input, Button, Spin,
} from 'antd';

import {serviceUser} from "../../service/serviceUser";

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                serviceUser.login(values['userName'],values['password']).then(data=>{
                    this.setState({loading: false});
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Spin spinning={this.state.loading} tip="正在登录..." size="large">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: '请输入用户名!'}],
                        })(
                            <Input className={"login-form-input"}
                                   prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码!'}],
                        })(
                            <Input className={"login-form-input"}
                                   prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                        <span>登录<Icon type={"login"}/></span>
                    </Button>
                    <div style={{marginTop: 24, color: "#ddd"}}>
                    <span>
                        <Icon type="bulb" style={{color: "#00ac47"}}/>
                        提示:没账号或忘记密码,请找管理员.
                    </span>
                    </div>
                </Form>
            </Spin>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);
export default WrappedNormalLoginForm;
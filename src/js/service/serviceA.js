import {message} from 'antd'
require('es6-promise').polyfill();
require('isomorphic-fetch');

const aService = {
    getUserByUsername,
}
export default aService

function getUserByUsername(user_name){
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDgwODkxMjAsImlhdCI6MTU0ODA4MTkyMCwiaXNzIjoieWRhcGkueWFvZGljaGluYS5jbiIsInNjb3BlcyI6WyJ1c2Vyc19nZXQiLCJ1c2Vyc191cGRhdGUiLCJ1c2Vyc19hZGQiLCJ1c2Vyc19kZWxldGUiXSwidXNlciI6eyJ1c2VybmFtZSI6ImFkbWluIiwiYXV0aG9yaXR5IjoiaHI6cncsY3JtOnJ3LG9yZGVyOnJ3LGZpbjpydyxwcm9kdWN0OnJ3LHdhcmVob3VzZTpydyJ9fQ.qv69P7HXhVRaUMJdT-kIGRjXXl5DQj_xksGL-H6vGcQ'}
    };

    return fetch(`/api/users/`+user_name, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            // auto tokenExpired if 401 response returned from api
            message.error("用户名或密码错误！");
            // logout();
        }else if(response.status === 500){
            message.error("错误，请稍后再试！");
        }else if(response.status === 404){
            message.error("用户名不存在！");
        }else if(response.status === 403){
            message.error("无权限！");
        }else if(response.status === 504){
            message.error("504 Bad Gateway！");
        }else{
            message.error('HTTP '+response.status+' Error!');
        }
        //
        // const error = (data && data.message) || response.statusText;
        // return Promise.reject(error);
        return null;
    }else{
        if(response.status === 201){
            message.success("操作完成！")
        }
        return response.text().then(text => {
            let data = text && JSON.parse(text);
            if(data==null){
                data='ok'
            }
            return data;
        });

    }
}
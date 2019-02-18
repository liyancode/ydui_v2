import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './index.css';
import AppRouter from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<LocaleProvider locale={zhCN}><AppRouter /></LocaleProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

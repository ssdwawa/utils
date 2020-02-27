
//封装的ajax请求
import axios from 'axios';

import { history } from '../App';
import { GlobalStoreIns } from '../stores/GlobalStore';

const { language } = GlobalStoreIns;

const baseURL = 'http://10.8.25.114:5010/api'; //base
// const baseURL = 'http://10.8.22.42:5000/api'; //zouhui
// const baseURL = 'http://10.8.22.14:5000/api'; //leo
// const baseURL = 'http://10.8.22.193:5000/api'; //chenbingwei

const service = axios.create({
    baseURL
});

service.interceptors.request.use(config => {
    config.headers.Authorization =
        'Bearer ' + sessionStorage.getItem('responseToken');
    return config;
});

service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求';
                    break;
                case 401:
                    error.message = '未授权，请重新登录';
                    history.push(`/${language}/login`);
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源';
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器端出错';
                    break;
                case 501:
                    error.message = '网络未实现';
                    break;
                case 502:
                    error.message = '网络错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                case 505:
                    error.message = 'http版本不支持该请求';
                    break;
                default:
                    error.message = `连接错误${error.response.status}`;
            }
        } else {
            error.message = '连接到服务器失败';
        }

        const { status, data } = error.response;
        return Promise.resolve({ status, data });
    }
);

const Ajax = {
    get: url => {
        return service.get( url )
    },
    post: ( url, params ) => {
        return service.post( url, params )
    },
    delete: url => {
        return service.delete( url )
    }
}

export default Ajax;




//使用
import Ajax from ' ..... '
Ajax.get( url )
        .then((api) => {
            console.log(res.data);
            that.handleSuccess(res.data, alertId);
})

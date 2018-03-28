//封装的ajax请求
import Axios from 'axios';

const getConfig = () => {
    return {
        headers:{
            "Authorization": 'Bearer' + " " + localStorage.getItem('responseToken')
        }
    }
}

Axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error && error.response) {
        switch (error.response.status) {
        case 400:
            error.message = '错误请求';
            break;
        case 401:
            error.message = '未授权，请重新登录';
            window.location.href = '/login';
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

    return Promise.resolve(error.response);
});

const Ajax = {
    get: url => {
        return Axios.get( url, getConfig() )
    },
    post: ( url, params ) => {
        return Axios.post( url, params, getConfig() )
    },
    delete: url => {
        return Axios.delete( url, getConfig() )
    }
}

export default Ajax;

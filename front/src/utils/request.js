// ,
// "proxy": {
//     "/api/**": {
//         "target": "http://localhost:8080",
//             "changeOrigin": true
//     }
// }

import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
    timeout: 50000
});
instance.defaults.headers = {
    'Authorization': 'Basic cGxhdGZvcm1fbGljZW5zZV9hZG1pbjpod192ZGlfbGljZW5zZQ=='
};
//请求发出前拦截
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error)
});
//请求响应拦截
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error)
});

export function get(url, params) {
    return instance.get(url, {
        params
    })
}

export function post(url, data) {
    return instance.post(url, data)
}
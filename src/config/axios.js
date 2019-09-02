import Vue from 'vue'
import axios from 'axios';
import config from './config.js';
import VueAxios from 'vue-axios';
import qs from 'qs';
import {
    log
} from 'util';

Vue.use(VueAxios, axios);



axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials =true;
function get(param) {
    let baseURL = param.baseURL || config.current;
    let url = (typeof param == 'string' ? param : param.url) || '';
    // let data = qs.stringify(param.data) || {};
    let success = param.success || new Function();
    let error = param.error || new Function();
    axios.get(baseURL + url, {params:param.data})
        .then(function (response) {
            success(response.data, response);
        })
        .catch(function (err) {
            error(err)
        });
}

function post(param) {
    let baseURL = param.baseURL || config.current;
    let url = (typeof param == 'string' ? param : param.url) || '';
    let data = qs.stringify(param.data) || {};
    let success = param.success || new Function();
    let error = param.error || new Function();
    if (param.contentType) {
        axios.defaults.headers.post['Content-Type'] = param.contentType;
        data = param.data
    }

    axios.post(baseURL + url, data)
        .then(function (response) {
            success(response.data, response)
        })
        .catch(function (err) {
            error(err)
        });
}

async function $get(param) {
    let baseURL = param.baseURL || config.current;
    let url = (typeof param == 'string' ? param : param.url) || '';
    let query = param.data;
    if (param.responseType) {
        try {
            let res = await axios.get(baseURL + url,{responseType:param.responseType} ,{params:query});
            return res;
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            let res = await axios.get(baseURL + url, {params:query});
            return res;
        } catch (error) {
            console.log(error);
        }
    }

}

async function $post(param) {
    let baseURL = param.baseURL || config.current;
    let url = (typeof param == 'string' ? param : param.url) || '';
    if (param.contentType) {
        try {
            axios.defaults.headers.post['Content-Type'] = param.contentType;
            let res = await axios.post(baseURL + url, param.data);
            return res;
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            let query = qs.stringify(param.data) || {};
            let res = await axios.post(baseURL + url, query);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

async function $put(param) {
    let baseURL = param.baseURL || config.current;
    let url = (typeof param == 'string' ? param : param.url) || '';
    if (param.contentType) {
        try {
            axios.defaults.headers.post['Content-Type'] = param.contentType;
            let res = await axios.put(baseURL + url, param.data);
            return res;
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            let query = qs.stringify(param.data) || {};
            let res = await axios.put(baseURL + url, query);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

async function $patch(param) {
    let baseURL = param.baseURL || config.current;
    let url = (typeof param == 'string' ? param : param.url) || '';
    if (param.contentType) {
        try {
            axios.defaults.headers.post['Content-Type'] = param.contentType;
            let res = await axios.patch(baseURL + url, param.data);
            return res;
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            let query = qs.stringify(param.data) || {};
            let res = await axios.patch(baseURL + url, query);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

async function $postFile(param) {
    let baseURL = param.baseURL || config.current;
    let url = (typeof param == 'string' ? param : param.url) || '';
    let fromData = new FormData();
    param.file && fromData.append('file', param.file);
    try {
        axios.defaults.headers.post['Content-Type'] = param.contentType || 'multipart/form-data';
        let res = await axios.post(baseURL + url,fromData);
        return res;
    } catch (error) {
        console.dir(error);
    }
}


export default {
    get,
    post,
    $get,
    $post,
    $put,
    $postFile,
    axios,
    $patch
}
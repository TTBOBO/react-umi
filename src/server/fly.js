import Fly from 'flyio/dist/npm/fly';
import * as constants from './constants';
const fly = new Fly();
fly.config.baseURL = constants.BASEURL;
fly.config.headers = {
    "Content-Type":"text/html; charset=utf-8"
}

fly.interceptors.request.use(async (request) => {
    return request;
})

fly.interceptors.response.use(res => {
    return res.data;
},err => {
    const {response:{data:error}} = err;
    // const errotText = error && error[0].message; 
    return error;
})

export default fly;
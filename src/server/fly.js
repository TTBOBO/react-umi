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
    if(err.response){
        const {response:{data:error}} = err;
        return error;
    }else{
        const {message} = err;
        return message;
    }
})

export default fly;
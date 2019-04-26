import fly from './fly';
import * as constants from './constants';
const api = constants.api;


const suffixObj = {
    1:"/v1",
    2:"/jawen",
    3:"",
    4:"/proxy",
    5:'/v2'
}
async function ajaxGet(url,params = {},suffix = 4){
    return await fly.get(suffixObj[suffix]+api[url],params);
}

async function ajaxPost(url,params = {},suffix = 4){
    return await fly.post(suffixObj[suffix]+api[url],params);
}

export {
    ajaxGet,
    ajaxPost
}


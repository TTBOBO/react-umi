
import router from 'umi/router';
import RoutersArr from '../config/config.router';
import React from 'react'
import {ajaxGet,ajaxPost} from './server/ajax'

React.$ajaxGet = ajaxGet;
React.$ajaxPost = ajaxPost;
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};

export function onRouteChange({ location, routes }){
    let routesArr = getRouter(RoutersArr);
    if(routesArr.indexOf(location.pathname) === -1){
        router.replace('/404');
    }
    return {};
}


function getRouter(routes){
    let arr = routes.map(item => {
        if(item.routes){
            return [item.path,getRouter(item.routes)]
        }else{
            if(item.path){
                return item.path;
            }
        }
    })
    while(arr.some(item=> Array.isArray(item))){
        arr=[].concat.apply([],arr)
    }
    return arr;
}
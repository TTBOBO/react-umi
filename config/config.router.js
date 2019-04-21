export default [
    //,Routes:['src/pages/Authorized.js']
    {   path: '/user', 
        component: './login/_layout.js',
        routes:[
            { path: '/user', redirect:"/user/login"},
            { path: '/user/login',name:"登录", component: './login/index.js'}
        ]
    },
    { 
        path: '/',
        component: '../layouts/index.js',
        routes:[
            { path: '/', redirect:"/home/info"},//
            { path: '/home',name:"home",component:"./home/index.js" ,routes:[
                { path:"/home/info",name:"info", component: './404/index.js'}
            ]},
            { path: '/home1',name:"home1",component:"./home/index.js" ,routes:[
                { path:"/405",name:"405", component: './404/index.js'}
            ]},
        ]
    },
    { path:"/404", component: './404/index.js'},
]
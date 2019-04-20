export default [
    //,Routes:['src/pages/Authorized.js']
    { 
        path: '/',
        component: '../layouts/index.js',
        routes:[
            { path: '/', redirect:"/home"},
            { path: '/home',component:"./home/index.js" },
        ]
    },
    {   path: '/user', 
        component: './login/_layout.js',
        routes:[
            { path: '/user/login',name:"登录", component: './login/index.js'}
        ]
    },
    { path:"/404", component: './404/index.js'},
]
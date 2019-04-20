
// ref: https://umijs.org/config/
import routers from './config.router'
export default {
    treeShaking: true,
    plugins: [
      // ref: https://umijs.org/plugin/umi-plugin-react.html
      ['umi-plugin-react', {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'umidemo',
        dll: true,
        
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      }],
    ],
    routes:routers
  }
  
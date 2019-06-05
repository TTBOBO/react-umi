import React from 'react';
import styles from './index.css';
import {connect} from 'dva'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class BasicLayout extends React.Component {
    componentDidMount() {
       
    }
    componentWillMount(){
        const {dispatch,route:{routes,path}} = this.props;
        dispatch({
            type:"menu/getMenuData",
            playload:{routes,path}
        })
    }

    render(){
        return (
            <LocaleProvider locale={zh_CN}>
                <div className={styles.container}>
                    {this.props.children}
                </div>
            </LocaleProvider>
        )
    };
}

export default connect(() => ({

}))(props =>(
    <BasicLayout {...props} />
))

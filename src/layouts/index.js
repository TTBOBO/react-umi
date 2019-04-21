import React from 'react';
import styles from './index.css';
import {connect} from 'dva'

class BasicLayout extends React.Component {
    componentDidMount() {
        const {dispatch,route:{routes,path}} = this.props;
        console.log(this.props)
        dispatch({
            type:"menu/getMenuData",
            playload:{routes,path}
        })
    }

    render(){
        return (
            <div className={styles.container}>
                {this.props.children}
            </div>
        )
    };
}

export default connect(() => ({

}))(props =>(
    <BasicLayout {...props} />
))

import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import { Icon } from 'antd';
import styles from './index.less'
const {Header} = Layout;
class BaseHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
        
    }
    componentDidMount() {
        // console.log(this.props)
    }
    onCollapsed(){
        const {collapsed,onCollapsed} = this.props;
        onCollapsed(!collapsed);
    }
    render() { 
        const {collapsed} = this.props;
        return ( 
            <Header className={styles.header}>
                <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={() => this.onCollapsed()} />
            </Header>
        );
    }
}
 
export default connect(({global}) => ({
    collapsed:global.collapsed
}))(props => (
    <BaseHeader {...props} />
));
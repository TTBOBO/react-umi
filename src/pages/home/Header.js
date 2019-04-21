import React from 'react';
import { connect } from 'dva';
import { Icon,Avatar,Layout,Menu, Dropdown } from 'antd';
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
    setMenu(){
        return (<Menu>
            <Menu.Item>
              个人中心
            </Menu.Item>
            <Menu.Item>
              退出登录
            </Menu.Item>
          </Menu>)
    }
    render() { 
        const {collapsed} = this.props;
        return ( 
            <Header className={styles.header}>
                <div className={styles.content}>
                    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={() => this.onCollapsed()} />
                    <div>
                        <Dropdown overlay={this.setMenu()} placement="bottomLeft">
                            <div className={styles.userCon}>
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <span className={styles.username}>普通用户</span>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        );
    }
}
 
export default connect(({global}) => ({
    collapsed:global.collapsed
}))(props => (
    <BaseHeader {...props} />
));
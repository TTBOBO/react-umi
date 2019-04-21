import React from 'react';
import { Menu, Icon ,Layout} from 'antd';
import styles from './index.less';
import { connect } from 'dva';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Sider} = Layout;

class SliderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            collapsed:false
         }
    }
    handleClick(e){
        
    }
    render() { 
        const {collapsed,menuData} = this.props;
        console.log(menuData)
        return ( 
            <Sider
                trigger={null}
                collapsible
                width={256}
                collapsed={collapsed}
                className={styles.slider}
                style={{
                    overflow: 'auto', height: '100vh'
                  }}
            >   
                <div className={styles.logo} />
                <Menu
                    onClick={this.handleClick}
                    style={{ width: collapsed ? 80 : 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
         );
    }
}
export default connect(({global,menu}) => ({
    collapsed:global.collapsed,
    menuData:menu.menuData
}))(props => (
    <SliderMenu {...props} />
));
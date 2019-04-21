import React from 'react';
import { Menu, Icon ,Layout} from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import Link from 'umi/link';
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
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

    getMenuItems = menusData => {
        if(!menusData) return [];
        return menusData.filter(item => item.name && !item.hideInMenu)
                .map(item => this.getSubMenuItems(item))
    }

    getSubMenuItems = item => {
        if(item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)){
            const {name} = item;
            return  (<SubMenu key={item.path} title={<span><Icon type={item.icon || 'bar-chart'} /><span>{name}</span></span>}>
                {this.getMenuItems(item.children)}
            </SubMenu>)
        }
        return (<Menu.Item key={item.path}>{this.getMenuItem(item)}</Menu.Item>)
    }

    getMenuItem = item =>  {
        const {name} = item;
        const itemPath = this.conversionPath(item.path);
        const { target } = item; //url地址target类型
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                <Icon type={item.icon || 'bar-chart'} />
                <span>{name}</span>
                </a>
            );
        }
        const {location} = this.props;
        return (
            <Link
              to={itemPath}
              target={target}
              replace={itemPath === location.pathname}
            >
              <Icon type={item.icon || 'bar-chart'} />
              <span>{name}</span>
            </Link>
        );
    }

    conversionPath = path => {
        if (path && path.indexOf('http') === 0) {
            return path;
        }
        return `/${path || ''}`.replace(/\/+/g, '/');
    };

    render() { 
        const {collapsed,menuData} = this.props;
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
                    {this.getMenuItems(menuData)}
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
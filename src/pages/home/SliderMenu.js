import React from 'react';
import { Menu, Icon ,Layout} from 'antd';
import styles from './index.less';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import Link from 'umi/link';
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
const {Sider} = Layout;

class SliderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            collapsed:false,
            openKeys:[]
         }
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

    isMainMenu = key => {
        const { menuData } = this.props;
        return menuData.some(item => {
          if (key) {
            return item.key === key || item.path === key;
          }
          return false;
        });
    };
    onOpenChange = openKeys => {
        console.log(openKeys)
        this.setState({
            openKeys
        })
        // const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        // console.log(openKeys,moreThanOne);
        // this.setState({
        //   openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
        // },() => {
        //     console.log(this.state.openKeys);
        // });
    }

    urlToList(url) {
        const urllist = url.split('/').filter(i => i);
        return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
    }
    getMenuMatches = (flatMenuKeys, path) => {
        console.log(flatMenuKeys)
        return flatMenuKeys.filter(item => {
            if (item) {
            return pathToRegexp(item).test(path);
            }
            return false;
        })
    }
        
    getSelectedMenuKeys = pathname => {
        const flatMenuKeys = this.getFlatMenuKeys(this.props.menuData)
        let data = this.urlToList(pathname).map(itemPath => {
            return this.getMenuMatches(flatMenuKeys, itemPath).pop()
        });
        return data;
    };
    getFlatMenuKeys = menuData => {
        let keys = [];
        menuData.forEach(item => {
          keys.push(item.path);
          if (item.children) {
            keys = keys.concat(this.getFlatMenuKeys(item.children));
          }
        });
        return keys;
      };
    

    render() { 
        const {collapsed,menuData,openKeys,location:{pathname}} = this.props;
        // let selectedKeys = this.getSelectedMenuKeys(pathname);
        // if (!selectedKeys.length && openKeys) {
        //   selectedKeys = [openKeys[openKeys.length - 1]];
        // }
        // const defaultProps = collapsed ? {} : {openKeys}
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
                    onOpenChange={this.onOpenChange}
                    style={{ width: collapsed ? 80 : 256 }}
                    selectedKeys={this.state.openKeys}
                    mode="inline"
                    theme="dark"
                    // {...defaultProps}
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
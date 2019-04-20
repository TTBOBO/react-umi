import React, { Suspense ,createContext } from 'react';
import { Layout } from 'antd';
import SliderMenu from './SliderMenu'
import Footer from './Footer'
import styles from './index.css';
const { Content,Header,Sider } = Layout;
const Context = createContext();
class BaseLayout  extends React.Component {
    componentDidMount() {
        // console.log(this.props)
    }
    getConText(){
        const {localtion} = this.props;
        return {
            localtion
        }
    }
    // const layout = 
    render() { 
        const {
            children
        } = this.props;
        return ( 
            <React.Fragment>
                <Context.Provider value={this.getConText()}>
                    <Layout className={styles.section}>
                        <SliderMenu />
                        <Layout>
                            <Header></Header>
                            <Content>
                                {children}
                            </Content>
                            <Footer/>
                        </Layout>
                    </Layout>
                </Context.Provider>
            </React.Fragment>
         );
    }
}
 
export default BaseLayout;
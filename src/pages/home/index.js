import React, { createContext } from 'react';
import { Layout } from 'antd';
import SliderMenu from './SliderMenu'
import Footer from './Footer'
import Header from './Header'
import styles from './index.css';
import { connect } from 'dva';

const { Content } = Layout;
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
    changeCollapsed(collapsed){
        // console.log(collapsed)
        const {dispatch} = this.props;
        dispatch({
            type:"global/changeLayoutCollapsed",
            playload:collapsed
        })
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
                        <SliderMenu {...this.props}/>
                        <Layout>
                            <Header onCollapsed={this.changeCollapsed.bind(this)}></Header>
                            <Content className={styles.contentModal}>
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


export default connect(() => (({})))(props => (
    <BaseLayout {...props} />
));
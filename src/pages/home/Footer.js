import React from 'react';
import { Layout } from 'antd';
const {Footer} = Layout;
class BaseFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        return ( 
            <Footer>Footer</Footer>
        );
    }
}
 
export default BaseFooter;
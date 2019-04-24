import React, { Component } from 'react';
import CustomForm from '@/components/CustomForm'
import { Input } from 'antd';
class Form extends Component {
    state = {
        formOption:{
            formList:[
                {label:"用户名",type:"input",value:"11",field:"username",render:this.renderDom()},
                {label:"密码",type:"password",value:"222",field:"password" ,validate: "required",}
            ],
        }
    }
    renderDom(){
        return (<Input placeholder="请输入用户名"></Input>)
    }
    getRefs(refs){
        this.refs = refs;
    }
    componentDidMount() {
    }
    render() {
        return (
            <CustomForm formOption={this.state.formOption} wrappedComponentRef={this.getRefs.bind(this)}/>
        )
    }
}

export default Form;
import React, { Component } from 'react';
import CustomForm from '@/components/CustomForm'
import { Input , Select } from 'antd';
const Option = Select.Option;
class Form extends Component {
    state = {
        formOption:{
            formList:[
                {label:"用户名",type:"number",value:"11",field:"username",render:false,addonBefore:"测试",suffix:"tip"},
                {label:"密码",type:"password",value:"222",field:"password" ,validate: "required"},
                {label:"时间范围",type:"select",value:'',field:"time" ,validate: "required",selectOption: {desc:"最新",asc:"最旧"}}
            ],
            labelCol:6
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
            <div style={{width:'300px'}}>
                <CustomForm formOption={this.state.formOption} wrappedComponentRef={this.getRefs.bind(this)} />
            </div>
            
        )
    }
}

export default Form;
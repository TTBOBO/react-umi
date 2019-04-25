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
                {label:"城市",type:"select",mode:"multiple",group:true,value:['desc'],field:"city" ,validate: "required",selectOption: {desc:"深圳",asc:"南昌"}},
                {label:"爱好",type:"checkbox",group:true,value:['desc'],field:"time" ,validate: "required",selectOption: {desc:"泡妞",asc:"唱歌"}},
                {label:"性别",type:"radio",group:true,value:'asc',field:"sex" ,validate: "required",selectOption: {desc:"男",asc:"女"}},
                {label:"打开状态",type:"switch",value:true,field:"status" ,validate: "required"},
                {label:"时间",type:"date",dateType:"range",value:['2018-4-25','2018-4-26'],field:"timestate" ,validate: "required",showTime:true,format:"YYYY/MM/DD",disabled:false}
            ],
            labelCol:6
        }
    }
    renderDom(){
        return (<Input placeholder="请输入用户名"></Input>)
    }
    getRefs(refs){
        this.refsForm = refs;
    }
    getData = (data) => {
        console.log(data);
        // console.log(this)
        if(data.password === '2222'){
            // console.log(1111);
            this.refsForm.setFieldsValue('username','3333');
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div style={{width:'300px'}}>
                <CustomForm formOption={this.state.formOption} wrappedComponentRef={this.getRefs.bind(this)} getData={this.getData} />
            </div>
            
        )
    }
}

export default Form;
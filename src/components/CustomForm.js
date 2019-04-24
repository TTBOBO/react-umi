import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import util from '@/assets/js/util.js'
class CustomForm extends Component {
    state = {
        validata:{}
    }
    componentDidMount() {}
    componentWillMount(){
        this.initvalidata();
    }
    initvalidata(){
        const {formList = [],validata = {}} = this.props.formOption;
        this.setState({
            validata:util.initValidate({
                valideDate:formList,
                CustomValidata:validata
            })
        });
    }
    async handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
            }
        });
    }
    resetFields(){
        this.props.form.resetFields();
    }
    getLabelConLayout(labelCol = 4){
        return {
            labelCol:{span:labelCol},
            wrapperCol:{span:(24-labelCol)}
        }
    }
    getItemRule(label){
        return this.state.validata[label] || []
    }
    getFormCol(){
        const {formList = [],labelCol} = this.props.formOption;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return formList.map((item,index) => {
            return (
                <Form.Item
                    key={'item_'+index}
                    label={item.label}
                    {...this.getLabelConLayout(labelCol)}
                >
                    {getFieldDecorator(item.field, {
                        initialValue:item.value || '',
                        rules: this.getItemRule(item.field),
                    })(
                        item.render ? (item.render) : this.getFormItemCon(item)
                    )}
                </Form.Item>
            )
        })
    }

    getFormItemCon(item){
        return (<Input prefix={item.icon || ""} placeholder={item.pla} />)
    }

    render() {
        const {labelAlign,labelCol} = this.props.formOption;
        return (
            <Form
                labelAlign={labelAlign || "right"}
                onSubmit={this.handleSubmit.bind(this)}
            >
                {this.getFormCol()}
                <Form.Item
                    {...this.getLabelConLayout(labelCol)}
                    wrapperCol={{span:20,offset:4}}
                >
                <Button type="primary"  htmlType="submit"> Log in </Button>
                <Button type="primary" onClick={this.resetFields.bind(this)}> 重置 </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default  Form.create({
    name: 'CustomForm' ,
    onFieldsChange(props, fields){
        // console.log(fields)
    },
    onValuesChange(_,values){
        // console.log(values)
    }
})(CustomForm);;
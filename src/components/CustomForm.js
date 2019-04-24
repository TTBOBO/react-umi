import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Button ,InputNumber , Select } from 'antd';
import util from '@/assets/js/util.js';
const Option = Select.Option;
class CustomForm extends Component {
    state = {
        validata:{},
        selectData:{}
    }
    componentDidMount() {}
    async componentWillMount(){
        await this.initvalidata();
    }
    async initvalidata(){
        const {formList = [],validata = {}} = this.props.formOption;
        this.setState({
            validata:util.initValidate({
                valideDate:formList,
                CustomValidata:validata
            }),
            selectData:await this.getSelectOption(formList)
        },() => {
            // console.log(this.state.selectData)
        });
        
    }

    async getSelectOption(formList = []){
        let selectData = {};
        formList.forEach((item,index) => {
            if(item.type === 'select' && !item.optionUrl){
                selectData[item.field] = util.getFormSelectOpt(item.selectOption)
            }
        })
        return selectData || [];
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

    getFormItemCon(item = {}){
        
        let itemDom = null;
        let inputType = ['input','password','textarea'];
        if(inputType.indexOf(item.type) != -1 || !item.type){
            return (<Input prefix={item.icon || ""} placeholder={item.allPla || (item.pla || `请输入${item.label}`)} disabled={item.disable} allowClear  suffix={this.getSuffix(item.suffix)} addonBefore={this.getBefore(item)}  addonAfter={this.getAfter(item)} />)
        }else if(item.type === 'number'){
            return ( <InputNumber formatter={item.formatter} disabled={item.disable} parser={item.parser} />)
        }else if(item.type === 'select'){
            const {selectData} = this.state;
            return (
                <Select style={{ width: 120 }} showArrow notFoundContent={item.neText} filterOption={this.filterOption} showSearch allowClear autoClearSearchValue  disabled={item.disable} mode={item.mode || ''} placeholder={item.allPla || (item.pla || `请选择${item.label}`)}>
                   {selectData[item.field] && selectData[item.field].map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
                </Select>
            )
        }
    }
    
    filterOption(input,option){
        return option.props.value === input || option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }

    getBefore(item){
        const {addonBefore} = item;
        if(!addonBefore) return null;
        return (
            typeof addonBefore === 'string' ? addonBefore : addonBefore
          )
    }
    getAfter(item){
        const {addonAfter} = item;
        if(!addonAfter) return null;
        return (
            typeof addonAfter === 'string' ? addonAfter : addonAfter
          )
    }
    getSuffix(suffix){
        if(!suffix) return null;
        return (
            typeof suffix === 'string' ? <Tooltip title={suffix}>
                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip> : suffix
          )
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
        console.log(values)
    }
})(CustomForm);;
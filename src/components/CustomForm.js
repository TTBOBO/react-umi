import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Button ,InputNumber, Select, Radio, Checkbox, Switch, DatePicker} from 'antd';
import util from '@/assets/js/util.js';
import moment from 'moment';
import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
class CustomForm extends Component {
    state = {
        validata:{},
        selectData:{},
        formData:{},
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
        let selectTypes = ['select','radio','checkbox'];
        formList.forEach((item,index) => {
            if((selectTypes.indexOf(item.type) != -1) && !item.optionUrl){
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
            let obj = {};
            obj.rules = this.getItemRule(item.field)
            if(item.type === 'switch')  obj.valuePropName = 'checked';
            obj.initialValue = (item.type === 'date' ? util.getDateMoment(item,moment) : item.value)
            return (
                <Form.Item
                    key={'item_'+index}
                    label={item.label}
                    {...this.getLabelConLayout(labelCol)}
                >
                    {getFieldDecorator(item.field, obj)(
                        item.render ? (item.render) : this.getFormItemCon(item)
                    )}
                </Form.Item>
            )
        })
    }
    changeNum = (val) => {
        
    }

    getFormItemCon(item = {}){
        let inputTypes = ['input','password','textarea'];
        if(inputTypes.indexOf(item.type) != -1 || !item.type){
            return (<Input prefix={item.icon || ""} placeholder={item.allPla || (item.pla || `请输入${item.label}`)} disabled={item.disable} allowClear  suffix={this.getSuffix(item.suffix)} addonBefore={this.getBefore(item)}  addonAfter={this.getAfter(item)} />)
        }else if(item.type === 'number'){
            return ( <InputNumber formatter={item.formatter} disabled={item.disable} parser={item.parser} />)
        }else if(item.type === 'select'){
            const {selectData} = this.state;
            const Option = Select.Option;
            return (
                <Select style={{ width: 120 }} onChange={this.changeNum} showArrow notFoundContent={item.neText} filterOption={this.filterOption} showSearch allowClear autoClearSearchValue  disabled={item.disable} mode={item.mode || ''} placeholder={item.allPla || (item.pla || `请选择${item.label}`)}>
                   {selectData[item.field] && selectData[item.field].map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
                </Select>
            )
        }else if(item.type === 'radio'){
            const {selectData} = this.state;
            const RadioGroup = Radio.Group;
            return (
                selectData[item.field] ? (item.group ? <RadioGroup>
                    {selectData[item.field].map(item => <Radio  key={item.value} value={item.value}>{item.label}</Radio>)}
                </RadioGroup> : <Radio disabled={item.disabled}>{selectData[item.field][0].label}</Radio>) : <span></span>
            )
        }else if(item.type === 'checkbox'){
            const CheckboxGroup = Checkbox.Group
            const {selectData} = this.state;
            return (
                selectData[item.field] ?  (item.group ? <CheckboxGroup options={ selectData[item.field]} /> :  <Checkbox  disabled={item.disabled}>{selectData[item.field][0].label} </Checkbox>) : <span></span>
            )
        }else if(item.type === 'switch'){
            return ( <Switch checkedChildren={item.checkText || "开"} unCheckedChildren={item.uncheckText || "关"} />)
        }else if(item.type === 'date'){
            const DateType = item.dateType || 'date';
            let DateCom = null;
            const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
            let obj = {
                placeholder:item.allPla || (item.pla || `请选择${item.label}`),
                size:item.size || 'small',
                disabled:item.disabled || false,
                showTime:item.showTime || false,
                format:item.format || null
            }
            switch (DateType){
                case 'date': 
                    DateCom = <DatePicker {...obj} />;
                    break;
                case 'month': 
                    DateCom = <MonthPicker  />;
                    break;
                case 'range': 
                    DateCom = <RangePicker  />;
                    break;
                case 'week': 
                    DateCom = <WeekPicker  />;
                    break;
                default: 
                    DateCom = <DatePicker  />;
            }

            return (DateCom)
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

    setFieldsValue(name,value){
        let obj = {[name]:value};
        // console.log(obj)
        console.log(this);
        this.props.form.mapPropsToFields({[name]:value});
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
       
        
        // util.debounce( props.getData,1000)(formData)
        // util.throttle( props.getData,2000,2000)(formData);
        
        // let obj = {};
        // for(var i in fields){
        //     obj[[fields[i].name]] = fields[i].value;
        // }
        // this.setState({
        //     formData:Object.assign({},this.state.formData,obj)
        // },() => {
        //     console.log(this.state.formData)
        // })
    },
    // mapPropsToFields(props){
    //     console.log(111)
    // },  
    onValuesChange(props,values){
        // console.log(props)
        let formData = props.form.getFieldsValue();
        props.getData && props.getData(formData);
    }
})(CustomForm);;
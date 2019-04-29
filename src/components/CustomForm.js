import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon ,InputNumber, Select, Radio, Checkbox, Switch, DatePicker} from 'antd';
import util from '@/assets/js/util.js';
import moment from 'moment';
import 'moment/locale/zh-cn';
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
        });
    }

    //获取下拉框  checkbox  radio  组数据
    async getSelectOption(formList = []){
        let selectData = {};
        let selectTypes = ['select','radio','checkbox'];
        let promises = [],optionsArr = [];
        formList.forEach((item,index) => {
            if((selectTypes.indexOf(item.type) !== -1) && !item.optionUrl){
                selectData[item.field] = util.getFormSelectOpt(item.selectOption)
            }else if((selectTypes.indexOf(item.type) !== -1) && item.optionUrl){
                optionsArr = [];
                promises.push(React.$ajaxGet(item.optionUrl,item.selectPar,item.dataType || 3).then(res => {
                    res.result[item.urlkey].forEach((_item) => {
                        (item.colKey && item.colName ) ? optionsArr.push({value: _item[item.colKey],label: _item[item.colName]}):optionsArr.push({value: _item,label: _item});
                    });
                    if(item.selectOption)
                        optionsArr = [...util.getFormSelectOpt(item.selectOption),...optionsArr];  //默认的数据放前面，接口数据放后面
                    selectData[item.field] = optionsArr;
                }))
            }
        })
        await Promise.all(promises);
        return selectData || {};
    }
    async validate(){
        return new Promise((resolve, reject) => {
            this.props.form.validateFields((err, values) => {
                !err ? resolve(values) : reject(err);
            });
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
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
        return this.state.validata[label] || [];
    }

    getFormCol(){
        const {formList = [],labelCol,layout} = this.props.formOption;
        const { getFieldDecorator } = this.props.form;
        return formList.map((item,index) => {
            if(item.hidden) return "";
            let obj = {};
            obj.rules = this.getItemRule(item.field);
            if(item.type === 'switch')  obj.valuePropName = 'checked';
            obj.initialValue = (item.type === 'date' ? util.getDateMoment(item,moment) : item.value);
            if(item.type === 'upload') obj.getValueFromEvent = (e) => Array.isArray(e) ? e : (e && e.fileList);
            if(item.type === 'custom') obj.getValueFromEvent = (e) => e;
            return (
                <Form.Item
                    style={{width:layout === 'inline' ? (item.width ?  item.width+'px' : "200px") : ''}}
                    key={'item_'+index}
                    label={item.label}
                    {...this.getLabelConLayout(labelCol)}
                >
                    {getFieldDecorator(item.field, obj)(
                        item.render ? item.render(item) : this.getFormItemCon(item)
                    )}
                </Form.Item>
            )
        })
    }
    changeNum = (item,val,dateStr) => {
        //如果父组件有监听的话返回对应的数据
        if(this.props['On'+item.field]){
            const {type,group} = item;
            let inputTypes = ['input','password','radio'];
            if((type === 'checkbox' && !group)){
                val = val.target.checked; 
            }else if(inputTypes.indexOf(type) !== -1) {
                val = val.target.value; 
            }
            this.props['On'+item.field](val);
        }
    }

    // getFormItemCon1(item = {}){
    //     let inputTypes = ['input','password'];
    //     let obj = JSON.parse(JSON.stringify(item))
    //     const {type,icon,allPla,pla,label,disable,suffix,formatter,parser,field,neText,disabled,mode,group,uncheckText,checkText,dateType,size,showTime,format} = obj;
    //     if(inputTypes.indexOf(type) != -1 || type){
    //         return (<Input prefix={icon || ""}  onChange={this.changeNum.bind(this,item)} type={type} placeholder={allPla || (pla || `请输入${label}`)} disabled={disable} allowClear  suffix={this.getSuffix(suffix)} addonBefore={this.getBefore(item)}  addonAfter={this.getAfter(item)} />)
    //     }else if(type === 'number'){
    //         return ( <InputNumber onChange={this.changeNum.bind(this,item)} formatter={formatter} disabled={disable} parser={parser} />)
    //     }else if(type === 'select'){
    //         const {selectData} = this.state;
    //         const Option = Select.Option;
    //         return (
    //             <Select style={{ width: 120 }} onChange={this.changeNum.bind(this,item)} showArrow notFoundContent={neText} filterOption={this.filterOption} showSearch allowClear autoClearSearchValue  disabled={disable} mode={mode || ''} placeholder={allPla || (pla || `请选择${label}`)}>
    //                {selectData[field] && selectData[field].map(_item => <Option key={_item.value} value={_item.value}>{_item.label}</Option>)}
    //             </Select>
    //         )
    //     }else if(type === 'radio'){
    //         const {selectData} = this.state;
    //         const RadioGroup = Radio.Group;
    //         return (
    //             // selectData[field] ? (group ? <RadioGroup onChange={this.changeNum.bind(this,item)}>
    //             //     {selectData[field].map(_item => <Radio  key={_item.value} value={_item.value}>{_item.label}</Radio>)}
    //             // </RadioGroup> : <Radio disabled={disabled}>{selectData[field][0].label}</Radio>) : <span></span>
    //              selectData[item.field] ? (item.group ? <RadioGroup onChange={this.changeNum.bind(this,item)}>
    //              {selectData[item.field].map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)}
    //          </RadioGroup> : <Radio disabled={item.disabled}>{selectData[item.field][0].label}</Radio>) : <span></span>
    //         )
    //     }else if(type === 'checkbox'){
    //         const CheckboxGroup = Checkbox.Group;
    //         const {selectData} = this.state;
    //         return (
    //             selectData[field] ?  (group ? <CheckboxGroup options={ selectData[field]} onChange={this.changeNum.bind(this,item)}/> :  <Checkbox  onChange={this.changeNum.bind(this,item)}  disabled={disabled}>{selectData[field][0].label} </Checkbox>) : <span></span>
    //         )
    //     }else if(type === 'switch'){
    //         return ( <Switch onChange={this.changeNum.bind(this,item)} checkedChildren={checkText || "开"} unCheckedChildren={uncheckText || "关"} />)
    //     }else if(type === 'date'){
    //         const DateType = dateType || 'date';
    //         let DateCom = null;
    //         const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    //         let obj = {
    //             placeholder:allPla || (pla || `请选择${label}`),
    //             size:size || 'small',
    //             disabled:disabled || false,
    //             showTime:showTime || false,
    //             format:format || null,
    //             onChange:this.changeNum.bind(this,item)
    //         }
    //         switch (DateType){
    //             case 'date': 
    //                 DateCom = <DatePicker {...obj}  />;
    //                 break;
    //             case 'month': 
    //                 DateCom = <MonthPicker {...obj} />;
    //                 break;
    //             case 'range': 
    //                 DateCom = <RangePicker {...obj} />;
    //                 break;
    //             case 'week': 
    //                 DateCom = <WeekPicker {...obj} />;
    //                 break;
    //             default: 
    //                 DateCom = <DatePicker {...obj} />;
    //         }
    //         return (DateCom)
    //     }
    // }

    getFormItemCon(item = {}){
        let inputTypes = ['input','password'];
        if(inputTypes.indexOf(item.type) !== -1 || !item.type){
            return (<Input prefix={item.icon || ""}  onChange={this.changeNum.bind(this,item)} type={item.type} placeholder={item.allPla || (item.pla || `请输入${item.label}`)} disabled={item.disable} allowClear  suffix={this.getSuffix(item.suffix)} addonBefore={this.getBefore(item)}  addonAfter={this.getAfter(item)} />);
        }else if(item.type === 'number'){
            return ( <InputNumber onChange={this.changeNum.bind(this,item)} formatter={item.formatter} disabled={item.disable} parser={item.parser} />);
        }else if(item.type === 'select'){
            const {selectData} = this.state;
            const Option = Select.Option;
            return (
                <Select style={{ width: 120 }} onChange={this.changeNum.bind(this,item)} showArrow notFoundContent={item.neText} filterOption={this.filterOption} showSearch allowClear autoClearSearchValue  disabled={item.disable} mode={item.mode || ''} placeholder={item.allPla || (item.pla || `请选择${item.label}`)}>
                   {selectData[item.field] && selectData[item.field].map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
                </Select>
            );
        }else if(item.type === 'radio'){
            const {selectData} = this.state;
            const RadioGroup = Radio.Group;
            return (
                selectData[item.field] ? (item.group ? <RadioGroup onChange={this.changeNum.bind(this,item)}>
                    {selectData[item.field].map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)}
                </RadioGroup> : <Radio disabled={item.disabled}>{selectData[item.field][0].label}</Radio>) : <span></span>
            );
        }else if(item.type === 'checkbox'){
            const CheckboxGroup = Checkbox.Group
            const {selectData} = this.state;
            return (
                selectData[item.field] ?  (item.group ? <CheckboxGroup options={ selectData[item.field]} onChange={this.changeNum.bind(this,item)}/> :  <Checkbox  onChange={this.changeNum.bind(this,item)}  disabled={item.disabled}>{selectData[item.field][0].label} </Checkbox>) : <span></span>
            );
        }else if(item.type === 'switch'){
            return ( <Switch onChange={this.changeNum.bind(this,item)} checkedChildren={item.checkText || "开"} unCheckedChildren={item.uncheckText || "关"} />)
        }else if(item.type === 'date'){
            const DateType = item.dateType || 'date';
            let DateCom = null;
            const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
            let obj = {
                placeholder:item.allPla || (item.pla || `请选择${item.label}`),
                size:item.size || 'small',
                disabled:item.disabled || false,
                showTime:item.showTime || false,
                format:item.format || null,
                onChange:this.changeNum.bind(this,item)
            };
            switch (DateType){
                case 'date': 
                    DateCom = <DatePicker {...obj}  />;
                    break;
                case 'month': 
                    DateCom = <MonthPicker {...obj} />;
                    break;
                case 'range': 
                    DateCom = <RangePicker {...obj} />;
                    break;
                case 'week': 
                    DateCom = <WeekPicker {...obj} />;
                    break;
                default: 
                    DateCom = <DatePicker {...obj} />;
            }
            return (DateCom);
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
          );
    }
    getAfter(item){
        const {addonAfter} = item;
        if(!addonAfter) return null;
        return (
            typeof addonAfter === 'string' ? addonAfter : addonAfter
          );
    }
    getSuffix(suffix){
        if(!suffix) return null;
        return (
            typeof suffix === 'string' ? <Tooltip title={suffix}>
                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip> : suffix
          );
    }

    render() {
        const {labelAlign,labelCol,layout} = this.props.formOption;
        return (
            <Form
                labelAlign={labelAlign || "right"}
                layout={layout || 'horizontal'}
                onSubmit={this.handleSubmit.bind(this)}
            >
                {this.getFormCol()}
                {this.props.children && <Form.Item
                    {...this.getLabelConLayout(labelCol)}
                    wrapperCol = {{offset:labelCol}}
                >
                 {this.props.children}
                </Form.Item>}
            </Form>
        );
    }
}

export default  Form.create({
    name: 'CustomForm' ,
    onFieldsChange(props, fields){}, 
    onValuesChange(props,values){
        let formData = props.form.getFieldsValue();
        props.getData && props.getData(Object.assign({},formData,values));
    }
})(CustomForm);
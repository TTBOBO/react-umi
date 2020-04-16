import React, { Component } from 'react';
import CustomForm from '@/components/CustomForm';
import { Input, Button, Upload, Icon } from 'antd';
import Test from './test';
// const Option = Select.Option;
class Form extends Component {
  state = {};
  upload(item = {}) {
    return (
      <Test value={item.value} />
      // <div>1313</div>
      // <Upload name="files" action="/upload.do">
      //     <Button>
      //     <Icon type="upload" /> Click to Upload
      //     </Button>
      // </Upload>
    );
  }
  renderDom() {
    return <Input placeholder="请输入用户名"></Input>;
  }
  getRefs(refs) {
    this.refsForm = refs;
  }
  getData(data) {
    // if(data.timestate){
    //     console.log(data.timestate.format('MM-YYYY'))
    // }
  }
  changeCity(val) {
    this.refsForm.props.form.setFieldsValue({ username: val ? '333' : '444' });
  }
  componentWillMount() {
    console.log(this.upload());
    this.setState({
      formOption: {
        formList: [
          {
            label: '用户名',
            type: 'number',
            value: '11',
            field: 'username',
            hidden: false,
            render: false,
            addonBefore: '测试',
            suffix: 'tip',
          },
          {
            label: '密码',
            type: 'password',
            value: '222',
            field: 'password',
            validate: 'required',
          },
          {
            label: '城市',
            type: 'select',
            mode: '',
            group: true,
            value: 'desc',
            field: 'city',
            validate: 'required',
            selectOption: { desc: '深圳', asc: '南昌' },
            // optionUrl:"qsm_ceph",dataType:5,urlkey:"ceph",colKey:"value",colName:"name",selectPar:{user:"chainyang",type:"project",size:"200"}
          },
          {
            label: '爱好',
            type: 'checkbox',
            group: false,
            value: ['desc'],
            field: 'time',
            validate: 'required',
            selectOption: { desc: '泡妞', asc: '唱歌' },
          },
          {
            label: '性别',
            type: 'radio',
            group: true,
            value: 'nan',
            field: 'sex',
            validate: 'required',
            selectOption: { nan: '男', nv: '女' },
          },
          { label: '打开状态', type: 'switch', value: true, field: 'status', validate: 'required' },
          {
            label: '时间',
            type: 'date',
            dateType: 'month',
            value: '',
            disabled: false,
            field: 'timestate',
            validate: 'required',
            showTime: false,
            format: 'YYYY-MM',
          },
          {
            label: '上传文件',
            type: 'custom',
            value: '1',
            field: 'upload',
            validate: '',
            render: this.upload,
          },
          // value:['2018-4-25','2018-4-26']
        ],
        labelCol: 3,
        layout: '',
      },
    });
  }
  componentDidMount() {
    // setTimeout(() => {
    //     this.setState({
    //         'formOption.formList':this.state.formOption.formList.map((item,index) =>{
    //             if(index == 1){
    //                 item.hidden = true;
    //             }
    //             return item;
    //         })
    //     })
    // },10000)
    // setTimeout(() => {
    //     this.setState({
    //         'formOption.formList':this.state.formOption.formList.map((item,index) =>{
    //             if(index == 1){
    //                 item.hidden = false;
    //             }
    //             return item;
    //         })
    //     })
    // },20000)
    // console.log(React)
    // React.$ajaxGet('test',{},4).then(res => {
    //     // console.log(res);
    // })
  }
  async submit() {
    let res = await this.refsForm.validate();
    if (res) {
      console.log(res);
    }
  }
  render() {
    return (
      <div style={{ width: '1000px' }}>
        <CustomForm
          formOption={this.state.formOption}
          wrappedComponentRef={form => this.getRefs(form)}
          getData={this.getData.bind(this)}
          Oncity={this.changeCity.bind(this)}
        >
          <Button type="primary" style={{ marginRight: '10px' }} onClick={this.submit.bind(this)}>
            {' '}
            提交{' '}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.refsForm.resetFields();
            }}
          >
            {' '}
            重置{' '}
          </Button>
        </CustomForm>
      </div>
    );
  }
}

export default Form;

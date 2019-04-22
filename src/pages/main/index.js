import React, { Component } from 'react'
import CustomTable from '@/components/CustomTable'
import { Tooltip ,Icon} from 'antd';
export default class index extends Component {
    
    state = {
        optionData:null
    }
    textRender = (tag,record,index) => {
        return (
            <div style={{color:"red"}}>{record.name}{index}</div>
        )
    }
    renderHeader = (props) => {
        return (
           <span>
               姓名
                <Tooltip placement="top" title={"text"}>
                    <Icon type="question-circle" />
                </Tooltip>
           </span>
        )
    }
    componentWillMount(){
        this.setState({
            optionData:{
                selection:{},
                rowKey:"age",
                columns:[
                    {title: this.renderHeader,prop: 'name',render:this.textRender,sort:true,width:200,align:"left"},
                    {title: '年龄',prop: 'age'},
                    {title: '住址',prop: 'address'}
                ]
            }
        })
    }
    render() {
        return (
            <div>
                <CustomTable optionData={this.state.optionData}/>
            </div>
        )
    }
}

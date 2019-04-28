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
                // expanded:true,
                // hidePage:true,
                rowKey:"key",
                scroll:{x:1000},
                search: {
                    page: 1,  //页数
                    size: 10,  //每页多少条
                },
                columns:[
                    {title: this.renderHeader,prop: 'name',render:this.textRender,sort:true,width:200,align:"left",children:[
                       
                    ]},
                    {title: '年龄',prop: 'age',sort:true,defaultSortOrder:'descend'},
                    {title: '住址',prop: 'address',search:"name",type:"date",dateType:"range"},
                    {title: '性别',prop: 'sex',width:300},
                    {title: 'lev',prop: 'lev'},
                ],
                toolEvent:[{title:"添加",type:"primary",disabled:false,onClick:(record)=>{console.log(record);}}],  //,judgement_con:"data.key == '1'"
                topBtnGroup: [
                    { name: "查看任务配置", type: "primary", emit:"viewTask", icon: "plus", hasSel: 0, hasMore: ''},
                    { name: "复制任务配置", type: "primary", emit:"cloneTask", icon: "plus", hasSel: 1, hasMore: "",noloading:true },
                    { name: "批量终止", type: "danger", emit:"pldel", icon: "plus", hasSel: 1, hasMore: 'more'},
                ]
            }
        })
    }
    render() {
        return (
            // style={{width:'900px'}}
            <div >
                <CustomTable optionData={this.state.optionData} RenderExpand={(params) => {console.log(params)}}/>
            </div>
        )
    }
}

import React, { Component } from 'react'
import CustomTable from '@/components/CustomTable'
import { Tooltip ,Icon} from 'antd';
export default class index extends Component {
    
    state = {
        optionData:null,
        dataSource:[
            {
                key: 'cephfs-sz',
                name: 'John Brown sr.',
                age: 60,
                address: 'New York No. 1 Lake Park',
                children: [{
                  key: 11,
                  name: 'John Brown',
                  age: 42,
                  address: 'New York No. 2 Lake Park',
                }, {
                  key: 12,
                  name: 'John Brown jr.',
                  age: 30,
                  address: 'New York No. 3 Lake Park',
                  children: [{
                    key: 121,
                    name: 'Jimmy Brown',
                    age: 16,
                    address: 'New York No. 3 Lake Park',
                  }],
                }, {
                  key: 3,
                  name: 'Jim Green sr.',
                  age: 72,
                  address: 'London No. 1 Lake Park',
                  children: [{
                    key: 131,
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park',
                    children: [{
                      key: 1311,
                      name: 'Jim Green jr.',
                      age: 25,
                      address: 'London No. 3 Lake Park',
                    }, {
                      key: 1312,
                      name: 'Jimmy Green sr.',
                      age: 18,
                      address: 'London No. 4 Lake Park',
                    }],
                  }],
                }],
              }, {
                key: 'cephfs-sz-ssd',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
              }
        ]
    }
    textRender = ({record}) => (<span style={{color:"red"}}>{record.name}{index}</span>)
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
                baseUrl:"kihan_job",
                urlType:5,
                selection:{},
                // expanded:true,
                // hidePage:true,
                rowKey:"key",
                scroll:{x:1000},
                search: {
                    // page: 1,  //页数
                    // size: 10,  //每页多少条
                    sort_type:"desc",
                    sort:'name',
                    user_name:"loongzhang"
                },
                columns:[
                    {title: this.renderHeader,prop: 'name',render:this.textRender,sort:true,width:200,align:"left",children:[
                        // {title: '年龄',prop: 'age',sort:true,defaultSortOrder:'descend',resize:true},
                        // {title: '住址',prop: 'address',search:"name",type:""},
                        
                    ]},
                    {title: '年龄',prop: 'age',sort:true,defaultSortOrder:'descend',resize:true,width:200},
                        {title: '住址',prop: 'address',search:"name",type:""},
                    {title: 'key',prop: 'key',search:"key",value:'2',type:"select",selectOption: {1:"测试1",2:"测试2"},
                        optionUrl:"qsm_ceph",dataType:5,urlkey:"ceph",colKey:"value",colName:"name",selectPar:{user:"chainyang",type:"project",size:"200"}
                        }
                    // {title: '年龄',prop: 'age',width:300},
                    // {title: '地址',prop: 'address'},
                ],
                toolEvent:[{title:"添加",type:"primary",disabled:false,onClick:(record)=>{console.log(record);}}],  //,judgement_con:"data.key == '1'"
                topBtnGroup: [
                    { name: "查看任务配置", type: "primary", emit:"viewTask", icon: "plus", hasSel: 1, hasMore: '',onClick:this.show.bind(this)},
                    { name: "复制任务配置", type: "primary", emit:"cloneTask", icon: "plus", hasSel: 1, hasMore: "",noloading:true },
                    { name: "批量终止", type: "danger", emit:"pldel", icon: "plus", hasSel: 1, hasMore: 'more'},
                ]
            }
        })
    }
    show({selectItem}){
        console.log(selectItem)
    }
    render() {
        return (
            // style={{width:'900px'}}
            <div >
                <CustomTable optionData={this.state.optionData} dataSource={this.state.dataSource} RenderExpand={(params) => {return <div>1111</div>}}/>
            </div>
        )
    }
}

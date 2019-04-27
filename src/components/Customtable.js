import React, { Component } from 'react'
import {Table,Button} from 'antd';
import styles from './index.less'
import CustomForm from './CustomForm';
const { Column, ColumnGroup } = Table;

export default class Customtable extends Component {
    state = {
        current:1,
        pageSize:10,
        total:50,
        topBtnGroup:[],  //顶部按钮组
        selectItem:[],  //选中的地址
        searchList:[],
    }
    componentWillMount(){
        const {optionData:{search:{page,size},columns}} = this.props;
        const {current,pageSize} = this.state;
        this.setState({
            current:page || current,
            pageSize:size || pageSize,
            topBtnGroup:this.props.optionData.topBtnGroup.map((item) =>{
                item.disabled = this.getDisStatus(item);
                return item
            }),
            searchList:this.getSearchList(this.initSearch(columns))  //初始化搜索列表
        })
    }
    getSearchList(data){
        let list = [];
        data.forEach((item) => {
            list.push({
                label:item.title,
                field:item.prop,
                value:item.value || '',
                type:item.type,
                dateType:item.type,
            })
        })
        return list;

    }
    initSearch(columns){
        let arr = [];
        columns.forEach(item => {
            if(item.search && !item.hidden){
                arr.push(item);
            }
            if(item.children)
            arr.push(...this.initSearch(item.children));
        })
        return arr;
    }
    async selectionChange(selectedRowKeys,selectedRows){
        await this.setState({selectItem:selectedRowKeys});
        this.setState({
            topBtnGroup:this.state.topBtnGroup.map((item,index) => {
                if(!item.hasSel)
                    return item;
                item.disabled = this.getDisStatus(item);
                return item
            })
        })
        this.props.selectionChange && this.props.selectionChange({selectedRowKeys,selectedRows})
    }
    getDisStatus(item){
        const {selectItem} = this.state;
        let res = false;
        if(item.hasSel && item.hasMore === 'more'){  //选中数 大于等于 item.hasSel
            res = selectItem.length >= item.hasSel  ? false : true;
        }else if(item.hasSel && !item.hasMore){   //选中数 等于 item.hasSel
            res = item.hasSel === selectItem.length ? false : true;
        }else if(item.hasSel && item.hasMore === 'less'){ //选中数 小于等于 item.hasSel
            res = selectItem.length <= item.hasSel && selectItem.length > 0  ? false : true;
        }
        return res;
    }
    getSelection(selectionPar){
        return {
            columnWidth:selectionPar.width || 60,
            fixed:false,
            onChange:this.selectionChange.bind(this),  //选择框选择回调
            type:selectionPar.type || "checkbox"
        };
    }
    getColumn(columnList = []){
        return (
            columnList.map((item,index) => {
                const renderHtml = (item.children && item.children.length) ? (<ColumnGroup key={item.title} title={item.title}>{this.getColumn(item.children)}</ColumnGroup>) :
                    <Column 
                        title={item.title} 
                        align={item.align || 'center'} 
                        className={item.className}
                        dataIndex={item.prop} 
                        key={item.prop}
                        sorter={item.sort}
                        defaultSortOrder={item.defaultSortOrder}
                        fixed={item.fixed || false}
                        sort={item.sort}
                        render={item.render} 
                        width={item.width}
                    />
                return (renderHtml)
            })
        )
    }
    getToolColumn(text, record){
        const {optionData} = this.props; 
        if(!optionData.toolEvent || (optionData.toolEvent && optionData.toolEvent.length === 0)){
            return '';
        }
        return (
            optionData.toolEvent.map((item,index) => {
                return (
                    <Button disabled={this.getBtnStatus(record,item)} onClick={item.onClick && item.onClick.bind(this,record)} key={'btn_'+index} size="small" type={item.type}>
                         {item.handStatus ? (item.handStatus.title[record[item.handStatus.obj]] || item.title) : item.title }
                    </Button>
                )
            })
        )
    }
    getBtnStatus(data,item){
        return item.judgement_con ? eval(item.judgement_con) : false;
    }
    getExpand = (record, index, indent, expanded) => {
        const {RenderExpand} = this.props; 
          return (<div style={{padding:'5px'}}>
                {RenderExpand && RenderExpand({record, index, indent, expanded})}
           </div>)
    }
    getPagination() {
        const { optionData } = this.props;
        const {current,total,pageSize} = this.state;
        return optionData.hidePage ? false : {
            current,
            defaultCurrent:1,
            pageSize,
            showSizeChanger:true,
            total,
            showQuickJumper:true,
            onChange:this.changePageAndPageSize.bind(this),
            onShowSizeChange:this.changePageAndPageSize.bind(this),
            showTotal:() => {
                return ("共"+total+"条")
            }
        }
    }
    getTopBtn(){
        return (
            this.state.topBtnGroup.map((item,index) => {
                return (
                    <Button disabled={item.disabled}  className={styles.btn} type={item.type || "primary"} key={index} onClick={item.onClick && item.onClick({item,index})}>
                       {item.name}
                    </Button>
                )
            })
        )
    }
    changePageAndPageSize(current, pageSize){
        this.setState({pageSize,current})
    }
    changeTable(pagination,filters,sorter){
        console.log(pagination,filters,sorter)
    }
    reloadTable(){
        
    }
    getSearchCode(data){
        // console.log(data);
    }
    getRefs(refs){
        this.refsForm = refs;
    }
    async search(){
        let res = await this.refsForm.validate();
        if(res){
            console.log(res);
        }
    }
    render() {
        const {optionData} = this.props; 
        const selsctionStatus = ( optionData.selection ? this.getSelection(optionData.selection) : null);
        const dataSource = [
            {
                key: 1,
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
                  key: 13,
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
                key: 2,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
              }
        ];
        const searchOption = {
            formList:this.state.searchList,
            layout:'inline',
            labelCol:6
        }
        return (
            <div className={styles.tableContainer}>
                {   
                    <div>
                        {searchOption.formList.length && <CustomForm wrappedComponentRef={(form) => this.getRefs(form)} getData={this.getSearchCode.bind(this)} formOption={searchOption} >
                            <Button type="primary" style={{marginRight:'10px'}}  onClick={this.search.bind(this)}> 查询 </Button>
                        </CustomForm>}
                        <div className={styles.tabbelTopBtn}>{this.getTopBtn()}</div>
                        <Table dataSource={dataSource} onChange={this.changeTable.bind(this)} rowKey={optionData.rowKey} pagination={this.getPagination()}  expandedRowRender={optionData.expanded ? this.getExpand.bind(this) : null}  bordered={true} size={optionData.size || 'small'} rowSelection={selsctionStatus}
                            showHeader={optionData.showHeader || true}
                            locale={{emptyText:"暂无数据"}}
                            scroll={optionData.scroll || {}}
                        >
                            {this.getColumn(optionData.columns)}
                            {optionData.toolEvent && <Column align="center" title="操作" width={optionData.toolEventWidth || 100} key="action" render={this.getToolColumn.bind(this)} >
                            </Column>}
                        </Table>
                    </div>
                     
                }
            </div>
        )
    }
}

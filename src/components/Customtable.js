import React, { Component } from 'react'
import {Table,Button} from 'antd';
import styles from './index.less'
import CustomForm from './CustomForm';
import util from '@/assets/js/util.js';
import { Resizable } from 'react-resizable';
import RenderDom from './Render';
const { Column, ColumnGroup } = Table;

export default class Customtable extends Component {
    state = {
        page:1,
        size:10,
        total:50,
        topBtnGroup:[],  //顶部按钮组
        selectItem:[],  //选中的地址
        searchList:[],
        optionGroup:{},  //存储所有枚举数据
        tableFilters:{},  //存放当前table搜索条件
        columns:[],
    }
    async componentWillMount(){
        const {optionData:{columns}} = this.props;
        const {page,size} = this.state;
        // console.log(this.props.optionData.columns)
        //     this.props.optionData.columns = []
        //     console.log(this.props.optionData.columns)
        this.setState({
            // current:page || current,
            // pageSize:size || pageSize,
            topBtnGroup:this.props.optionData.topBtnGroup.map((item) =>{
                item.disabled = this.getDisStatus(item);
                return item
            }),
            columns,
            searchList:await this.getSearchList(this.initSearch(columns)),  //初始化搜索列表
            tableFilters:Object.assign({},{page,size},this.props.optionData.search)
        },() => this.reloadTable())
    }
    async getSearchList(data){
        let list = [];
        let selectTypes = ['select','radio','checkbox'];
        let promises = [],optionsArr = [];
        data.forEach((item) => {
            let obj = {
                label:item.title,
                field:item.prop,
                value:item.value || '',
                type:item.type,
                dateType:item.dateType,
            }
            if((selectTypes.indexOf(item.type) !== -1) && !item.optionUrl){
                obj.selectOption = util.getFormSelectOpt(item.selectOption);
                this.setState({
                    optionGroup:Object.assign({},this.state.optionGroup,{[item.prop] : item.selectOption})
                })
            }else if((selectTypes.indexOf(item.type) !== -1) && item.optionUrl){
                optionsArr = [];
                promises.push(React.$ajaxGet(item.optionUrl,item.selectPar,item.dataType || 3).then(res => {
                    res.result[item.urlkey].forEach((_item) => {
                        (item.colKey && item.colName ) ? optionsArr.push({value: _item[item.colKey],label: _item[item.colName]}):optionsArr.push({value: _item,label: _item});
                    });
                    if(item.selectOption)
                        optionsArr = [...util.getFormSelectOpt(item.selectOption),...optionsArr];  //默认的数据放前面，接口数据放后面
                        obj.selectOption = optionsArr;
                        this.setState({
                            optionGroup:Object.assign({},this.state.optionGroup,{[item.prop] :util.getSelectReverse( optionsArr )})
                        })
                }))
            }

            list.push(obj)
        })
        await Promise.all(promises);
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
        await this.setState({selectItem:selectedRows});
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
        console.log(columnList)
        return (
            columnList.map((item,index) => {
                let columnOption = {
                    title:item.title,
                    align:item.align || 'center',
                    className:item.className,
                    dataIndex:item.prop,
                    resize:item.resize,
                    key:item.prop,
                    sorter:item.sort  || null,
                    defaultSortOrder:item.defaultSortOrder || null,
                    fixed:item.fixed || null,
                    width:item.width,
                }
                    const {optionGroup} = this.state;
                    console.log(item.type)
                    // columnOption.render = () =><span>111</span>
                    if(item.type === 'select'){
                        columnOption.render =  (text, record, index) => {
                            return (<span>{optionGroup[item.prop] && optionGroup[item.prop][text]}</span>)
                        };
                    }else if(item.render){
                        columnOption.render =  (text, record, index) => {
                            return (item.render(text, record, index,optionGroup))
                        };
                        // const renderDom = item.render({item,text, record, index,optionGroup});
                        // console.log(item.render(item,text, record, index,optionGroup))
                        // columnOption.render = item.render.bind(this,optionGroup)
                        // return (<RenderDom renderDom={item.render({text, record, index,optionGroup})}>
                        //     {/* {item.render({item,text, record, index,optionGroup})} */}
                        // </RenderDom>)
                        
                    }
                
                console.log(columnOption)
                
                const renderHtml = (item.children && item.children.length) ? (<ColumnGroup key={item.title} title={item.title}>{this.getColumn(item.children)}</ColumnGroup>) :
                    <Column 
                        {...columnOption}
                        // title={item.title} 
                        // align={item.align || 'center'} 
                        // className={item.className}
                        // dataIndex={item.prop} 
                        // resize={item.resize}
                        // key={item.prop}
                        // sorter={item.sort  || null}
                        // defaultSortOrder={item.defaultSortOrder || null}
                        // fixed={item.fixed || null}
                        // render={this.getRender.bind(this,item)} 
                        // width={item.width}
                        // onHeaderCell={this.onHeaderCell.bind(this,index)}
                    />
                return (renderHtml)
            })
        )
    }

    ResizeableTitle = (props) => {
        const { onResize, width, resize,...restProps } = props;
        // console.log(resize)
        if (!width || !resize) {
          return <th {...restProps} />;
        }
        // debugger
        return (
          <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps}  className="resize"/>
          </Resizable>
        );
      };
    onHeaderCell(index,column){
        let obj = {
            width: column.width,
            resize:column.resize||false
        }
        if(column.resize) obj.onResize = this.handleResize(index)
        return obj 
    }

    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
            ...nextColumns[index],
            width: size.width,
            };
            return { columns: nextColumns };
        });
    };

    getRender(item,text, record, index){
        const {optionGroup} = this.state;
        if(item.type === 'select'){
            return <span>{optionGroup[item.prop] && optionGroup[item.prop][text]}</span>;
        }else if(item.render){
            // const renderDom = item.render({item,text, record, index,optionGroup});
            console.log(item.render(item,text, record, index,optionGroup))
            return item.render(item,text, record, index,optionGroup)
            // return (<RenderDom renderDom={item.render({item,text, record, index,optionGroup})}>
            //     {/* {item.render({item,text, record, index,optionGroup})} */}
            // </RenderDom>)
            
        }
        return text;
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
                    <Button disabled={item.disabled}  className={styles.btn} type={item.type || "primary"} key={index} onClick={item.onClick && item.onClick.bind(this,{item,index,selectItem:this.state.selectItem})}>
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
        let obj = {};
        if(sorter.field){
            obj.sort = sorter.field;
            obj.sort_type = sorter.order === "descend" ? 'desc' : 'asc';
        }
        obj.page = pagination.current;
        obj.size = pagination.pageSize;
        this.setState({
            tableFilters:Object.assign({},this.state.tableFilters,obj)
        },() => this.reloadTable())
    }
    reloadTable(){
        console.log('获取table数据')
        const {ajaxType,baseUrl,urlType} = this.props.optionData
        React[ajaxType || '$ajaxGet'](baseUrl,this.state.tableFilters,urlType || 3).then(res => {
           console.log(res);
        })
    }
    getRefs(refs){
        this.refsForm = refs;
    }
    async search(){
        let res = await this.refsForm.validate();
        let afterFilter = Object.assign({},this.state.tableFilters,res);
        let obj = {};
        for(var i in afterFilter){
            if(afterFilter[i]) obj[i] = afterFilter[i];
        }
        this.setState({
            tableFilters:obj
        },() => this.reloadTable())
    }
    components = {
        header: {
          cell: this.ResizeableTitle,
        }
    }
    render() {
        const {optionData ,dataSource} = this.props; 
        const selsctionStatus = ( optionData.selection ? this.getSelection(optionData.selection) : null);
        const searchOption = {
            formList:this.state.searchList,
            layout:'inline',
            labelCol:6
        }
        return (
            <div className={styles.tableContainer}>
                {   
                    <div>
                        {searchOption.formList.length && <CustomForm wrappedComponentRef={(form) => this.getRefs(form)} formOption={searchOption} >
                            <Button type="primary" style={{marginRight:'10px'}}  onClick={this.search.bind(this)}> 查询 </Button>
                        </CustomForm>}
                        <div className={styles.tabbelTopBtn}>{this.getTopBtn()}</div>
                        <Table dataSource={dataSource} onChange={this.changeTable.bind(this)} rowKey={optionData.rowKey} pagination={this.getPagination()}  expandedRowRender={optionData.expanded ? this.getExpand.bind(this) : null}  bordered={true} size={optionData.size || 'small'} rowSelection={selsctionStatus}
                            showHeader={optionData.showHeader || true}
                            locale={{emptyText:"暂无数据"}}
                            scroll={optionData.scroll || {}}
                            // components={this.components}
                        >
                            {this.getColumn(this.state.columns)}
                            {optionData.toolEvent && <Column align="center" title="操作" width={optionData.toolEventWidth || 100} key="action" render={this.getToolColumn.bind(this)} >
                            </Column>}
                        </Table>
                    </div>
                }
            </div>
        )
    }
}

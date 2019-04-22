import React, { Component } from 'react'
import {Table,Button} from 'antd';
import styles from './index.less'
const { Column, ColumnGroup } = Table;
export default class Customtable extends Component {
    selectionChange(selectedRowKeys,selectedRows){
        this.props.selectionChange && this.props.selectionChange({selectedRowKeys,selectedRows})
    }
    getSelection(selectionPar){
        return {
            columnWidth:selectionPar.width || 60,
            columnTitle:"",
            fixed:selectionPar.fixed || "left",
            onChange:this.selectionChange.bind(this),
            type:selectionPar.type || "checkbox"
        };
    }
    getColumn(columnList){
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
                    fixed={item.fixed || false}
                    defaultSortOrder={item.sort || 'ascend'}
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
                    <Button disabled={item.disabled} onClick={item.onClick && item.onClick.bind(this,record)} key={'btn_'+index} size="small" type={item.type}>{item.title}</Button>
                )
            })
        )
    }
    getExpand = (record, index, indent, expanded) => {
        console.log(record, index, indent, expanded);
        return (<p>1356464646465465464654</p>)
        const {optionData} = this.props; 
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
          }, {
            title: 'Age',
            dataIndex: 'age',
          }, {
            title: 'Address',
            dataIndex: 'address',
          }];
        const dataSource = [{
            key: '11',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
          }, {
            key: '22',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
          }, {
            key: '33',
            name: '胡彦祖',
            age: 43,
            address: '西湖区湖底公园1号'
          }];
          return (
            <Table columns={columns} dataSource={dataSource} size="middle" />
          )
    }
    render() {
        const {optionData} = this.props; 
        const selsctionStatus = {} ||  optionData.selection ? this.getSelection(optionData.selection) : null;
        const dataSource = [{
            // key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
          }, {
            // key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
          }, {
            // key: '2',
            name: '胡彦祖',
            age: 43,
            address: '西湖区湖底公园1号'
          }];
        
        return (
            <div className={styles.tableContainer}>
                <Table dataSource={dataSource} rowKey={optionData.rowKey} expandedRowRender={this.getExpand.bind(this)}  bordered={false} size={optionData.size || 'small'} rowSelection={selsctionStatus}
                    showHeader={optionData.showHeader || true}
                    // scroll={{ x: '110%', y: 240 }}
                >
                    {this.getColumn(optionData.columns)}
                    {optionData.toolEvent && <Column align="center" title="操作" key="action" render={this.getToolColumn.bind(this)} >
                    </Column>}
                </Table>
            </div>
        )
    }
}

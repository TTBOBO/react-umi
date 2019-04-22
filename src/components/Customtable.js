import React, { Component } from 'react'
import {Table} from 'antd';
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
    render() {
        const {optionData} = this.props; 
        const selsctionStatus = optionData.selection ? this.getSelection(optionData.selection) : null;
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
            // columns={optionData.columns}
            <div className={styles.tableContainer}>
                <Table dataSource={dataSource} rowKey={optionData.rowKey}  bordered={true} size={optionData.size || 'small'} rowSelection={selsctionStatus}
                    showHeader={optionData.showHeader || true}
                    // scroll={{ x: '110%', y: 240 }}
                >
                    {
                        optionData.columns.map((item,index) => {
                            return (
                                <Column 
                                    title={item.title} 
                                    align={item.align || 'center'} 
                                    className={item.className}
                                    dataIndex={item.prop} 
                                    key={index}
                                    sorter={item.sort}
                                    fixed={item.fixed || false}
                                    defaultSortOrder={item.sort || 'ascend'}
                                    render={item.render} 
                                    width={item.width}

                                 />
                            )
                        })
                    }
                </Table>
            </div>
        )
    }
}

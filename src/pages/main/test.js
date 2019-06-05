import React, { Component } from 'react'

export default class test extends Component {
    state={
        num:1
    }
    handle(){
        this.setState({
            num:++this.state.num
        },() => {
            console.log(this.state.num)
            const onChange = this.props.onChange;
            onChange && onChange(this.state.num);
        })
        
    }
    render() {
        
        return (
        <div onClick={this.handle.bind(this)}>
            {this.state.num}
            {this.props.value}
        </div>
        )
    }
}

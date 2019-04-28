import React, { Component } from 'react';

class RenderDom extends Component {
    render() {
        return (
            <span>
                {this.props.renderDom}
            </span>
        );
    }
}

export default RenderDom;
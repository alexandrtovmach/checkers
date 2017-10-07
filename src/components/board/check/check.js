import React, { Component } from 'react';
import './check.css';


export class Check extends Component {
    render() {
        return (
            <div className={this.props.show? ` side${+this.props.side} check-component`: `hidden`}>
            </div>
        );
    }
}
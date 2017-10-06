import React, { Component } from 'react';
import './field.css';


export class Field extends Component {
    render() {
        return (
            <div className={'row' + this.props.row + ' field-component'}>
            
            </div>
        );
    }
}
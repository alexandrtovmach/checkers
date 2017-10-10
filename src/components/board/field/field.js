import React, { Component } from 'react';

import { Check } from '../check/check';

import './field.css';


export class Field extends Component {
    constructor(props) {
        super(props);
    }

    toggleFieldActivity() {
        if (this.props.status === 3) {
            this.props.onHitField(this.props.fieldIndex, this.props.victimField);
        } else if (this.props.status === 2) {
            this.props.onStepField(this.props.fieldIndex);
        } else {
            if ((this.props.mySide !== this.props.side) || (this.props.turn !== this.props.side)) {return false}
            this.props.onClickField(this.props.fieldIndex);
        }
        
    }

    render() {
        return (
            <div 
                className={`row${+this.props.row} status${this.props.status} field-component`}
                onClick={this.toggleFieldActivity.bind(this)}
            >
                <Check show={this.props.checker} side={this.props.side} queen={this.props.queen}/>
            </div>
        )
    }
}
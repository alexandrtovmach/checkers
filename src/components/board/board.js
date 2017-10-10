import React, { Component } from 'react';

import { Field } from './field/field';
// import { Check } from './check/check';

import './board.css';


export class Board extends Component {
    constructor(props) {
        super(props)
    }

    generateFields() {
        let row = false;
        return this.props.store.fields.map((elem, i) => {
            if (!(i % 4)) {
                row = !row;
            }
            return (
                <Field
                    key={elem.fieldIndex}
                    checker={elem.checker}
                    row={row}
                    side={elem.myCheckers}
                    status={elem.status}
                    victimField={elem.victimField}
                    fieldIndex={elem.fieldIndex}
                    queen={elem.queen}
                    mySide={this.props.store.mySide}
                    turn={this.props.store.turn}
                    onClickField = {this.props.store.onClickField}
                    onStepField = {this.props.store.onStepField}
                    onHitField = {this.props.store.onHitField}
                />
            )
        })
    }

    render() {
        return (
            <div className="board-component">
                {this.generateFields()}
                <div className={this.props.store.finishedGame? "final-wrapper centerContent": "hidden"}>
                    {(+this.props.store.finishedGame? 'Blue ': 'Yellow ') + 'is winner!'}
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';

import { Field } from './field/field';
import { Check } from './check/check';

import './board.css';


export class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            whiteFields: [],
            // activeField: -1
        }
    }

    componentWillMount() {
        this.generateBoard();
    }

    generateBoard() {
        const cacheArr = [];
        let row = true;
        for (let i = 0; i < 32; i++) {
            if (!(i % 4)) {
                row = !row;
            }
            cacheArr.push(
                <Field
                    row={row}
                    key={'field' + i}
                    indexChecker={i}
                    actions={this.props.actions}
                />
            );
        };
        this.setState({
            whiteFields: cacheArr
        })
    }

    // accessAlgorythm(fieldIndex) {

    // }

    render() {
        return (
            <div className="board-component">
                {this.state.whiteFields}
            </div>
        );
    }
}
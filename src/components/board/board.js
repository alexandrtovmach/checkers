import React, { Component } from 'react';

import { Field } from './field/field';

import './board.css';


export class Board extends Component {
    render() {
        const whiteFields = [];
        let row = true;
        for (let i = 0; i < 32; i++) {
            if (!(i % 4)) {
                row = !row;
            }
            whiteFields.push(<Field row={+row} key={'field' + i}/>);
        };
        return (
            <div className="board-component">
                {whiteFields}
            </div>
        );
    }
}
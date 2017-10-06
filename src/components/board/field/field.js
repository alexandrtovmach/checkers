import React, { Component } from 'react';

import { Check } from '../check/check';

import './field.css';


export class Field extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldActiveClass: false,
            fieldAccessClass: false,
        }
    }

    compnentWillMount() {
        this.chooseClassOfChecker();
    }

    chooseClassOfChecker() {
        if (this.props.indexChecker > 11 && this.props.indexChecker < 20) {
            return 'hidden';
        }
    }

    chooseSideOfChecker() {
        if (this.props.indexChecker < 12) {
            return 0;
        } else if (this.props.indexChecker > 19) {
            return 1;
        }
    }

    toggleFieldStatusClass() {
        // this.setState({
        //     activeFieldClass: !this.state.activeFieldClass
        // })
        this.props.actions.onClickField(this.props.indexChecker)
    }

    checkFieldAccessClass() {
        if (this.props.access) {
            this.setState({
                accessFieldClass: true
            })
            return true;
        }
        return false
    }

    render() {
        return (
            <div className={`row${+this.props.row} status${+this.state.activeFieldClass} field-component`}
                onClick={this.toggleFieldStatusClass.bind(this)}
            >
                <Check show={this.chooseClassOfChecker()} side={this.chooseSideOfChecker()}/>
            </div>
        );
    }
}
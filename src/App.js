import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Board } from './components/board/board';
import './app.css';
import './general.css';

class App extends Component {
    render() {
        console.log(this.props.test)
        return (
            <div>
                <header className="app-header">
                    <h1 className="app-title">Easy Checkers</h1>
                </header>
                <div className="content">
                    <Board actions={this.props}/>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        test: state
    }),
    (dispatch) => ({
        onClickField: (index) => {
            dispatch({type: 'CLICK_FIELD', payload: index})
        }
    })
)(App);

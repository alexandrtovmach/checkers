import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Board } from './components/board/board';
import './app.css';
import './general.css';

class App extends Component {
    render() {
        return (
            <div>
                <header className="app-header">
                    <h1 className="app-title">Easy Checkers</h1>
                </header>
                <div className="content">
                    <Board store={this.props}/>
                </div>
            </div>
        )
    }
}
export default connect(
    (state) => ({
        fields: state.fields,
        activeField: state.activeField
    }),
    (dispatch) => ({
        onClickField: (index) => {
            dispatch({type: 'CLICK_FIELD', payload: index});
        },
        onStepField: (to) => {
            dispatch({type: 'ONE_STEP', payload: to});
        },
        onHitField: (to, victim) => {
            dispatch({type: 'ONE_HIT', payload: {
                to: to,
                victimField: victim
            }});
        }
    })
)(App);

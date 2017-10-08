import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Board } from './components/board/board';
import io from 'socket.io-client';
import './app.css';
import './general.css';

class App extends Component {

    constructor(props) {
        super(props);

        const socket = io('http://localhost:3128');

        socket.on('get board', (board) => {
            this.props.onGetBoard(board);
        });

        socket.on('joined room', (room) => {
            this.props.onJoinedRoom(room);
        });
    }

    
    onJoinRoom() {
        this.props.onJoinRoom();
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <h1 className="app-title">Easy Checkers</h1>
                </header>
                <div className="content">
                    <Board store={this.props}/>
                </div>
                <button onClick={this.props.onNewRoom}>Create new room</button>
                <button onClick={this.onJoinRoom.bind(this)}>Join in room</button>
            </div>
        )
    }
}
export default connect(
    (state) => ({
        fields: state.fields,
        activeField: state.activeField,
        room: state.room
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
        },
        onGetBoard: (board) => {
            dispatch({type: 'GET_BOARD', payload: board});
        },
        onNewRoom: () => {
            dispatch({type: 'NEW_ROOM'});
        },
        onJoinRoom: () => {
            dispatch({type: 'JOIN_ROOM'});
        },
        onJoinedRoom: (room) => {
            dispatch({type: 'JOINED_ROOM', payload: room});
        }
    })
)(App);

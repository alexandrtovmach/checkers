import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Board } from './components/board/board';
import { Menu } from './components/menu/menu';
import { socket, SocketService } from './services/socketService';
import './app.css';
import './general.css';

const socketService = new SocketService();

socketService.getRoomList();

class App extends Component {

    constructor(props) {
        super(props);
        socket.on('get board', (board) => {
            this.props.onGetBoard(board);
        });

        socket.on('joined room', (room) => {
            this.props.onJoinedRoom(room);
        });

        socket.on('room list', (rooms) => {
            this.props.onGetedRoomList(rooms);
        });
    }    

    render() {
        return (
            <div>
                <header className="app-header">
                    <h1 className="app-title">Easy Checkers</h1>
                </header>
                <div className='content'>
                    <div className={this.props.room? 'hidden': ''}>
                        <Menu
                            rooms={this.props.rooms} 
                            onJoinRoom={this.props.onJoinRoom}
                            onNewRoom={this.props.onNewRoom}
                        />
                    </div>
                    <div className={this.props.room? '': 'hidden'}>
                        <Board store={this.props} />
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    (state) => ({
        fields: state.fields,
        activeField: state.activeField,
        room: state.room,
        rooms: state.rooms
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
        onNewRoom: (name) => {
            dispatch({type: 'NEW_ROOM', payload: name});
        },
        onJoinRoom: (room) => {
            dispatch({type: 'JOIN_ROOM', payload: room});
        },
        onJoinedRoom: (data) => {
            console.log(data)
            dispatch({type: 'JOINED_ROOM', payload: data});
        },
        onGetedRoomList: (rooms) => {
            dispatch({type: 'GETED_ROOM_LIST', payload: rooms});
        }
    })
)(App);

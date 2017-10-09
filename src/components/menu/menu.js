import React, { Component } from 'react';

import './menu.css';


export class Menu extends Component {
    constructor(props) {
        super(props)
    }

    onJoinRoom(roomId) {
        this.props.onJoinRoom(roomId);
    }
    
    onNewRoom(context, event) {
        event.preventDefault();
        this.props.onNewRoom(this.refs.nameNewRoom.value);
        this.refs.nameNewRoom.value = '';
    }

    generateRoomList() {
        return this.props.rooms.map((elem, i) => {
            return (
                <li key={i} onClick={this.onJoinRoom.bind(this, elem.id)}>{elem.title}</li>
            )
        })
    }

    render() {
        return (
            <div>
                <h2>Menu</h2>
                <form onSubmit={this.onNewRoom.bind(this, event)}>
                    <button>Create new room</button>
                    <input ref="nameNewRoom" placeholder="Name room..." required></input>
                </form>
                <ul>
                    {this.generateRoomList()}
                </ul>
            </div>
        )
    }
}

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

    generateRoomList(activeGames) {
        if (activeGames && this.props.rooms.activeGames) {
            return this.props.rooms.activeGames.map((elem, i) => {
                return (
                    <li key={i+'a'} onClick={this.onJoinRoom.bind(this, elem.id)}>{elem.title}</li>
                )
            })
        } else if (this.props.rooms.otherGames) {
            return this.props.rooms.otherGames.map((elem, i) => {
                return (
                    <li key={i+'o'} onClick={this.onJoinRoom.bind(this, elem.id)}>{elem.title}</li>
                )
            })
        }
        
    }

    render() {
        return (
            <div>
                <h2>Menu</h2>
                <form onSubmit={this.onNewRoom.bind(this, (e) => e)}>
                    <button>Create new room</button>
                    <input ref="nameNewRoom" placeholder="Name room..." required></input>
                </form>
                <div className={(this.props.rooms.activeGames && this.props.rooms.activeGames.length)? '': 'hidden'}>
                    <h3>Active games</h3>
                    <ul>
                        {this.generateRoomList(true)}
                    </ul>
                </div>
                <div className={this.props.rooms.otherGames && this.props.rooms.otherGames.length? '': 'hidden'}>
                    <h3>Room list</h3>
                    <ul>
                        {this.generateRoomList()}
                    </ul>
                </div>
            </div>
        )
    }
}

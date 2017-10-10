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
                    <li key={i+'a'} onClick={this.onJoinRoom.bind(this, elem.id)}>{elem.title} ({elem.players.length})</li>
                )
            })
        } else if (this.props.rooms.otherGames) {
            return this.props.rooms.otherGames.map((elem, i) => {
                return (
                    <li key={i+'o'} onClick={this.onJoinRoom.bind(this, elem.id)}>{elem.title} ({elem.players.length})</li>
                )
            })
        }
        
    }

    render() {
        return (
            <div>
                <h3>Create new game</h3>
                <form className="centerContent" onSubmit={this.onNewRoom.bind(this, (e) => e)}>
                    <input ref="nameNewRoom" placeholder="Name room..." required></input>
                    <button>&#10004;</button>
                </form>
                <h3>...or find already, and start the game</h3>
                <div className="horizontalAlignContent">
                    <div className={(this.props.rooms.activeGames && this.props.rooms.activeGames.length)? 'active': 'hidden'}>
                        <h3>Your rooms</h3>
                        <ul>
                            {this.generateRoomList(true)}
                        </ul>
                    </div>
                    <div className={this.props.rooms.otherGames && this.props.rooms.otherGames.length? 'other': 'hidden'}>
                        <h3>Other rooms</h3>
                        <ul>
                            {this.generateRoomList()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

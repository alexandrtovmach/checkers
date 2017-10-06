import React, { Component } from 'react';
import { Board } from './components/board/board';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <header className="app-header">
                    <h1 className="app-title">Easy Checkers</h1>
                </header>
                <div className="content">
                    <Board/>
                </div>
            </div>
        );
    }
}

export default App;

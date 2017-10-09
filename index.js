import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './src/index.css';
import App from './src/app';
import { game } from './src/reducers/reducer';

const store = createStore(game);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';

import Main from 'components/Main.jsx';

import 'bootstrap/dist/css/bootstrap.css';

import {createStore} from 'redux';
import {setWeather , weather } from 'states/playground.js';
window.onload = function() {
    ReactDOM.render(
        <Main />,
        document.getElementById('root')
    );
    const store = createStore(weather);

    store.subscribe(() => {
        console.log(store.getState());
    })

    store.dispatch(setWeather(800, 21));
    store.dispatch(setWeather(802, 23));
};



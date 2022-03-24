import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

import './index.css';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
axios.post('https://locus-back.herokuapp.com/me', {
    deviceWidth: document.body.offsetWidth,
    website: 'Dice',
    empty: ''
}).then(() => null);

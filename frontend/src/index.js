import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');
console.log(document.getElementsByTagName('base'));
//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
    <BrowserRouter >
        <App />
    </BrowserRouter>,
    rootElement);

registerServiceWorker();

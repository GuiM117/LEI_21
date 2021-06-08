import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { SnackbarProvider } from 'notistack'

const rootElement = document.getElementById('root');


ReactDOM.render(
    <BrowserRouter >
        <SnackbarProvider maxSnack={3}>
            <App />
        </SnackbarProvider>
    </BrowserRouter>,
    rootElement);

registerServiceWorker();

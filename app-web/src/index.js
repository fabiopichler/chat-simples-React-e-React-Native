import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './index.css';

import WebSocketProvider from 'app-modules/api/webSocket/WebSocketProvider';

import App from './app/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <WebSocketProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </WebSocketProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();

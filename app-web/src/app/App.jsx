import React from 'react';

import { useHistory } from 'react-router-dom';

import { useWebSocket } from 'app-modules/api/webSocket/WebSocketProvider';

import AppRouter from './appRouter/AppRouter';

const url = process.env.REACT_APP_API_URL;

const App = () => {
    const history = useHistory();

    const { actions } = useWebSocket();

    React.useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('user-data'));

            if (data && typeof data === 'object')
                actions.connect(url, data, () => history.replace("/chat"));
            else
                throw new Error();

        } catch (error) {
            history.replace("/");
        }
    }, []);

    return (
        <AppRouter />
    );
};

export default App;

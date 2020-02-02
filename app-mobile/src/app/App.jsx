import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { useWebSocket } from 'app-modules/api/webSocket/WebSocketProvider';

import AppNavigator from './appNavigator/AppNavigator';

const { API_URL: url } = require('../../env.json');

const App = () => {

    const { actions } = useWebSocket();

    const [initialRoute, setInitialRoute] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            try {
                const data = JSON.parse(await AsyncStorage.getItem('user-data'));

                if (data && typeof data === 'object')
                    actions.connect(url, data, () => setInitialRoute('Chat'));
                else
                    throw new Error();

            } catch (error) {
                setInitialRoute('Home');
            }
        })();
    }, []);

    if (initialRoute === null)
        return null;

    return (
        <AppNavigator
            initialRoute={initialRoute}
        />
    );
};

export default App;

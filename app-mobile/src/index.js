import 'react-native-gesture-handler';

import React from 'react';

import { AppRegistry } from 'react-native';
import { NavigationNativeContainer } from '@react-navigation/native';

import WebSocketProvider from 'app-modules/api/webSocket/WebSocketProvider';

import App from './app/App';

const Index = () => (
    <NavigationNativeContainer>
        <WebSocketProvider>
            <App />
        </WebSocketProvider>
    </NavigationNativeContainer>
);

AppRegistry.registerComponent('TeleGramaMobile', () => Index);

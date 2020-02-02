import React from 'react';

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import HomeScreen from '../screens/homeScreen/HomeScreen';
import ChatScreen from '../screens/chatScreen/ChatScreen';

const Stack = createStackNavigator();

const AppNavigator = ({
    initialRoute = 'Home',
}) => (
    <Stack.Navigator
        headerMode="none"
        screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
        }}
        initialRouteName={initialRoute}
    >
        <Stack.Screen
            name="Home"
            component={HomeScreen}
        />

        <Stack.Screen
            name="Chat"
            component={ChatScreen}
        />
    </Stack.Navigator>
);

export default AppNavigator;

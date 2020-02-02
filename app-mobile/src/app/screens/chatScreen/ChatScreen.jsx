import React from 'react';
import styled from 'styled-components';

import { StatusBar } from 'react-native';

import ChatHeader from './chatHeader/ChatHeader';
import ChatList from './chatList/ChatList';
import ChatFooter from './chatFooter/ChatFooter';

const Main = styled.View`
    flex-direction: column;
    height: 100%;
`;

const ChatScreen = () => (
    <Main>
        <StatusBar
            backgroundColor="#007bff"
            barStyle="light-content"
        />

        <ChatHeader />

        <ChatList />

        <ChatFooter />
    </Main>
);

export default ChatScreen;

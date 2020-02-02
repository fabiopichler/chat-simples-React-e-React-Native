import React from 'react';
import styled from 'styled-components';

import ChatHeader from './chatHeader/ChatHeader';
import ChatList from './chatList/ChatList';
import ChatFooter from './chatFooter/ChatFooter';

const Main = styled.main`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const ChatView = () => (
    <Main>
        <ChatHeader />

        <ChatList />

        <ChatFooter />
    </Main>
);

export default ChatView;

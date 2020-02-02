import React from 'react';
import styled from 'styled-components';

import { useWebSocket } from 'app-modules/api/webSocket/WebSocketProvider';

const ScrollView = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexDirection: 'column',
        paddingTop: 16
    }
})`
    flex-grow: 1;
    background-color: white;
`;

const Row = styled.View`
    max-width: 80%;
    margin: 0 16px 16px 16px;
    padding: 12px;
    border-radius: 20px;
`;

const UserName = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 4px;
`;

const Dot = styled.View`
    width: 10px;
    height: 10px;
    margin-right: 6px;
    border-radius: 5px;
`;

const Name = styled.Text`
    font-size: 16px;
    line-height: 17px;
    font-weight: bold;
`;

const Text = styled.Text`
    font-size: 16px;
`;

const ChatList = () => {

    const messagesRef = React.useRef(null);
    const loadedRef = React.useRef(true);

    const { state } = useWebSocket();

    const { list: messages, online } = state;

    const scrollToBottom = (contentWidth, contentHeight) => {
        if (messages.length === 0)
            return;

        if (loadedRef.current) {
            loadedRef.current = false;
            messagesRef.current.scrollToEnd({ animated: false });
            return;
        }

        /*const { scrollTopMax, scrollTop } = messagesRef.current;

        if ((scrollTopMax - scrollTop) > 200)
            return;*/

        messagesRef.current.scrollToEnd({ animated: true });
    }

    return (
        <ScrollView
            ref={messagesRef}
            onContentSizeChange={scrollToBottom}
        >
            {messages.map((message, index) => (
                <Row
                    key={index}
                    style={{
                        alignSelf: message.username === state.user.username ? 'flex-end' : 'flex-start',
                        backgroundColor: message.username === state.user.username ? '#0099FF' : '#F1F0F0'
                    }}
                >
                    {message.username === state.user.username ? null : (
                        <UserName>
                            <Dot
                                style={{
                                    backgroundColor: online.findIndex(on => on.username === message.username) !== -1 ? '#0a0' : '#aaa'
                                }}
                            />

                            <Name>{message.name}</Name>
                        </UserName>
                    )}

                    <Text
                        style={{
                            color: message.username === state.user.username ? 'white' : undefined
                        }}
                    >
                        {message.text}
                    </Text>
                </Row>
            ))}
        </ScrollView>
    );
};

export default ChatList;

import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

import { Container } from 'react-bootstrap';

import { useWebSocket } from 'app-modules/api/webSocket/WebSocketProvider';

const ScrollView = styled.div`
    flex-grow: 1;
    padding-top: 16px;
    overflow: auto;
`;

const MessageContainer = styled(Container)`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    max-width: 86%;
    margin-bottom: 16px;
    padding: 12px;
    border-radius: 20px;

    &.current-user {
        align-self: end;
        background-color: #0099FF;
        color: white;
    }

    &:not(.current-user) {
        align-self: start;
        background-color: #F1F0F0;
    }

    & > .user-name {
        & > .dot {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;

            &.online {
                background-color: #0a0;
            }

            &:not(.online) {
                background-color: #aaa;
            }
        }
    }

    & > .text {
        white-space: pre-line;
    }
`;

const ChatList = () => {

    const messagesRef = React.useRef(null);
    const messagesEndRef = React.useRef(null);
    const loadedRef = React.useRef(true);

    const { state } = useWebSocket();

    const { list: messages, online } = state;

    const scrollToBottom = () => {
        if (messages.length === 0)
            return;

        if (loadedRef.current) {
            loadedRef.current = false;
            messagesEndRef.current.scrollIntoView();
            return;
        }

        const { scrollTopMax, scrollTop } = messagesRef.current;

        if ((scrollTopMax - scrollTop) > 200)
            return;

        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    React.useEffect(scrollToBottom, [messages]);

    return (
        <ScrollView ref={messagesRef}>
            <MessageContainer>
                {messages.map((message, index) => (
                    <Row
                        key={index}
                        className={
                            clsx({ 'current-user': message.username === state.user.username })
                        }
                    >
                        {message.username === state.user.username ? null : (
                            <div
                                className="user-name font-weight-bold"
                            >
                                <div
                                    className={clsx(
                                        'dot mr-1',
                                        {
                                            online: online.findIndex(on => on.username === message.username) !== -1
                                        }
                                    )}
                                />

                                <span>{message.name}</span>
                            </div>
                        )}

                        <div className="text">{message.text}</div>
                    </Row>
                ))}
            </MessageContainer>

            <div ref={messagesEndRef} />
        </ScrollView>
    );
};

export default ChatList;

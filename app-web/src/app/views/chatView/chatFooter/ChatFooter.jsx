import React from 'react';
import styled from 'styled-components';

import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';

import { useWebSocket } from 'app-modules/api/webSocket/WebSocketProvider';
import { Status } from 'app-modules/api/webSocket/actions';

const ContainerStyled = styled.footer`
    box-shadow: 0 0 4px rgba(0,0,0,.15);
    z-index: 100;

    & > form {
        display: flex;
    }

    & .textarea {
        height: 3em;
        border-top-left-radius: 26px;
        border-bottom-left-radius: 26px;
        background-color: #e6ecf0;
        resize: none;
    }

    & .button-submit {
        padding-right: 18px;
        border-top-right-radius: 26px;
        border-bottom-right-radius: 26px;
        background-color: #e6ecf0;
        font-size: 20px;
    }
`;

const ChatFooter = () => {
    const { state, actions } = useWebSocket();

    const { status } = state;

    const [text, setText] = React.useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (!text || status !== Status.connected)
            return;

        actions.emitMessage({ text });
        setText('');
    }

    return (
        <ContainerStyled className="bg-white py-1">
            <Container>
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <FormControl
                            as="textarea"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            className="textarea border-0"
                        />

                        <InputGroup.Append>
                            <Button
                                variant="light"
                                className="button-submit border-0"
                                type="submit"
                            >
                                <i className="fas fa-paper-plane" />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </form>
            </Container>
        </ContainerStyled>
    );
};

export default ChatFooter;

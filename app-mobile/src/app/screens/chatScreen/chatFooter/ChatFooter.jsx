import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useWebSocket } from 'app-modules/api/webSocket/WebSocketProvider';
import { Status } from 'app-modules/api/webSocket/actions';

const Footer = styled.View`
    padding: 5px 16px;
    background-color: white;
    border-top-width: 1px;
    border-top-color: #eee;
`;

const Container = styled.View`
    flex-direction: row;
`;

const TextInput = styled.TextInput.attrs({
    placeholderTextColor: "#666"
})`
    flex: 1;
    max-height: 100px;
    margin: 0;
    padding: 6px 14px;
    border-top-left-radius: 26px;
    border-bottom-left-radius: 26px;
    background-color: #e6ecf0;
    color: #495057;
`;

const ButtonSubmit = styled.TouchableOpacity`
    justify-content: center;
    padding: 14px;
    border-left-width: 0;
    border-top-right-radius: 26px;
    border-bottom-right-radius: 26px;
    background-color: #e6ecf0;
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
    };

    return (
        <Footer>
            <Container>
                <TextInput
                    multiline
                    value={text}
                    onChangeText={text => setText(text)}
                />

                <ButtonSubmit onPress={handleSubmit}>
                    <Icon
                        solid
                        name="paper-plane"
                        size={20}
                        style={{ paddingRight: 8 }}
                    />
                </ButtonSubmit>
            </Container>
        </Footer>
    );
};

export default ChatFooter;

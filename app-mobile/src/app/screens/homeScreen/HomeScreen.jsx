import React from 'react';
import styled from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';

import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { useWebSocket } from 'app-modules/api/webSocket/WebSocketProvider';
import { getStatus } from 'app-modules/helpers/system';
import { Status } from 'app-modules/api/webSocket/actions';

const { API_URL: url } = require('../../../../env.json');

const FormView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    background-color: white;
    text-align: center;
`;

const Title = styled.Text`
    margin-bottom: 30px;
    font-size: 26px;
`;

const StatusText = styled.Text`
    margin-bottom: 30px;
`;

const SubmitButton = styled.TouchableOpacity`
    margin-top: 8px;
    padding: 16px;
`;

const SubmitButtonText = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: #007bff;
`;

const TextInput = styled.TextInput.attrs({
    placeholderTextColor: "#666"
})`
    width: 280px;
    margin: 0 0 8px 0;
    padding: 6px 14px;
    border-radius: 5px;
    border: 1px solid #ced4da;
    color: #495057;
`;

const HomeScreen = () => {

    const navigation = useNavigation();

    const { state, actions } = useWebSocket();

    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');

    const handleSubmit = () => {

        if (!name || !username) return;

        const data = { name, username };

        actions.login(url, data, () => {
            setTimeout(() => navigation.replace("Chat"), 500);
            AsyncStorage.setItem('user-data', JSON.stringify(data));
        });
    }

    return (
        <FormView>
            <StatusBar
                backgroundColor="#ffffff"
                barStyle="dark-content"
            />

            <Title>
                Tele Grama
            </Title>

            {state.status === Status.disconnected ? null : (
                <StatusText
                    style={{ color: state.status === Status.connecting ? '#ff0' : '#0a0' }}
                >
                    {getStatus(state.status)}
                </StatusText>
            )}

            <TextInput
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Nome"
            />

            <TextInput
                value={username}
                onChangeText={text => setUsername(text)}
                placeholder="Nome de usuário"
            />

            <SubmitButton
                onPress={handleSubmit}
            >
                <SubmitButtonText>Acessar</SubmitButtonText>
            </SubmitButton>
        </FormView>
    );
};

export default HomeScreen;

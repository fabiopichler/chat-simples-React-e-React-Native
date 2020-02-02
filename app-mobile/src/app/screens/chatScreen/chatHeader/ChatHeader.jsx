import React from 'react';
import styled from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/core';

import UsersOnline from './usersOnline/UsersOnline';

import { useWebSocket } from 'app-modules/api/webSocket/WebSocketProvider';
import { Status } from 'app-modules/api/webSocket/actions';
import { getStatus } from 'app-modules/helpers/system';

const Navbar = styled.View`
    justify-content: center;
    height: 60px;
    padding: 0 16px;
    background-color: #007bff;
    elevation: 4;
    z-index: 100;
`;

const Container = styled.View`
    flex-direction: row;
    align-items: center;
`;

const OnlineButton = styled.TouchableOpacity`
    margin-right: 8px;
    padding: 6px;
`;

const TextOnlineButton = styled.Text`
    font-size: 16px;
    color: white;
`;

const Title = styled.Text`
    flex-grow: 1;
    font-size: 20px;
    color: white;
`;

const StatusView = styled.View`
    position: absolute;
    width: 100%;
    padding: 3px;
    z-index: 10000;
    top: 60px;
    elevation: 4;
`;

const StatusText = styled.Text`
    text-align: center;
    color: white;
`;

const ChatHeader = () => {
    const navigation = useNavigation();

    const { state, actions } = useWebSocket();

    const { online, status } = state;

    const [showUsersOnline, setShowUsersOnline] = React.useState(false);

    const handleLogout = () => {
        actions.disconnect();
        AsyncStorage.removeItem('user-data');
        navigation.replace('Home');
    }

    return (
        <>
            <Navbar>
                <Container>
                    <Title>Tele Grama</Title>

                    <OnlineButton
                        onPress={() => setShowUsersOnline(true)}
                    >
                        <TextOnlineButton>{online.length} online</TextOnlineButton>
                    </OnlineButton>

                    <Icon.Button
                        name="sign-out-alt"
                        size={20}
                        iconStyle={{ marginRight: 0 }}
                        onPress={handleLogout}
                    />
                </Container>
            </Navbar>

            {status === Status.connected ? null : (
                <StatusView
                    style={{ backgroundColor: status === Status.disconnected ? 'red' : '#059' }}
                >
                    <StatusText>{getStatus(status)}</StatusText>
                </StatusView>
            )}

            <UsersOnline
                show={showUsersOnline}
                onClose={() => setShowUsersOnline(false)}
                state={state}
            />
        </>
    );
};

export default ChatHeader;

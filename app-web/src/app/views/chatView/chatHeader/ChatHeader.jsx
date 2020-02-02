import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

import { useHistory } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';

import UsersOnline from './usersOnline/UsersOnline';

import { useWebSocket } from 'app-modules/api/webSocket/WebSocketProvider';
import { Status } from 'app-modules/api/webSocket/actions';
import { getStatus } from 'app-modules/helpers/system';

const HeaderStyled = styled.header`
    & .navbar {
        box-shadow: 0 0 4px rgba(0,0,0,.6);
        z-index: 100;
    }

    & .button-logout {
        padding: 2px 8px;
        font-size: 20px;
    }

    & .status {
        position: absolute;
        width: 100%;
        padding: 3px;
        text-align: center;
        color: white;

        &.disconnected {
            background-color: red;
        }

        &:not(.disconnected) {
            background-color: #036;
        }
    }
`;

const ChatHeader = () => {
    const history = useHistory();

    const { state, actions } = useWebSocket();

    const { online, status } = state;

    const [showUsersOnline, setShowUsersOnline] = React.useState(false);

    const handleLogout = () => {
        actions.disconnect();
        localStorage.removeItem('user-data');
        history.replace("/");
    };

    return (
        <HeaderStyled>
            <Navbar
                expand="lg"
                variant="dark"
                bg="primary"
                className="navbar"
            >
                <Container>
                    <Navbar.Brand href="#">Tele Grama</Navbar.Brand>

                    <div className="flex-fill" />

                    <Button
                        className="text-white"
                        onClick={() => setShowUsersOnline(true)}
                    >
                        {online.length} online
                    </Button>

                    <Button
                        className="button-logout text-white"
                        onClick={handleLogout}
                    >
                        <i className="fas fa-sign-out-alt" />
                    </Button>
                </Container>
            </Navbar>

            {status === Status.connected ? null : (
                <div
                    className={
                        clsx('status', { disconnected: status === Status.disconnected })
                    }
                >
                    {getStatus(status)}
                </div>
            )}

            <UsersOnline
                show={showUsersOnline}
                onClose={() => setShowUsersOnline(false)}
                state={state}
            />
        </HeaderStyled>
    );
};

export default ChatHeader;

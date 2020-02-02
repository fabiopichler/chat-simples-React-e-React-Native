import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { useWebSocket } from 'app-modules/api/webSocket/WebSocketProvider';
import { getStatus } from 'app-modules/helpers/system';
import { Status } from 'app-modules/api/webSocket/actions';

const url = process.env.REACT_APP_API_URL;

const FormContainer = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    max-width: 300px;
    margin: 0 auto;
    text-align: center;
`;

const HomeView = () => {

    const history = useHistory();

    const { state, actions } = useWebSocket();

    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (!name || !username) return;

        const data = { name, username };

        actions.login(url, data, () => {
            localStorage.setItem('user-data', JSON.stringify(data));
            setTimeout(() => history.replace("/chat"), 500);
        });
    }

    return (
        <FormContainer
            onSubmit={handleSubmit}
            method="post"
        >
            <h3 className="my-4 font-weight-normal">
                Tele Grama
            </h3>

            {state.status === Status.disconnected ? null : (
                <div
                    className={clsx(
                        'mb-4',
                        state.status === Status.connecting ? 'text-warning' : 'text-success'
                    )}
                >
                    {getStatus(state.status)}
                </div>
            )}

            <Form.Control
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="Nome"
                className="mb-2"
            />

            <Form.Control
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"
                placeholder="Nome de usuário"
            />

            <Button
                variant="link"
                type="submit"
                className="my-4 font-weight-bold"
            >
                Acessar
            </Button>
        </FormContainer>
    );
};

export default HomeView;

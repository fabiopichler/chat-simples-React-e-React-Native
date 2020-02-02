import React from 'react';
import styled from 'styled-components';

import { Modal, Button, Badge } from 'react-bootstrap';

const UserBadge = styled(Badge)`
    margin: 0 4px;
    font-size: 16px;
`;

const UsersOnline = ({
    show,
    onClose,
    state,
}) => {
    const { user, online } = state;

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Usuários online</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {online.map((on, index) => (
                    <UserBadge
                        pill
                        variant={on.username === user.username ? 'secondary' : 'info'}
                        key={index}
                    >
                        {on.name} {on.username === user.username ? '(eu)' : null}
                    </UserBadge>
                ))}
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="primary"
                    className="rounded-pill"
                    onClick={onClose}
                >
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UsersOnline;

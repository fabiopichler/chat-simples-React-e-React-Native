import React from 'react';
import styled from 'styled-components';
import Modal from "react-native-modal";

import { Button } from 'react-native';

const Container = styled.View`
    background-color: white;
`;

const Header = styled.View`
    padding: 16px;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

const ScrollView = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexDirection: 'row',
        marginBottom: 8,
    }
})`
    padding: 0 10px;
`;

const UserBadge = styled.Text`
    margin: 0 4px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
`;

const Footer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    padding: 8px;
`;

const UsersOnline = ({
    show,
    onClose,
    state,
}) => {
    const { user, online } = state;

    return (
        <Modal
            isVisible={show}
            onBackdropPress={onClose}
            animationIn="fadeInDown"
            animationOut="fadeOutUp"
        >
            <Container>
                <Header>
                    <Title>Usuários online</Title>
                </Header>

                <ScrollView>
                    {online.map((on, index) => (
                        <UserBadge
                            style={{ backgroundColor: on.username === user.username ? '#6c757d' : '#17a2b8' }}
                            key={index}
                        >
                            {on.name} {on.username === user.username ? '(eu)' : null}
                        </UserBadge>
                    ))}
                </ScrollView>

                <Footer>
                    <Button
                        title="Fechar"
                        onPress={onClose}
                    />
                </Footer>
            </Container>
        </Modal>
    );
};

export default UsersOnline;

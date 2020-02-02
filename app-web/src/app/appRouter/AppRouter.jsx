import React from 'react';

import { Switch, Route } from 'react-router-dom';

import HomeView from '../views/homeView/HomeView';
import ChatView from '../views/chatView/ChatView';

const AppRouter = () => (
    <Switch>
        <Route
            exact
            path="/"
            component={HomeView}
        />

        <Route
            exact
            path="/chat"
            component={ChatView}
        />

        <Route
            path="*"
            component={
                <div>Erro 404 - Página não encontrada</div>
            }
        />
    </Switch>
);

export default AppRouter;

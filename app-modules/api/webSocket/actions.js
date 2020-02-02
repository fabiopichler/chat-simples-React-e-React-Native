import React from "react";

import { webSocketApi } from './WebSocketApi';

export const Actions = Object.freeze({
    setUser: 0,
    setList: 1,
    addToList: 2,
    setOnline: 3,
    setStatus: 4,
});

export const Status = Object.freeze({
    disconnected: 0,
    connecting: 1,
    connected: 2,
    error: 3,
});

export const useActions = dispatch => {

    const onCloseRef = React.useRef();

    const login = React.useCallback((url, data, callback) => {
        webSocketApi.disableReconnect();
        webSocketApi.close();

        connect(url, data, callback);
    }, []);

    const connect = React.useCallback((url, data, callback) => {
        webSocketApi.connect(url, data, () => {
            dispatch({ type: Actions.setUser, payload: data });
            setStatus(Status.connecting);

            webSocketApi.cancelReconnect();

            webSocketApi.on('connection', data => {
                setStatus(Status.connected);
                setList(data.history);

                webSocketApi.on('server-message', data => addToList(data));
                webSocketApi.on('users-online', data => setOnline(data));

                webSocketApi.enableReconnect();

                if (callback && typeof callback === 'function') {
                    callback();
                    callback = null;
                }
            });

            webSocketApi.onError(() => {
                setStatus(Status.error);
            });

            onCloseRef.current = webSocketApi.onClose(() => {
                setStatus(Status.disconnected);

                if (onCloseRef.current) {
                    onCloseRef.current.remove();
                    onCloseRef.current = null;
                }
            });
        });
    }, [dispatch]);

    const disconnect = React.useCallback(() => {
        webSocketApi.disableReconnect();
        webSocketApi.close();

        dispatch({ type: Actions.setUser, payload: { name: null, username: null } });
    }, [dispatch]);

    const close = React.useCallback(() => {
        if (onCloseRef.current) {
            onCloseRef.current.remove();
            onCloseRef.current = null;
        }

        disconnect();
    }, [onCloseRef]);

    const emitMessage = React.useCallback(data => {
        webSocketApi.emit('client-message', data);
    }, []);

    const setList = React.useCallback(list => {
        dispatch({ type: Actions.setList, payload: list });
    }, [dispatch]);

    const addToList = React.useCallback(list => {
        dispatch({ type: Actions.addToList, payload: list });
    }, [dispatch]);

    const setOnline = React.useCallback(online => {
        dispatch({ type: Actions.setOnline, payload: online });
    }, [dispatch]);

    const setStatus = React.useCallback(status => {
        dispatch({ type: Actions.setStatus, payload: status });
    }, [dispatch]);

    return Object.freeze({
        login,
        connect,
        disconnect,
        close,
        emitMessage,
        setList,
        addToList,
        setOnline,
        setStatus,
    });
};

import WebSocket from 'ws';
import uuidv4 from 'uuid/v4';

interface IMessage {
    username: string;
    name: string;
    text: string;
}

interface IClient {
    ws: WebSocket;
    username: string;
    name: string;
}

interface IOnline {
    username: string;
    name: string;
}

let history: IMessage[] = [];

const clients = new Map<string, IClient>();

export const onNewConnection = (ws: WebSocket, data: any) => {

    if (!data || typeof data !== 'object')
        throw new Error();

    const id = uuidv4();

    const client: IClient = {
        ws,
        username: data.username,
        name: data.name,
    };

    clients.set(id, client);

    emit(ws, 'connection', {
        connected: true,
        history,
    });

    updateOnline();

    return id;
};

export const onClientMessage = (ws: WebSocket, id: string, data: IMessage) => {

    if (!data || typeof data !== 'object')
        throw new Error();

    const client = clients.get(id);

    if (client === undefined)
        throw new Error();

    const message: IMessage = {
        username: client.username,
        name: client.name,
        text: data.text,
    };

    history.push(message);
    history = history.slice(-100);

    for (const [id, client] of clients) {
        if (/*client.ws !== ws &&*/ client.ws.readyState === WebSocket.OPEN)
            emit(client.ws, 'server-message', message);
    }
};

export const onClose = (id: string) => {
    clients.delete(id);

    updateOnline();
};

const updateOnline = () => {
    const online: IOnline[] = [];

    for (const client of clients.values()) {
        if (online.findIndex(c => c.username === client.username) !== -1)
            continue;

        online.push({
            username: client.username,
            name: client.name,
        });
    }

    for (const client of clients.values()) {
        if (client.ws.readyState === WebSocket.OPEN)
            emit(client.ws, 'users-online', online);
    }
};

const emit = (ws: WebSocket, type: string, data: {}) => {
    ws.send(JSON.stringify({ type, payload: data }));
};

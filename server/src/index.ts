import WebSocket from 'ws';

import { onNewConnection, onClientMessage, onClose } from './clients';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    let id = '';

    ws.on('message', data => {
        try {
            const json = JSON.parse(data.toString());

            if (!json || typeof json !== 'object')
                throw new Error();

            if (json.type === 'new-connection') {
                id = onNewConnection(ws, json.payload);
                ws.on('close', () => onClose(id));

            } else if (json.type === 'client-message') {
                onClientMessage(ws, id, json.payload);
            }

        } catch (e) {
            ws.terminate();
        }
    });

    (ws as any).isAlive = true;
    ws.on('pong', () => { (ws as any).isAlive = true; });
});

function noop() { }

const interval = setInterval(() => {
    for (const ws of wss.clients) {
        if ((ws as any).isAlive === false) {
            ws.terminate();
            continue;
        }

        (ws as any).isAlive = false;
        ws.ping(noop);
    }
}, 30000);


class SocketEventListener {

    constructor(ws, type, listener) {
        this._ws = ws;
        this._type = type;
        this._listener = listener;

        this._ws.addEventListener(this._type, this._listener);
    }

    remove() {
        this._ws.removeEventListener(this._type, this._listener);
    }
}

class WebSocketApi {

    constructor() {
        this._ws = null;
        this._url = null;
        this._userData = null;
        this._reconnectInterval = 0;
        this._reconnectCallback = null;
        this._enableReconnect = false;
    }

    connect(url, userData, callback) {
        if (this._ws)
            return;

        this._url = url;
        this._userData = userData;
        this._reconnectCallback = callback;

        this._connect();
    }

    _connect() {
        if (this._ws)
            return;

        this._ws = new WebSocket(this._url);

        this._ws.onopen = () => this.emit('new-connection', this._userData);

        this._reconnectCallback();
    }

    close() {
        if (this._ws) {
            this._ws.close();
            this._ws = null;
        }
    }

    emit(type, data) {
        this._ws.send(JSON.stringify({ type, payload: data }));
    }

    reconnect() {
        if (this._reconnectInterval !== 0 || !this._userData || !this._enableReconnect)
            this.cancelReconnect();

        this._reconnectInterval = setInterval(() => {
            this.close();

            if (this._reconnectCallback)
                this._connect();
        }, 3000);
    }

    cancelReconnect() {
        if (this._reconnectInterval === 0)
            return;

        clearInterval(this._reconnectInterval);
        this._reconnectInterval = 0;
    }

    enableReconnect() {
        this._enableReconnect = true;
    }

    disableReconnect() {
        this._enableReconnect = false;
    }

    on(type, callback) {
        const listener = e => {
            try {
                const data = JSON.parse(e.data);

                if (data && typeof data === 'object' && data.type === type && data.payload)
                    callback(data.payload);
            }
            catch (e) { }
        };

        return new SocketEventListener(this._ws, 'message', listener);
    }

    onMessage(callback) {
        return new SocketEventListener(this._ws, 'message', callback);
    }

    onClose(callback) {
        const listener = () => {
            if (this._enableReconnect)
                webSocketApi.reconnect();

            if (callback && typeof callback === 'function')
                callback();
        };

        return new SocketEventListener(this._ws, 'close', listener);
    }

    onError(callback) {
        return new SocketEventListener(this._ws, 'error', callback);
    }
}

export const webSocketApi = new WebSocketApi();

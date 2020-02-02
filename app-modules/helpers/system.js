import { Status } from "../api/webSocket/actions"

export const getStatus = status => {
    switch (status) {
        case Status.disconnected:
            return "Desconectado";

        case Status.connecting:
            return "Conectando...";

        case Status.connected:
            return "Conectado";

        case Status.error:
            return "Erro";
    }
}

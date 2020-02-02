
import React from "react";

import { reducer, initialState } from "./reducers";
import { useActions } from "./actions";

const WebSocketContext = React.createContext();

const WebSocketProvider = ({ children }) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const actions = useActions(dispatch);

    React.useEffect(() => {
        return () => actions.close();
    }, []);

    const value = {
        state,
        actions,
    };

    return React.createElement(WebSocketContext.Provider, { value }, children);
};

export default WebSocketProvider;

export const useWebSocket = () => React.useContext(WebSocketContext);

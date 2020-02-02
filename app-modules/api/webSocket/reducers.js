import { Actions, Status } from "./actions";

export const initialState = {
    user: { name: null, username: null },
    list: [],
    online: [],
    status: Status.disconnected,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case Actions.setUser:
            return { ...state, user: action.payload };

        case Actions.setList:
            return { ...state, list: action.payload };

        case Actions.addToList:
            return { ...state, list: [...state.list, action.payload] };

        case Actions.setOnline:
            return { ...state, online: action.payload };

        case Actions.setStatus:
            return { ...state, status: action.payload };

        default:
            return state;
    }
};

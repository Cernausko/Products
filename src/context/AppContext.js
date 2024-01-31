import { createContext, useReducer } from "react";
import reducer, { initialState } from "../reducers/ProductReducer";

export const AppContext = createContext();

export const AppProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, initialState)

    const setAuthToken = (token) =>{
        dispatch({
            type: "changeToken",
            payload: token
        })
    }

    const removeAuthToken = () =>{
        dispatch({
            type: 'removeToken',
            payload: ''
        })
    }

    const value = {
        authToken: state.authToken,
        setAuthToken: setAuthToken,
        removeAuthToken: removeAuthToken
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
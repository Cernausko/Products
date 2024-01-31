export const initialState = {
    authToken: ''
}

const appReducer = (state, action) =>{
    switch (action.type){
        case "changeToken":
            return {
                ...state,
                authToken: action.payload
            }
        case 'removeToken':
            return {
                ...state,
                authToken: ''
            }
        default:
            return state
    }
}

export default appReducer
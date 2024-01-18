import React, { useReducer, useEffect, useContext } from "react";
import { reducer } from "./reducer";
const AppContext = React.createContext();
const defaultState = {
    userDetails: {},
    loading: false,
    sideBar: false,
    logOutBtn: false,
    alert: {
        condition: false,
        type: '',
        msg: ''
    }
}
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    const showAlert = ({ msg, type }) => { dispatch({ type: 'showAlert', payload: { msg, type } }) }
    const startLoading = () => { dispatch({ type: 'startLoading' }) }
    const endLoading = () => { dispatch({ type: 'endLoading' }) }
    const hideAlert = () => { dispatch({ type: 'hideAlert' }) }
    const showSideBar = () => { dispatch({ type: 'showSideBar' }) }
    const hideSideBar = () => { dispatch({ type: 'hideSideBar' }) }
    const toggleLogOutBtn = () => { dispatch({ type: 'toggleLogOutBtn' }) }
    const LogOutBtn = () => { dispatch({ type: 'LogOutBtn' }) }
    const updateUser =  () => {
        dispatch({type: 'updateUser'})
    }
    useEffect(()=>{
        updateUser()
    },[])
    return <AppContext.Provider
        value={{
            ...state,
            updateUser,
            showAlert,
            hideAlert,
            showSideBar,
            hideSideBar,
            toggleLogOutBtn,
            startLoading,
            endLoading,
            LogOutBtn,
        }}
    >
        {children}
    </AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppContext, AppProvider }
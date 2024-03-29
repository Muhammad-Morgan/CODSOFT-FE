export const reducer = (state, action) => {
    if (action.type === 'showAlert') {
        return {
            ...state,
            alert: {
                condition: true,
                type: action.payload.type,
                msg: action.payload.msg,
            }
        }
    }
    if (action.type === 'hideAlert') {
        return {
            ...state,
            alert: {
                condition: false,
                type: '',
                msg: '',
            }
        }
    }
    if (action.type === 'showSideBar') {
        return {
            ...state,
            sideBar: true
        }
    }
    if (action.type === 'hideSideBar') {
        return {
            ...state,
            sideBar: false
        }
    }
    if (action.type === 'toggleLogOutBtn') {
        return {
            ...state,
            logOutBtn: !state.logOutBtn
        }
    }
    if (action.type === 'LogOutBtn') {
        return {
            ...state,
            logOutBtn: false
        }
    }
    if (action.type === 'startLoading') {
        return {
            ...state,
            loading: true
        }
    }
    if (action.type === 'endLoading') {
        return {
            ...state,
            loading: false
        }
    }
    if (action.type === 'logIn') {
        return {
            ...state,
            isUserLogged: true
        }
    }
    if (action.type === 'logOut') {
        return {
            ...state,
            isUserLogged: false
        }
    }
    if (action.type === 'updateUser') {

        return {
            ...state,
            userDetails: {
                ...state.userDetails,
                name: action.payload?.name,
                id: action.payload?.id,
                type: action.payload?.type,
            }
        }
    }
    return state
}
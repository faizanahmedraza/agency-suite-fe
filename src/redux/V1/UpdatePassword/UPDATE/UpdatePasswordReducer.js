import PASSWORD_UPDATE from "@store/V1/UpdatePassword/ActionTypes";

const PasswordUpdateReducer = (
    state = {
        loading: false,
    },
    action
) => {
    switch (action.type) {
        case PASSWORD_UPDATE.PASSWORD_UPDATE:
            return {
                ...state,
                loading: true,
            }
        case PASSWORD_UPDATE.PASSWORD_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case PASSWORD_UPDATE.PASSWORD_UPDATE_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default PasswordUpdateReducer;

import ForgotPassword from "@store/V1/Auth/Register/ActionTypes";

const forgotPassword = (
    state = {
        loading: false,
    },
    action
) => {
    switch (action.type) {
        case ForgotPassword.POST_FORGOT_PASSWORD:
            return {
                ...state,
                loading: true,
            };
        case ForgotPassword.POST_FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case ForgotPassword.POST_FORGOT_PASSWORD_FAILED:
            return {
                ...state, loading: false,
            };
        default:
            return state;
    }
};

export default forgotPassword;

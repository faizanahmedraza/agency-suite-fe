import VERIFICATION from "@store/V1/Auth/Verification/ActionTypes";

const verification = (
    state = {
        loading: false,
        err_mess: "",
    },
    action
) => {
    switch (action.type) {
        case VERIFICATION.POST_VERIFICATION:
            return {
                ...state,
                loading: true,
                err_mess: null,
            };
        case VERIFICATION.POST_VERIFICATION_SUCCESS:
            return { ...state, loading: false };
        case VERIFICATION.POST_VERIFICATION_FAILED:
            return { ...state, loading: false, err_mess: action.response };
        default:
            return state;
    }
};

export default verification;

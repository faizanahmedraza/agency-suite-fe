import REGISTER from "@store/V1/Auth/Register/ActionTypes";

const registration = (
    state = {
        loading: false,
        err_mess: "",
    },
    action
) => {
    switch (action.type) {
        case REGISTER.POST_REGISTRATION:
            return {
                ...state,
                loading: true,
                err_mess: null,
            };
        case REGISTER.POST_REGISTRATION_SUCCESS:
            return { ...state, loading: false };
        case REGISTER.POST_REGISTRATION_FAILED:
            return { ...state, loading: false, err_mess: action.response };
        default:
            return state;
    }
};

export default registration;

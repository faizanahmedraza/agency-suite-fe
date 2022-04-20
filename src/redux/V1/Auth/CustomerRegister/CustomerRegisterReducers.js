import CUSTOMER_REGISTER from "@store/V1/Auth/CustomerRegister/ActionTypes";

const CustomerRegistrationReducer = (
    state = {
        loading: false,
        err_mess: "",
    },
    action
) => {
    switch (action.type) {
        case CUSTOMER_REGISTER.CUSTOMER_POST_REGISTRATION:
            return {
                ...state,
                loading: true,
                err_mess: null,
            };
        case CUSTOMER_REGISTER.CUSTOMER_POST_REGISTRATION_SUCCESS:
            return { ...state, loading: false };
        case CUSTOMER_REGISTER.CUSTOMER_POST_REGISTRATION_FAILED:
            return { ...state, loading: false, err_mess: action.response };
        default:
            return state;
    }
};

export default CustomerRegistrationReducer;

import CUSTOMER from "@store/V1/Customer/ActionType";

const CustomerCreateReducer = (
    state = {
        loading: false,
        success: false,
        error: null
    },
    action
) => {
    switch (action.type) {
        case CUSTOMER.CUSTOMER_CREATE:
            return {
                ...state,
                loading: true,
            }
        case CUSTOMER.CUSTOMER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case CUSTOMER.CUSTOMER_CREATE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.response.message
            }
        default:
            return state
    }
}

export default CustomerCreateReducer;

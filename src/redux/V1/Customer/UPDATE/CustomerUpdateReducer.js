import CUSTOMER from "@store/V1/Customer/ActionType";

const CustomerUpdateReducer = (
    state = {
        loading: false,
        success: false,
        customer: {},
        error: null
    },
    action
) => {
    switch (action.type) {
        case CUSTOMER.CUSTOMER_UPDATE:
            return {
                ...state,
                loading: true,
                customer: {},
            }
        case CUSTOMER.CUSTOMER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                customer: action.response.customer,
            }
        case CUSTOMER.CUSTOMER_UPDATE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.response.message
            }
        default:
            return state
    }
}

export default CustomerUpdateReducer;

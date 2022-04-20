import CUSTOMER from "@store/V1/Customer/ActionType";

const CustomerStatusReducer = (
    state = {
        loading: false,
        isChanged : false
    },
    action
) => {
    switch (action.type) {
        case CUSTOMER.CUSTOMER_STATUS:
            return {
                ...state,
                loading: true,
                isChanged : false
            }
        case CUSTOMER.CUSTOMER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isChanged : true
            }
        case CUSTOMER.CUSTOMER_STATUS_FAILED:
            return {
                ...state,
                loading: false,
                isChanged : false
            }
        default:
            return state
    }
}

export default CustomerStatusReducer;

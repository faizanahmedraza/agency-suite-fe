import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const BillingInformationCreateReducer = (
    state = {
        loading: false,
        success: false,
        error: null
    },
    action
) => {
    switch (action.type) {
        case BILLING_INFORMATION.BILLING_INFORMATION_CREATE:
            return {
                ...state,
                loading: true,
                success: false
            }
        case BILLING_INFORMATION.BILLING_INFORMATION_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case BILLING_INFORMATION.BILLING_INFORMATION_CREATE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.response.message
            }
        default:
            return state
    }
}

export default BillingInformationCreateReducer;

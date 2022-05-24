import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const BillingInformationUpdateReducer = (
    state = {
        loading: false,
        success: false,
        customer_billing_information: {},
        error: null
    },
    action
) => {
    switch (action.type) {
        case BILLING_INFORMATION.BILLING_INFORMATION_UPDATE:
            return {
                ...state,
                loading: true,
            }
        case BILLING_INFORMATION.BILLING_INFORMATION_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            }
        case BILLING_INFORMATION.BILLING_INFORMATION_UPDATE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.response.message
            }
        default:
            return state
    }
}

export default BillingInformationUpdateReducer;

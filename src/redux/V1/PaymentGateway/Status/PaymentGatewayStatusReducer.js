import PAYMENT_GATEWAY from "@store/V1/PaymentGateway/ActionTypes"

const PaymentGatewayStatusReducer = (
    state = {
        loading: false,
        success: false,
        isChanged: false,
    },
    action
) => {
    switch (action.type) {
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_STATUS:
            return {
                ...state,
                loading: true,
                isChanged: false,
            }
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isChanged: true,
            }
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_STATUS_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
            }
        default:
            return state
    }
}

export default PaymentGatewayStatusReducer;

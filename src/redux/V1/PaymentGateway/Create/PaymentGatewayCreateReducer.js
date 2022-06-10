import PAYMENT_GATEWAY from "@store/V1/PaymentGateway/ActionTypes"

const PaymentGatewayCreateReducer = (
    state = {
        loading: false,
        success: false,
    },
    action
) => {
    switch (action.type) {
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_CREATE:
            return {
                ...state,
                loading: true,
            }
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_CREATE_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default PaymentGatewayCreateReducer;

import PAYMENT_GATEWAY from "@store/V1/PaymentGateway/ActionTypes"

const PaymentGatewayCreateReducer = (
    state = {
        loading: false,
        gateway: {},
        success: false,
    },
    action
) => {
    switch (action.type) {
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_CREATE:
            return {
                ...state,
                loading: true,
                gateway: {},
                success: false
            }
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                gateway: action.response.payment_gateway,
            }
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_CREATE_FAILED:
            return {
                ...state,
                loading: false,
                gateway: {},
            }
        default:
            return state
    }
}

export default PaymentGatewayCreateReducer;

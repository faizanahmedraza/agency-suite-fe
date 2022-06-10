import PAYMENT_GATEWAY from "@store/V1/PaymentGateway/ActionTypes"

const PaymentGatewayListReducer = (
    state = {
        loading: false,
        gateway: {},
        isFetched: false,
    },
    action
) => {
    switch (action.type) {
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_DETAIL:
            return {
                ...state,
                loading: true,
                gateway: null,
            }
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                gateway: action.response.payment_gateway,
                isFetched: true,
            }
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_DETAIL_FAILED:
            return {
                ...state,
                loading: false,
                gateway: null,
            }
        default:
            return state
    }
}

export default PaymentGatewayListReducer;

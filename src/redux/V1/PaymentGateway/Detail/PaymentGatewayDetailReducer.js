import PAYMENT_GATEWAY from "@store/V1/PaymentGateway/ActionTypes"

const PaymentGatewayListReducer = (
    state = {
        loading: false,
        services: [],
        pagination : null,
        isFetched: false,
    },
    action
) => {
    switch (action.type) {
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_DETAIL:
            return {
                ...state,
                loading: true,
                isFetched: false,
            }
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.response.services,
                pagination : action.response.pagination,
                isFetched: true,
            }
        case PAYMENT_GATEWAY.PAYMENT_GATEWAY_DETAIL_FAILED:
            return {
                ...state,
                loading: false,
                isFetched: false,
            }
        default:
            return state
    }
}

export default PaymentGatewayListReducer;

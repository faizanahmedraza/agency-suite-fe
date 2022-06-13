import PAYMENT_GATEWAY from "@store/V1/PaymentGateway/ActionTypes"

const paymentGatewayStatus = (data) => {
    return {
        type: PAYMENT_GATEWAY.PAYMENT_GATEWAY_STATUS,
        request: data
    };
};
const paymentGatewayStatusSuccess = (data) => {
    return {
        type: PAYMENT_GATEWAY.PAYMENT_GATEWAY_STATUS_SUCCESS,
        response: data,
    };
};
const paymentGatewayStatusFailed = () => {
    return {
        type: PAYMENT_GATEWAY.PAYMENT_GATEWAY_STATUS_FAILED,
    };
};

const PaymentGatewayStatusAction = {
    paymentGatewayStatus,
    paymentGatewayStatusSuccess,
    paymentGatewayStatusFailed
}

export default PaymentGatewayStatusAction;
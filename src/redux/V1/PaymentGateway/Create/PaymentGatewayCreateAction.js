import PAYMENT_GATEWAY from "@store/V1/PaymentGateway/ActionTypes"

const paymentGatewayCreate = (data) => {
    return {
        type: PAYMENT_GATEWAY.PAYMENT_GATEWAY_CREATE,
        request: data
    };
};
const paymentGatewayCreateSuccess = (data) => {
    return {
        type: PAYMENT_GATEWAY.PAYMENT_GATEWAY_CREATE_SUCCESS,
        response: data,
    };
};
const paymentGatewayCreateFailed = () => {
    return {
        type: PAYMENT_GATEWAY.PAYMENT_GATEWAY_CREATE_FAILED,
    };
};

const PaymentGatewayCreateAction = {
    paymentGatewayCreate,
    paymentGatewayCreateSuccess,
    paymentGatewayCreateFailed
}

export default PaymentGatewayCreateAction;
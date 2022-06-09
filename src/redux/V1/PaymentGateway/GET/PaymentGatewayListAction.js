import PAYMENT_GATEWAY from "@store/V1/PaymentGateway/ActionTypes"

const paymentGatewayList = (data) => {
    return {
        type: PAYMENT_GATEWAY.PAYMENT_GATEWAY_DETAIL,
        request: data
    };
};
const paymentGatewayListSuccess = (data) => {
    return {
        type: PAYMENT_GATEWAY.PAYMENT_GATEWAY_DETAIL_SUCCESS,
        response: data,
    };
};
const paymentGatewayListFailed = () => {
    return {
        type: PAYMENT_GATEWAY.PAYMENT_GATEWAY_DETAIL_FAILED,
    };
};

const ServiceListAction = {
    paymentGatewayList,
    paymentGatewayListSuccess,
    paymentGatewayListFailed
}

export default ServiceListAction;
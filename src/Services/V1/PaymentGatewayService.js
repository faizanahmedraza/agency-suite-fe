import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function paymentGatewayCreate(data) {
    const _data = paymentGatewayCreateBodyData(data)
    const response = await Gateway.authGateway("POST", V1.DOMAIN , V1.agency.payment_gateway.create , _data);
    return response;
}

async function paymentGatewayDetail(params) {
    const response = await Gateway.authGateway("GET", V1.DOMAIN , V1.agency.payment_gateway.detail + params);
    return response;
}

const paymentGatewayCreateBodyData = (data) => {
    let _data = {};

    _data.gateway = data.gateway;
    _data.gateway_id = data.gateway_id;
    _data.gateway_secret = data.gateway_secret;

    return JSON.stringify(_data);
}

const PaymentGatewayService = {
    paymentGatewayDetail,
    paymentGatewayCreate
}

export default PaymentGatewayService;
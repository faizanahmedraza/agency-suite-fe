import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function serviceRequestPost(data) {
    const _data = serviceRequestBody(data);
    const response = await Gateway.authGateway("POST", V1.DOMAIN, V1.customer.service_request, _data);
    return response;
}

async function serviceRequestDetail(data) {
    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.customer.service_request + "/" + data);
    return response;
}

async function serviceRequestList(params) {
    const _params = params ? '?' + params : "";
    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.customer.service_request+_params);
    return response;
}

async function serviceRequestPagination(data) {
    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.customer.service_request + "?page=" + data);
    return response;
}

async function serviceRequestCancel(data) {
    const response = await Gateway.authGateway("PUT", V1.DOMAIN, V1.customer.service_request + "/" + data);
    return response;
}

const serviceRequestBody = (data) => {
    let _data = {};
    _data.service_id = data.service_id;
    _data.recurring_type = data.recurring_type;
    _data.quantity = data.quantity;
    _data.intake_form = [
        {
            title: data.title,
            description: data.description
        }
    ];
    return JSON.stringify(_data);

};

const ServiceRequestService = {
    serviceRequestPost,
    serviceRequestList,
    serviceRequestDetail,
    serviceRequestPagination,
    serviceRequestCancel
}

export default ServiceRequestService;
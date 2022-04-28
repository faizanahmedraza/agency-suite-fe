import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function serviceRequestPost(data) {
    const _data = serviceRequestBody(data);
    const response = await Gateway.authGateway("POST", V1.DOMAIN, V1.agency.service_request, _data);
    return response;
}

async function serviceRequestDetail(data) {
    const response = await Gateway.authGateway("GET",V1.DOMAIN,V1.agency.service_request + "/" + data.id);
    return response;
}

async function serviceRequestList() {
    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.agency.service_request);
    return response;
}

async function serviceRequestPagination(data) {
    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.agency.service_request + "?page=" + data);
    return response;
}

const serviceRequestBody = (data) => {
    let _data = {};

    _data.service_id = data.service_id;
    _data.customer_id = data.customer_id;
    _data.recurring_type = data.recurring_type ;
    _data.intake_form = {
        title: data.title,
        description: data.description
    }

    return JSON.stringify(_data);

};

const AgencyServiceRequest = {
    serviceRequestPost,
    serviceRequestList,
    serviceRequestDetail,
    serviceRequestPagination,
}

export default AgencyServiceRequest;
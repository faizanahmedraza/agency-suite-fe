import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function serviceList() {
    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.customer.services);
    return response;
}

async function serviceDetail(id) {
    const response = await Gateway.authGateway(
        "GET",
        V1.DOMAIN,
        `${V1.customer.services}/${id}`
    );
    return response;
}

async function servicePagination(data) {
    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.customer.services + "?page=" + data);
    return response;
}

const AgencyService = {
    serviceList,
    servicePagination,
    serviceDetail,
}

export default AgencyService;
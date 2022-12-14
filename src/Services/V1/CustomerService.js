import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function customerList(params) {
    const _params = params ? '?' + params : "";
    const response = await Gateway.authGateway(
        "GET",
        V1.DOMAIN,
        `${V1.agency.customers}${_params}`
    );
    return response;
}

async function customerDetail(id) {
    const response = await Gateway.authGateway(
        "GET",
        V1.DOMAIN,
        `${V1.agency.customers}/${id}`
    );
    return response;
}

async function customerPost(data) {
    const response = await Gateway.authGateway(
        "POST",
        V1.DOMAIN,
        V1.agency.customers,
        customerBodyData(data)
    );
    return response;
}

async function customerPut(data, id) {
    const response = await Gateway.authGateway(
        "PUT",
        V1.DOMAIN,
        `${V1.agency.customers}/${id}`,
        customerBodyData(data)
    );
    return response;
}

async function customerDelete(id) {
    const response = await Gateway.authGateway(
        "DELETE",
        V1.DOMAIN,
        `${V1.agency.customers}/${id}`
    );
    return response;
}

async function customerToggleStatus(data) {
    const _data = {};
    _data.status = data.status;
    const response = await Gateway.authGateway("PUT", V1.DOMAIN, V1.agency.change_customer_status + "/" + data.id, JSON.stringify(_data));
    return response;
}

const customerBodyData = (data) => {
    let _data = {};
    _data.first_name = data.first_name;
    _data.last_name = data.last_name;
    _data.email = data.email;
    return JSON.stringify(_data);
}

const CustomerService = {
    customerList,
    customerDetail,
    customerPost,
    customerPut,
    customerDelete,
    customerToggleStatus,
}

export default CustomerService;
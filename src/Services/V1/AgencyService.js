import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function servicePost(data) {
    const _data = serviceBody(data);
    const response = await Gateway.authGateway("POST", V1.DOMAIN, V1.service.create, _data);
    return response;
}

async function serviceList(params) {
    const _params = params ? '?' + params : "";
    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.service.read + _params);
    return response;
}

async function servicePublicList(params) {
    const _params = params ? '?' + params : "";
    const response = await Gateway.guestGateway("GET", V1.DOMAIN, V1.service.public.get+_params);
    return response;
}

async function servicEdit(data) {
    const _data = editServiceBody(data)
    const response = await Gateway.authGateway("PUT", V1.DOMAIN, V1.service.update + "/" + data.id, _data);
    return response;
}

async function serviceDelete(data) {
    const response = await Gateway.authGateway("DELETE", V1.DOMAIN, V1.service.delete + "/" + data);
    return response;
}

async function servicePagination(data) {
    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.service.read + "?page=" + data);
    return response;
}

async function serviceCatalog(data) {
    const response = await Gateway.authGateway("PUT", V1.DOMAIN, V1.service.change_catalog_status + "/" + data);
    return response;
}

async function serviceStatus(data) {
    const _data = {};
    _data.status = data.status;
    const response = await Gateway.authGateway("PUT", V1.DOMAIN, V1.service.change_status + "/" + data.id, JSON.stringify(_data));
    return response;
}

const editServiceBody = (data) => {

    let _data = {};

    _data.name = data.name;
    _data.description = data.description;
    _data.image = data.image ? data.image : "";
    _data.subscription_type = data.subscription_type;

    if (data.subscription_type === "one-off") {
        _data.price = data.price_types.price;
        _data.purchase_limit = data.price_types.purchase_limit;
    }

    if (data.subscription_type === "recurring") {
        _data.weekly = data.price_types.weekly;
        _data.monthly = data.price_types.monthly;
        _data.quarterly = data.price_types.quarterly;
        _data.biannually = data.price_types.biannually;
        _data.annually = data.price_types.annually;
        _data.max_concurrent_requests = data.price_types.max_concurrent_requests;
        _data.max_requests_per_month = data.price_types.max_requests_per_month;
    }

    return JSON.stringify(_data);
}

const serviceBody = (data) => {
    let _data = {};

    _data.name = data.name;
    _data.description = data.description;
    _data.image = data.image;
    _data.subscription_type = data.subscription_type;

    if (data.subscription_type === "one-off") {
        _data.price = data.price;
        _data.purchase_limit = data.purchase_limit;
    }

    if (data.subscription_type === "recurring") {
        _data.weekly = data.weekly;
        _data.monthly = data.monthly;
        _data.quarterly = data.quarterly;
        _data.biannually = data.biannually;
        _data.annually = data.annually;
        _data.max_concurrent_requests = data.max_concurrent_requests;
        _data.max_requests_per_month = data.max_requests_per_month;
    }

    return JSON.stringify(_data);

};

const AgencyService = {
    servicePost,
    serviceList,
    servicEdit,
    serviceDelete,
    servicePagination,
    serviceCatalog,
    serviceStatus,
    servicePublicList
}

export default AgencyService;
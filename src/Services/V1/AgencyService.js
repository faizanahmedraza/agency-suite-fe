import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function servicePost(data) {
    console.log(data)
    const _data = createServiceBody(data);
    const response = await Gateway.authGateway("POST", V1.DOMAIN, V1.service.create, _data);
    return response;
}

async function serviceList() {

    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.service.read);
    return response;
}

const createServiceBody = (data) => {
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
    serviceList
}

export default AgencyService;
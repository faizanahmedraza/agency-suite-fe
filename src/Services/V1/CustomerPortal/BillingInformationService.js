import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function billingInformationList() {
    const response = await Gateway.authGateway(
        "GET",
        V1.DOMAIN,
        `${V1.customer.billing_information}`
    );
    return response;
}

async function billingInformationDetail(id) {
    const response = await Gateway.authGateway(
        "GET",
        V1.DOMAIN,
        `${V1.customer.billing_information}/${id}`
    );
    return response;
}

async function billingInformationPost(data) {
    const response = await Gateway.authGateway(
        "POST",
        V1.DOMAIN,
        V1.customer.billing_information,
        billingInformationBodyData(data)
    );
    return response;
}

async function billingInformationPut(data) {
    const response = await Gateway.authGateway(
        "PUT",
        V1.DOMAIN,
        `${V1.customer.billing_information}`,
        billingInformationBodyData(data)
    );
    return response;
}

const billingInformationBodyData = (data) => {
    let _data = {};
    _data.holder_name = data.holder_name;
    _data.card_no = data.card_no;
    _data.cvc = data.cvc;
    _data.expiry_month = data.expiry_month;
    _data.expiry_year = data.expiry_year;
    _data.country = data.country;
    _data.address = data.address;
    _data.city = data.city;
    _data.state = data.state;
    _data.zip_code = data.zip_code;
    _data.street = data.street;
    return JSON.stringify(_data);
}

const BillingInformationService = {
    billingInformationList,
    billingInformationDetail,
    billingInformationPost,
    billingInformationPut,
}

export default BillingInformationService;
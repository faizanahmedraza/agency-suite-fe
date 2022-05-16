import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function billingInformationDetail() {
    const response = await Gateway.authGateway(
        "GET",
        V1.DOMAIN,
        `${V1.customer.billing_information}`
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
    _data.invoice_to = data.invoice_to;
    _data.country = data.country;
    _data.address = data.address;
    _data.city = data.city;
    _data.state = data.state;
    _data.zip_code = data.zip_code;
    _data.tax_code = data.tax_code;
    return JSON.stringify(_data);
}

const BillingInformationService = {
    billingInformationDetail,
    billingInformationPost,
    billingInformationPut,
}

export default BillingInformationService;
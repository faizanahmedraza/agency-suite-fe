import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function billingInformationList(params) {
    const _params = params ? '?' + params : "";
    const response = await Gateway.authGateway(
        "GET",
        V1.DOMAIN,
        `${V1.agency.billing_information}${_params}`
    );
    return response;
}

const CustomerBillingInformationService = {
    billingInformationList
}

export default CustomerBillingInformationService;
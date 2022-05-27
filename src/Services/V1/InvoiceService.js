import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function invoiceList(params) {
    const _params = params ? '?' + params : "";
    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.agency.invoices+_params);
    return response;
}

async function invoiceDetail(id) {
    const response = await Gateway.authGateway(
        "GET",
        V1.DOMAIN,
        `${V1.agency.invoices}/${id}`
    );
    return response;
}

async function invoiceStatus(data) {
    const response = await Gateway.authGateway("PUT", V1.DOMAIN, V1.agency.invoices + "/change-status/" + data);
    return response;
}

async function invoiceDelete(id) {
    const response = await Gateway.authGateway(
        "DELETE",
        V1.DOMAIN,
        `${V1.agency.invoices}/${id}`
    );
    return response;
}

const InvoiceService = {
    invoiceList,
    invoiceDetail,
    invoiceStatus,
    invoiceDelete,
}

export default InvoiceService;
import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function invoiceList(params) {
    const _params = params ? '?' + params : "";
    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.customer.invoices+_params);
    return response;
}

async function invoiceDetail(id) {
    const response = await Gateway.authGateway(
        "GET",
        V1.DOMAIN,
        `${V1.customer.invoices}/${id}`
    );
    return response;
}

const InvoiceService = {
    invoiceList,
    invoiceDetail,
}

export default InvoiceService;
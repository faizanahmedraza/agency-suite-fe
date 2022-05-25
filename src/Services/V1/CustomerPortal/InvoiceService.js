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

async function invoicePaidPut(data) {
    const response = await Gateway.authGateway(
        "PUT",
        V1.DOMAIN,
        `${V1.customer.invoice_paid}`,
        invoicePaidBodyData(data)
    );
    return response;
}

const invoicePaidBodyData = (data) => {
    let _data = {};
    _data.card_id = data.card_id;
    _data.invoice_id = data.invoice_id;
    return JSON.stringify(_data);
}

const InvoiceService = {
    invoiceList,
    invoiceDetail,
    invoicePaidPut
}

export default InvoiceService;
import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function invoiceList(params) {
    const _params = params ? '?' + params : "";
    const response = await Gateway.authGateway("GET", V1.DOMAIN, V1.agency.invoices + _params);
    return response;
}

async function invoicePost(data) {
    const _data = invoiceBody(data);
    alert(_data)
    const response = await Gateway.authGateway("POST", V1.DOMAIN, V1.agency.invoices, _data);
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

async function invoicePaidPut(data) {
    const response = await Gateway.authGateway(
        "PUT",
        V1.DOMAIN,
        `${V1.agency.invoices + "/invoice-paid"}`,
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

const invoiceBody = (data) => {
    let _data = {};

    _data.invoice_type = data.invoice_type;
    _data.customer_id = data.customer_id;

    if (_data.invoice_type == "custom") {
        _data.invoice_items = data.invoice_items;
    } else {
        _data.service_id = data.service_id;
        _data.recurring_type = data.recurring_type;
        _data.quantity = data.quantity;
        _data.intake_form = [
            {
                title: data.title,
                description: data.description
            }
        ];
    }

    return JSON.stringify(_data);

};

const InvoiceService = {
    invoiceList,
    invoicePost,
    invoiceDetail,
    invoiceStatus,
    invoiceDelete,
    invoicePaidPut
}

export default InvoiceService;
import INVOICE from "@store/V1/Invoice/ActionTypes"

const invoiceCreate = (data) => {
    return {
        type: INVOICE.INVOICE_CREATE,
        request: data,
    };
};
const invoiceCreateSuccess = (data) => {
    return {
        type: INVOICE.INVOICE_CREATE_SUCCESS,
        response: data,
    };
};
const invoiceCreateFailed = (data) => {
    return {
        type: INVOICE.INVOICE_CREATE_FAILED,
        response: data,
    };
};

const InvoiceCreateAction = {
    invoiceCreate,
    invoiceCreateSuccess,
    invoiceCreateFailed
}

export default InvoiceCreateAction;
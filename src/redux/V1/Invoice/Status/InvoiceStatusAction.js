import INVOICE from "@store/V1/Invoice/ActionTypes"

const invoiceStatus = (id) => {
    return {
        type: INVOICE.INVOICE_STATUS,
        request: id
    };
};
const invoiceStatusSuccess = (data) => {
    return {
        type: INVOICE.INVOICE_STATUS_SUCCESS,
        response: data,
    };
};
const invoiceStatusFailed = () => {
    return {
        type: INVOICE.INVOICE_STATUS_FAILED,
    };
};

const InvoiceStatusAction = {
    invoiceStatus,
    invoiceStatusSuccess,
    invoiceStatusFailed
}

export default InvoiceStatusAction;
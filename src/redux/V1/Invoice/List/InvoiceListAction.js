import INVOICE from "@store/V1/Invoice/ActionTypes"

const invoiceList = (data) => {
    return {
        type: INVOICE.INVOICE_LIST,
        request: data,
    };
};

const invoiceListSuccess = (data) => {
    return {
        type: INVOICE.INVOICE_LIST_SUCCESS,
        response: data,
    };
};
const invoiceListFailed = () => {
    return {
        type: INVOICE.INVOICE_LIST_FAILED,
    };
};

const InvoiceListAction = {
    invoiceList,
    invoiceListSuccess,
    invoiceListFailed
}

export default InvoiceListAction;
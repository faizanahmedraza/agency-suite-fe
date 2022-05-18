import INVOICE from "@store/V1/CustomerPortal/Invoice/ActionTypes"

const invoiceList = (data) => {
    return {
        type: INVOICE.CUSTOMER_INVOICE_LIST,
        request: data,
    };
};

const invoiceListSuccess = (data) => {
    return {
        type: INVOICE.CUSTOMER_INVOICE_LIST_SUCCESS,
        response: data,
    };
};
const invoiceListFailed = () => {
    return {
        type: INVOICE.CUSTOMER_INVOICE_LIST_FAILED,
    };
};

const InvoiceListAction = {
    invoiceList,
    invoiceListSuccess,
    invoiceListFailed
}

export default InvoiceListAction;
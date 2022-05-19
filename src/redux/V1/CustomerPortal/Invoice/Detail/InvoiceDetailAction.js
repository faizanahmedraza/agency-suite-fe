import INVOICE from "@store/V1/CustomerPortal/Invoice/ActionTypes"

const invoiceDetail = (id) => {
  return {
    type: INVOICE.CUSTOMER_INVOICE_DETAIL,
    request: id,
  };
};

const invoiceDetailSuccess = (data) => {
  return {
    type: INVOICE.CUSTOMER_INVOICE_DETAIL_SUCCESS,
    response: data,
  };
};

const invoiceDetailFailed = (data) => {
  return {
    type: INVOICE.CUSTOMER_INVOICE_DETAIL_FAILED,
    response: data,
  };
};

const InvoiceDetailAction = {
  invoiceDetail,
  invoiceDetailSuccess,
  invoiceDetailFailed,
};

export default InvoiceDetailAction;

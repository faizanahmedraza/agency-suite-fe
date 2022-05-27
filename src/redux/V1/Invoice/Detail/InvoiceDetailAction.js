import INVOICE from "@store/V1/Invoice/ActionTypes"

const invoiceDetail = (id) => {
  return {
    type: INVOICE.INVOICE_DETAIL,
    request: id,
  };
};

const invoiceDetailSuccess = (data) => {
  return {
    type: INVOICE.INVOICE_DETAIL_SUCCESS,
    response: data,
  };
};

const invoiceDetailFailed = (data) => {
  return {
    type: INVOICE.INVOICE_DETAIL_FAILED,
    response: data,
  };
};

const InvoiceDetailAction = {
  invoiceDetail,
  invoiceDetailSuccess,
  invoiceDetailFailed,
};

export default InvoiceDetailAction;

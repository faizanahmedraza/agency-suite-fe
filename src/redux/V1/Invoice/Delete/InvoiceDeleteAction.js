import INVOICE from "@store/V1/Invoice/ActionTypes"

const invoiceDelete = (id) => {
  return {
    type: INVOICE.INVOICE_DELETE,
    request: id,
  };
};

const invoiceDeleteSuccess = (data) => {
  return {
    type: INVOICE.INVOICE_DELETE_SUCCESS,
    response: data,
  };
};

const invoiceDeleteFailed = (data) => {
  return {
    type: INVOICE.INVOICE_DELETE_FAILED,
    response: data,
  };
};

const InvoiceDeleteAction = {
  invoiceDelete,
  invoiceDeleteSuccess,
  invoiceDeleteFailed,
};

export default InvoiceDeleteAction;

import INVOICE from "@store/V1/CustomerPortal/Invoice/ActionTypes"

const invoicePaid = (data) => {
  return {
    type: INVOICE.CUSTOMER_INVOICE_PAID,
    request: data,
  };
};

const invoicePaidSuccess = (data) => {
  return {
    type: INVOICE.CUSTOMER_INVOICE_PAID_SUCCESS,
    response: data,
  };
};

const invoicePaidFailed = (data) => {
  return {
    type: INVOICE.CUSTOMER_INVOICE_PAID_FAILED,
    response: data,
  };
};

const InvoicePaidAction = {
  invoicePaid,
  invoicePaidSuccess,
  invoicePaidFailed,
};

export default InvoicePaidAction;

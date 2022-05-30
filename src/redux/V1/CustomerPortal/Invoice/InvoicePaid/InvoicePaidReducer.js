import INVOICE from "@store/V1/CustomerPortal/Invoice/ActionTypes"

const InvoicePaidReducer = (
  state = {
    loading: false,
    success: false,
    error: null,
    isPaid: false
  },
  action
) => {
  switch (action.type) {
    case INVOICE.CUSTOMER_INVOICE_PAID:
      return {
        ...state,
        loading: true,
      };
    case INVOICE.CUSTOMER_INVOICE_PAID_SUCCESS:
      return {
        ...state,
        loading: false,
        isPaid: true
      };
    case INVOICE.CUSTOMER_INVOICE_PAID_FAILED:
      return {
         ...state,
          loading: false,
          error: action.response.message,
      };
    default:
      return state;
  }
};

export default InvoicePaidReducer;

import INVOICE from "@store/V1/Invoice/ActionTypes"

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
    case INVOICE.INVOICE_PAID:
      return {
        ...state,
        loading: true,
      };
    case INVOICE.INVOICE_PAID_SUCCESS:
      return {
        ...state,
        loading: false,
        isPaid: true
      };
    case INVOICE.INVOICE_PAID_FAILED:
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

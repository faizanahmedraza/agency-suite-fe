import INVOICE from "@store/V1/Invoice/ActionTypes"

const InvoiceDeleteReducer = (
  state = {
    loading: false,
    isDeleted : false
  },
  action
) => {
  switch (action.type) {
    case INVOICE.INVOICE_DELETE:
      return {
        ...state,
        loading: true,
        isDeleted : false
      };
    case INVOICE.INVOICE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted : true
      };
    case INVOICE.INVOICE_DELETE_FAILED:
      return {
        ...state,
        loading: false,
        isDeleted : false
      };
    default:
      return state;
  }
};

export default InvoiceDeleteReducer;

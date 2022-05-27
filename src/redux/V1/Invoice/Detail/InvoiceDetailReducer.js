import INVOICE from "@store/V1/Invoice/ActionTypes"

const InvoiceDetailReducer = (
  state = {
    loading: false,
    customer_invoice: {
      invoice_number: "",
      customer_service_request: {
        service: {
          id: "",
          name: "",
          description: "",
          subscription_type: "",
          price_types: {
            weekly: "",
            monthly: "",
            quarterly: "",
            biannually: "",
            annually: "",
            price: "",
            purchase_limit: ""
          }
        },
        is_recurring: false,
        recurring_type: "",
        intake_form: [],
        status: "",
      },
      is_paid: false,
      amount: "",
    },
    error: null,
    fetched: false,
  },
  action
) => {
  switch (action.type) {
    case INVOICE.INVOICE_DETAIL:
      return {
        ...state,
        loading: true,
      };
    case INVOICE.INVOICE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        customer_invoice: action.response.customer_invoice,
        fetched: true,
      };
    case INVOICE.INVOICE_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.response
      };
    default:
      return state;
  }
};

export default InvoiceDetailReducer;

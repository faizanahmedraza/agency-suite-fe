import INVOICE from "@store/V1/Invoice/ActionTypes";

const customer_invoice = {
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
        purchase_limit: "",
      },
    },
    is_recurring: false,
    recurring_type: "",
    intake_form: [],
    status: "",
  },
  customer: {
    email: null,
    first_name: null,
    id: null,
    last_logged_in: null,
    last_name: null,
    status: null,
  },
  is_paid: "no",
  paid_at: "",
  amount: "",
};

const InvoiceDetailReducer = (
  state = {
    loading: false,
    customer_invoice: { ...customer_invoice },
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
        customer_invoice: { ...customer_invoice },
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
        error: action.response,
        customer_invoice: null,
      };
    case INVOICE.INVOICE_DETAIL_EMPTY:
      return {
        ...state,
        loading: false,
        customer_invoice: { ...customer_invoice },
        fetched: false,
      };
    default:
      return state;
  }
};

export default InvoiceDetailReducer;

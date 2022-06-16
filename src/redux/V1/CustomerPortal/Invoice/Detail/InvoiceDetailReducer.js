import INVOICE from "@store/V1/CustomerPortal/Invoice/ActionTypes"


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
      is_paid: "no",
      amount: "",
    },
    error: null,
    fetched: false,
  },
  action
) => {
  switch (action.type) {
    case INVOICE.CUSTOMER_INVOICE_DETAIL:
      return {
        ...state,
        loading: true,
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
          is_paid: "no",
          amount: "",
        }
      };
    case INVOICE.CUSTOMER_INVOICE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        customer_invoice: action.response.customer_invoice,
        fetched: true,
      };
    case INVOICE.CUSTOMER_INVOICE_DETAIL_FAILED:
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

import SERVICE_REQUEST from "@store/V1/CustomerPortal/ServiceRequest/ActionTypes"

const ServiceRequestDetailReducer = (
  state = {
    loading: false,
    serivice_request: {
      customer: {
        id: null,
        first_name: null,
        last_name: null,
      },
      service: {
        id: null,
        name: null,
        price_types: {
          weekly: null,
          monthly: null,
          quarterly: null,
          biannually: null,
          annually: null,
          price: null,
        }
      },
      recurring_type: null,
      is_recurring: false,
      intake_form: {
        title: null,
        description: null
      }
    },
    error: null,
    fetched: false,
  },
  action
) => {
  switch (action.type) {
    case SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_DETAIL:
      return {
        ...state,
        loading: true,
        serivice_request: {...state.serivice_request}
      };
    case SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        serivice_request: action.response.customer_service_request,
        fetched: true,
      };
    case SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.response.message
      };
    default:
      return state;
  }
};

export default ServiceRequestDetailReducer;

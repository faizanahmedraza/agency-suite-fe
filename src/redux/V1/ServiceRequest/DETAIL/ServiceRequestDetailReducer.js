import SERVICE_REQUEST from "@store/V1/ServiceRequest/ActionTypes"

const ServiceRequestDetailReducer = (
  state = {
    loading: false,
    serivice_request: {
      service_id: null,
      customer_id: null,
      recurring_type: null,
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
    case SERVICE_REQUEST.SERVICE_REQUEST_DETAIL:
      return {
        ...state,
        loading: true,
      };
    case SERVICE_REQUEST.SERVICE_REQUEST_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        serivice_request: action.response.customer_service_request,
        fetched: true,
      };
    case SERVICE_REQUEST.SERVICE_REQUEST_DETAIL_FAILED:
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

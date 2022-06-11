import SERVICE from "@store/V1/CustomerPortal/Service/ActionTypes"

const ServiceDetailReducer = (
  state = {
    loading: false,
    service: {},
    error: null,
    fetched: false,
  },
  action
) => {
  switch (action.type) {
    case SERVICE.CUSTOMER_SERVICE_DETAIL:
      return {
        ...state,
        loading: true,
        service: {}
      };
    case SERVICE.CUSTOMER_SERVICE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        service: action.response.service,
        fetched: true,
      };
    case SERVICE.CUSTOMER_SERVICE_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.response
      };
    default:
      return state;
  }
};

export default ServiceDetailReducer;

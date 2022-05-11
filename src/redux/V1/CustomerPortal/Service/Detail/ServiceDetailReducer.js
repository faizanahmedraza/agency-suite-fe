import SERVICE from "@store/V1/CustomerPortal/Service/ActionTypes"

const ServiceDetailReducer = (
  state = {
    loading: false,
    service: {
      id: null,
      name: null,
      description: null,
      image: null,
      subscription_type: null,
      price_types: {
        price: null,
        purchase_limit: null,
        weekly: null,
        monthly: null,
        quarterly: null,
        biannually: null,
        annually: null,
        max_concurrent_requests: null,
        max_requests_per_month: null,
      },
      intakes: {
        intake: [
          {
            field: null,
            name: null
          },
          {
            field: null,
            name: null
          }
        ],
      },
    },
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

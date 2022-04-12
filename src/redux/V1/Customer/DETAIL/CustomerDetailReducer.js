import CUSTOMER from "@store/V1/Customer/ActionType";

const CustomerDetailReducer = (
  state = {
    loading: false,
    customer: {
      first_name: null,
      last_name: null,
      email: null,
      status: null,
      last_logged_in: null,
    },
    error: null,
    fetched: false,
  },
  action
) => {
  switch (action.type) {
    case CUSTOMER.CUSTOMER_DETAIL:
      return {
        ...state,
        loading: true,
      };
    case CUSTOMER.CUSTOMER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.response.customer,
        fetched: true,
      };
    case CUSTOMER.CUSTOMER_DETAIL_FAILED:
      return {
         ...state,
          loading: false,
          error: action.response.message
      };
    default:
      return state;
  }
};

export default CustomerDetailReducer;

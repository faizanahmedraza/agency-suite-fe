import CUSTOMER from "@store/V1/Customer/ActionType";

const CustomerFirstReducer = (
  state = {
    loading: false,
    customer: {
      first_name: null,
      last_name: null,
      email: null,
      status: null,
      last_logged_in: null,
    },
    err_mess: null,
    fetched: false,
  },
  action
) => {
  switch (action.type) {
    case CUSTOMER.CUSTOMER_FIRST:
      return {
        ...state,
        loading: true,
        fetched: false,
      };
    case CUSTOMER.CUSTOMER_FIRST_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.response.customer,
        fetched: true,
      };
    case CUSTOMER.CUSTOMER_FIRST_FAILED:
      return { ...state, loading: false, err_mess: action.response };
    default:
      return state;
  }
};

export default CustomerFirstReducer;

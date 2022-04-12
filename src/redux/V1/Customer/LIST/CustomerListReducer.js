import CUSTOMER from "@store/V1/Customer/ActionType";

const CustomerListReducer = (
  state = {
    loading: false,
    error: null,
    customers: [],
    pagination: {},
  },
  action
) => {
  switch (action.type) {
    case CUSTOMER.CUSTOMER_LIST:
      return {
        ...state,
        loading: true,
        error: null,
        customers: [],
        pagination: {},
      };
    case CUSTOMER.CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: action.response.customers,
        pagination: action.response.pagination,
      };
    case CUSTOMER.CUSTOMER_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.response.message,
        customers: [],
        pagination: {},
      };
    default:
      return state;
  }
};
export default CustomerListReducer;

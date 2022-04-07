import CUSTOMER from "@store/V1/Customer/ActionType";

const CustomerDeleteReducer = (
  state = {
    loading: false,
    success: false,
    customer_delete: {},
    err_mess: "",
  },
  action
) => {
  switch (action.type) {
    case CUSTOMER.CUSTOMER_DELETE:
      return {
        ...state,
        loading: true,
        err_mess: null,
      };
    case CUSTOMER.CUSTOMER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        customer_delete: action.response,
      };
    case CUSTOMER.CUSTOMER_DELETE_FAILED:
      return { ...state, loading: false, err_mess: action.response };
    default:
      return state;
  }
};

export default CustomerDeleteReducer;

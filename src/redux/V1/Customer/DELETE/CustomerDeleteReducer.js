import CUSTOMER from "@store/V1/Customer/ActionType";

const CustomerDeleteReducer = (
  state = {
    loading: false,
    success: false,
    error: null,
    isDeleted: false
  },
  action
) => {
  switch (action.type) {
    case CUSTOMER.CUSTOMER_DELETE:
      return {
        ...state,
        loading: true,
        isDeleted: false
      };
    case CUSTOMER.CUSTOMER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isDeleted: true,
      };
    case CUSTOMER.CUSTOMER_DELETE_FAILED:
      return {
         ...state,
          loading: false,
          error: action.response.message
        };
    default:
      return state;
  }
};

export default CustomerDeleteReducer;

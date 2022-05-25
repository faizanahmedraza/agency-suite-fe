import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const DeleteReducer = (
  state = {
    loading: false,
    success: false,
    error: null,
    isDeleted: false
  },
  action
) => {
  switch (action.type) {
    case BILLING_INFORMATION.BILLING_INFORMATION_DELETE:
      return {
        ...state,
        loading: true,
        isDeleted: false
      };
    case BILLING_INFORMATION.BILLING_INFORMATION_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true
      };
    case BILLING_INFORMATION.BILLING_INFORMATION_DELETE_FAILED:
      return {
         ...state,
          loading: false,
          error: action.response.message,
          isDeleted: false
      };
    default:
      return state;
  }
};

export default DeleteReducer;

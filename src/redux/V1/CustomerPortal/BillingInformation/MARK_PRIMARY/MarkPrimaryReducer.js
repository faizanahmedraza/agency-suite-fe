import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const MarkPrimaryReducer = (
  state = {
    loading: false,
    success: false,
    error: null,
    isPrimary: false
  },
  action
) => {
  switch (action.type) {
    case BILLING_INFORMATION.MARK_PRIMARY:
      return {
        ...state,
        loading: true,
        isPrimary: false
      };
    case BILLING_INFORMATION.MARK_PRIMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        isPrimary: true
      };
    case BILLING_INFORMATION.MARK_PRIMARY_FAILED:
      return {
         ...state,
          loading: false,
          error: action.response.message,
          isPrimary: false
      };
    default:
      return state;
  }
};

export default MarkPrimaryReducer;

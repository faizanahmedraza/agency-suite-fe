import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const PaymentMethodReducer = (
  state = {
    loading: false,
    success: false,
    error: null,
    isPaid: false
  },
  action
) => {
  switch (action.type) {
    case BILLING_INFORMATION.PAYMENT_METHOD:
      return {
        ...state,
        loading: true,
        isPaid: false
      };
    case BILLING_INFORMATION.PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        loading: false,
        isPaid: true
      };
    case BILLING_INFORMATION.PAYMENT_METHOD_FAILED:
      return {
         ...state,
          loading: false,
          error: action.response.message,
          isPaid: false
      };
    default:
      return state;
  }
};

export default PaymentMethodReducer;

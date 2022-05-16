import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const BillingInformationDetailReducer = (
  state = {
    loading: false,
    customer_billing_information: {},
    error: null,
    fetched: false,
  },
  action
) => {
  switch (action.type) {
    case BILLING_INFORMATION.BILLING_INFORMATION_DETAIL:
      return {
        ...state,
        loading: true,
      };
    case BILLING_INFORMATION.BILLING_INFORMATION_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        customer_billing_information: action.response.customer_billing_information,
        fetched: true,
      };
    case BILLING_INFORMATION.BILLING_INFORMATION_DETAIL_FAILED:
      return {
         ...state,
          loading: false,
          error: action.response.message
      };
    default:
      return state;
  }
};

export default BillingInformationDetailReducer;

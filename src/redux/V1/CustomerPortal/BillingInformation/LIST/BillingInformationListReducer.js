import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const BillingInformationListReducer = (
  state = {
    loading: false,
    customer_billing_information: [],
    pagination : null
  },
  action
) => {
  switch (action.type) {
    case BILLING_INFORMATION.BILLING_INFORMATION_LIST:
      return {
        ...state,
        loading: true,
      };
    case BILLING_INFORMATION.BILLING_INFORMATION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        customer_billing_information: action.response.customer_billing_information,
        fetched: true,
      };
    case BILLING_INFORMATION.BILLING_INFORMATION_LIST_FAILED:
      return {
         ...state,
          loading: false,
          error: action.response.message
      };
    default:
      return state;
  }
};

export default BillingInformationListReducer;

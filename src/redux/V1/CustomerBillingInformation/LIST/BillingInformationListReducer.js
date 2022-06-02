import CUSTOMER_BILLING_INFORMATION from "@store/V1/CustomerBillingInformation/ActionType";

const BillingInformationListReducer = (
  state = {
    loading: false,
    customer_billing_information: [],
    fetched: false,
  },
  action
) => {
  switch (action.type) {
    case CUSTOMER_BILLING_INFORMATION.CUSTOMER_BILLING_INFORMATION_LIST:
      return {
        ...state,
        loading: true,
      };
    case CUSTOMER_BILLING_INFORMATION.CUSTOMER_BILLING_INFORMATION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        customer_billing_information: action.response.customer_billing_information,
        fetched: true,
      };
    case CUSTOMER_BILLING_INFORMATION.CUSTOMER_BILLING_INFORMATION_LIST_FAILED:
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

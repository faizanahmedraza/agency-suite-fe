import CUSTOMER_BILLING_INFORMATION from "@store/V1/CustomerBillingInformation/ActionType";

const billingInformationList = (data) => {
  return {
    type: CUSTOMER_BILLING_INFORMATION.CUSTOMER_BILLING_INFORMATION_LIST,
    request: data,
  };
};

const billingInformationListSuccess = (data) => {
  return {
    type: CUSTOMER_BILLING_INFORMATION.CUSTOMER_BILLING_INFORMATION_LIST_SUCCESS,
    response: data,
  };
};

const billingInformationListFailed = (data) => {
  return {
    type: CUSTOMER_BILLING_INFORMATION.CUSTOMER_BILLING_INFORMATION_LIST_FAILED,
    response: data,
  };
};

const BillingInformationListAction = {
  billingInformationList,
  billingInformationListSuccess,
  billingInformationListFailed,
};

export default BillingInformationListAction;

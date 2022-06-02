import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const billingInformationList = () => {
  return {
    type: BILLING_INFORMATION.BILLING_INFORMATION_LIST,
  };
};

const billingInformationListSuccess = (data) => {
  return {
    type: BILLING_INFORMATION.BILLING_INFORMATION_LIST_SUCCESS,
    response: data,
  };
};

const billingInformationListFailed = (data) => {
  return {
    type: BILLING_INFORMATION.BILLING_INFORMATION_LIST_FAILED,
    response: data,
  };
};

const BillingInformationListAction = {
  billingInformationList,
  billingInformationListSuccess,
  billingInformationListFailed,
};

export default BillingInformationListAction;

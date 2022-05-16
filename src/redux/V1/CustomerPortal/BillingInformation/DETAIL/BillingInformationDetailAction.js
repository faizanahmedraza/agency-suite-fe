import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const billingInformationDetail = (id) => {
  return {
    type: BILLING_INFORMATION.BILLING_INFORMATION_DETAIL,
    request: id,
  };
};

const billingInformationDetailSuccess = (data) => {
  return {
    type: BILLING_INFORMATION.BILLING_INFORMATION_DETAIL_SUCCESS,
    response: data,
  };
};

const billingInformationDetailFailed = (data) => {
  return {
    type: BILLING_INFORMATION.BILLING_INFORMATION_DETAIL_FAILED,
    response: data,
  };
};

const BillingInformationDetailAction = {
  billingInformationDetail,
  billingInformationDetailSuccess,
  billingInformationDetailFailed,
};

export default BillingInformationDetailAction;

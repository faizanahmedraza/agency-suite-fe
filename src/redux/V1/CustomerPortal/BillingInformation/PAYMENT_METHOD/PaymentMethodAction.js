import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const paymentMethod = (data) => {
  return {
    type: BILLING_INFORMATION.PAYMENT_METHOD,
    request: data,
  };
};

const paymentMethodSuccess = (data) => {
  return {
    type: BILLING_INFORMATION.PAYMENT_METHOD_SUCCESS,
    response: data,
  };
};

const paymentMethodFailed = (data) => {
  return {
    type: BILLING_INFORMATION.PAYMENT_METHOD_FAILED,
    response: data,
  };
};

const PaymentMethodAction = {
  paymentMethod,
  paymentMethodSuccess,
  paymentMethodFailed,
};

export default PaymentMethodAction;

import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const markPrimary = (data) => {
  return {
    type: BILLING_INFORMATION.MARK_PRIMARY,
    request: data,
  };
};

const markPrimarySuccess = (data) => {
  return {
    type: BILLING_INFORMATION.MARK_PRIMARY_SUCCESS,
    response: data,
  };
};

const markPrimaryFailed = (data) => {
  return {
    type: BILLING_INFORMATION.MARK_PRIMARY_FAILED,
    response: data,
  };
};

const MarkPrimaryAction = {
  markPrimary,
  markPrimarySuccess,
  markPrimaryFailed,
};

export default MarkPrimaryAction;

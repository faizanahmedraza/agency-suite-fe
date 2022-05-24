import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const billingInfoDelete = (data) => {
  return {
    type: BILLING_INFORMATION.BILLING_INFORMATION_DELETE,
    request: data,
  };
};

const billingInfoDeleteSuccess = (data) => {
  return {
    type: BILLING_INFORMATION.BILLING_INFORMATION_DELETE_SUCCESS,
    response: data,
  };
};

const billingInfoDeleteFailed = (data) => {
  return {
    type: BILLING_INFORMATION.BILLING_INFORMATION_DELETE_FAILED,
    response: data,
  };
};

const DeleteAction = {
  billingInfoDelete,
  billingInfoDeleteSuccess,
  billingInfoDeleteFailed,
};

export default DeleteAction;

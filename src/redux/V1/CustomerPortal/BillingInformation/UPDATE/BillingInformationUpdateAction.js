import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const billingInformationUpdate = (data) => {
    return {
        type: BILLING_INFORMATION.BILLING_INFORMATION_UPDATE,
        request: data,
    };
};

const billingInformationUpdateSuccess = (data) => {
    return {
        type: BILLING_INFORMATION.BILLING_INFORMATION_UPDATE_SUCCESS,
        response: data,
    };
};

const billingInformationUpdateFailed = (data) => {
    return {
        type: BILLING_INFORMATION.BILLING_INFORMATION_UPDATE_FAILED,
        response: data,
    };
};

const BillingInformationUpdateAction = {
    billingInformationUpdate,
    billingInformationUpdateSuccess,
    billingInformationUpdateFailed
}

export default BillingInformationUpdateAction;
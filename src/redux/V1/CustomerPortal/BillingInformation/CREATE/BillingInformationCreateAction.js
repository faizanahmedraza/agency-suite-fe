import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";

const billingInformationCreate = (data) => {
    return {
        type: BILLING_INFORMATION.BILLING_INFORMATION_CREATE,
        request: data,
    };
};

const billingInformationCreateSuccess = (data) => {
    return {
        type: BILLING_INFORMATION.BILLING_INFORMATION_CREATE_SUCCESS,
        response: data,
    };
};

const billingInformationCreateFailed = (data) => {
    return {
        type: BILLING_INFORMATION.BILLING_INFORMATION_CREATE_FAILED,
        response: data,
    };
};

const BillingInformationCreateAction = {
    billingInformationCreate,
    billingInformationCreateSuccess,
    billingInformationCreateFailed
}

export default BillingInformationCreateAction;
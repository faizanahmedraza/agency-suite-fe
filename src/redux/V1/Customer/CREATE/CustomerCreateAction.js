import CUSTOMER from "@store/V1/Customer/ActionType";

const customerCreate = (data) => {
    return {
        type: CUSTOMER.CUSTOMER_CREATE,
        request: data,
    };
};

const customerCreateSuccess = (data) => {
    return {
        type: CUSTOMER.CUSTOMER_CREATE_SUCCESS,
        response: data,
    };
};

const customerCreateFailed = (data) => {
    return {
        type: CUSTOMER.CUSTOMER_CREATE_FAILED,
        response: data,
    };
};

const CustomerCreateAction = {
    customerCreate,
    customerCreateSuccess,
    customerCreateFailed
}

export default CustomerCreateAction;
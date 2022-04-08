import CUSTOMER from "@store/V1/Customer/ActionType";

const customerUpdate = (data) => {
    return {
        type: CUSTOMER.CUSTOMER_UPDATE,
        request: data,
    };
};

const customerUpdateSuccess = (data) => {
    return {
        type: CUSTOMER.CUSTOMER_UPDATE_SUCCESS,
        response: data,
    };
};

const customerUpdateFailed = (data) => {
    return {
        type: CUSTOMER.CUSTOMER_UPDATE_FAILED,
        response: data,
    };
};

const CustomerUpdateAction = {
    customerUpdate,
    customerUpdateSuccess,
    customerUpdateFailed
}

export default CustomerUpdateAction;
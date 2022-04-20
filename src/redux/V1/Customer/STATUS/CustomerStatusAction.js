import CUSTOMER from "@store/V1/Customer/ActionType";

const customerStatus = (data) => {
    return {
        type: CUSTOMER.CUSTOMER_STATUS,
        request : data
    };
};
const customerStatusSuccess = (data) => {
    return {
        type: CUSTOMER.CUSTOMER_STATUS_SUCCESS,
        response: data,
    };
};
const customerStatusFailed = () => {
    return {
        type: CUSTOMER.CUSTOMER_STATUS_FAILED,
    };
};

const CustomerStatusAction = {
    customerStatus,
    customerStatusSuccess,
    customerStatusFailed
}

export default CustomerStatusAction;
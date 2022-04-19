import CUSTOMER_REGISTER from "@store/V1/Auth/CustomerRegister/ActionTypes";

const CustomerRegisterAction = {
    registration,
    registrationSuccess,
    registrationFailed,
};

function registration(data) {
    return {
        type: CUSTOMER_REGISTER.CUSTOMER_POST_REGISTRATION,
        request: data,
    };
}
function registrationSuccess(data) {
    return {
        type: CUSTOMER_REGISTER.CUSTOMER_POST_REGISTRATION_SUCCESS,
        response: data,
    };
}
function registrationFailed(data) {
    return {
        type: CUSTOMER_REGISTER.CUSTOMER_POST_REGISTRATION_FAILED,
        response: data,
    };
}

export default CustomerRegisterAction;
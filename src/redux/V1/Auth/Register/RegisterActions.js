import REGISTER from "@store/V1/Auth/Register/ActionTypes";

const registerAction = {
    registration,
    registrationSuccess,
    registrationFailed,
};

function registration(data) {
    return {
        type: REGISTER.POST_REGISTRATION,
        request: data,
    };
}
function registrationSuccess(data) {
    return {
        type: REGISTER.POST_REGISTRATION_SUCCESS,
        response: data,
    };
}
function registrationFailed(data) {
    return {
        type: REGISTER.POST_REGISTRATION_FAILED,
        response: data,
    };
}

export default registerAction;

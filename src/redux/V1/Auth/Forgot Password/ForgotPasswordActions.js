import ForgotPassword from "@store/V1/Auth/Forgot Password/ActionTypes";

const forgotPasswordAction = {
    forgotPassword,
    forgotPasswordSuccess,
    forgotPasswordFailed,
};

function forgotPassword(data) {
    return {
        type: ForgotPassword.POST_FORGOT_PASSWORD,
        request: data,
    };
}
function forgotPasswordSuccess(data) {
    return {
        type: ForgotPassword.POST_FORGOT_PASSWORD_SUCCESS,
        response: data,
    };
}
function forgotPasswordFailed(data) {
    return {
        type: ForgotPassword.POST_FORGOT_PASSWORD_FAILED,
        response: data,
    };
}

export default forgotPasswordAction;

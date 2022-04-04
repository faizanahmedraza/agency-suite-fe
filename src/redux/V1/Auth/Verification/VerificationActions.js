import VERIFICATION from "@store/V1/Auth/Verification/ActionTypes";

const verificationAction = {
    verification,
    verificationSuccess,
    verificationFailed,
};

function verification(data) {
    return {
        type: VERIFICATION.POST_VERIFICATION,
        request: data,
    };
}
function verificationSuccess(data) {
    return {
        type: VERIFICATION.POST_VERIFICATION_SUCCESS,
        response: data,
    };
}
function verificationFailed(data) {
    return {
        type: VERIFICATION.POST_VERIFICATION_FAILED,
        response: data,
    };
}

export default verificationAction;

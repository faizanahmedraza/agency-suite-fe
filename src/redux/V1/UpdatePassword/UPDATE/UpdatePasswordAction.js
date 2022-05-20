import PASSWORD_UPDATE from "@store/V1/UpdatePassword/ActionTypes";

const passwordUpdate = (data) => {
    return {
        type: PASSWORD_UPDATE.PASSWORD_UPDATE,
        request: data
    };
};
const passwordUpdateSuccess = (data) => {
    return {
        type: PASSWORD_UPDATE.PASSWORD_UPDATE_SUCCESS,
        response: data
    };
};
const passwordUpdateFailed = (data) => {
    return {
        type: PASSWORD_UPDATE.PASSWORD_UPDATE_FAILED,
        response: data
    };
};

const PasswordUpdateAction = {
    passwordUpdate,
    passwordUpdateSuccess,
    passwordUpdateFailed
}

export default PasswordUpdateAction;
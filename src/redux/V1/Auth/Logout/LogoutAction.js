import LOGOUT_ACTION_TYPE from "@store/V1/Auth/Logout/LogoutActionType";

function deleteLogout(request) {
    return { type: LOGOUT_ACTION_TYPE.DELETE_LOGOUT, request };
}

function deleteLogoutSuccess(response) {
    return { type: LOGOUT_ACTION_TYPE.DELETE_LOGOUT_SUCCESS, response };
}

function deleteLogoutFailed(response) {
    return { type: LOGOUT_ACTION_TYPE.DELETE_LOGOUT_FAILED, response };
}

const LogoutAction = {
    deleteLogout,
    deleteLogoutSuccess,
    deleteLogoutFailed,
};

export default LogoutAction;

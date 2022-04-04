import LOGIN_ACTION_TYPE from "@store/V1/Auth/Login/LoginActionType";

function postLogin(request) {
    return { type: LOGIN_ACTION_TYPE.POST_LOGIN, request };
}

function postLoginSuccess(response) {
    return { type: LOGIN_ACTION_TYPE.POST_LOGIN_SUCCESS, response };
}

function postLoginFailed(response) {
    return { type: LOGIN_ACTION_TYPE.POST_LOGIN_FAILED, response };
}

const LoginAction = {
    postLogin,
    postLoginSuccess,
    postLoginFailed,
};

export default LoginAction;

import { takeEvery, put } from "redux-saga/effects";
import LOGIN_ACTION_TYPE from "@store/V1/Auth/Login/LoginActionType";
import LoginAction from "@store/V1/Auth/Login/LoginAction";
import AuthService from "@src/Services/V1/AuthService";
import toast from 'react-hot-toast'

function* postLogin(data) {
    console.log(data.request)
    try {
        const response = yield AuthService.loginPost(data.request);
        console.log(response)
        // return
        if (response.success) {
            toast.success(response.message)
            yield put(LoginAction.postLoginSuccess(response.data));
        } else {
            toast.error(response.error.message)
            // yield put(LoginAction.postLoginFailed(response.error.message));
        }
    } catch (error) {
        toast.error()
    }
}

function postLoginSuccess(data) {
    localStorage.setItem(
        "access_token",
        data.response.authentication.access_token
    );
    localStorage.setItem(
        "user",
        JSON.stringify(data.response.authentication.user)
    );
    console.log(data);
    localStorage.setItem(
        "permissions",
        JSON.stringify(data.response.authentication.user.roles[0].permissions)
    );
        window.location.href = "/dashboard";
}

function postLoginFailed(data) {
    toast.error(data.response);
}

export function* postLoginSaga() {
    yield takeEvery(LOGIN_ACTION_TYPE.POST_LOGIN, postLogin);
}

export function* postLoginSuccessSaga() {
    yield takeEvery(LOGIN_ACTION_TYPE.POST_LOGIN_SCCUESS, postLoginSuccess);
}

export function* postLoginFailedSaga() {
    yield takeEvery(LOGIN_ACTION_TYPE.POST_LOGIN_FAILED, postLoginFailed);
}

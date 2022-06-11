import { takeEvery, put } from "redux-saga/effects";
import LOGOUT_ACTION_TYPE from "@store/V1/Auth/Logout/LogoutActionType";
import LogoutAction from "@store/V1/Auth/Logout/LogoutAction";
import AuthService from "@src/Services/V1/AuthService";
import LogoutHelper from '@src/Helpers/LogoutHelper';
import toast from 'react-hot-toast'

function* deleteLogout(data) {
    try {
        const response = yield AuthService.logoutDelete(data.request);
        // return
        if (response.success) {
            toast.success(response.message)
            yield put(LogoutAction.deleteLogoutSuccess(response.data));
        } else {
            yield put(LogoutAction.deleteLogoutFailed(response.error.message))
        }
    } catch (error) {
        toast.error("Something Went Wrong Please Try Again Later")
    }
}

function deleteLogoutSuccess() {
    LogoutHelper.logout();
}

function deleteLogoutFailed(data) {
    toast.error(data.response);
}

export function* deleteLogoutSaga() {
    yield takeEvery(LOGOUT_ACTION_TYPE.DELETE_LOGOUT, deleteLogout);
}

export function* deleteLogoutSuccessSaga() {
    yield takeEvery(LOGOUT_ACTION_TYPE.DELETE_LOGOUT_SUCCESS, deleteLogoutSuccess);
}

export function*  deleteLogoutFailedSaga() {
    yield takeEvery(LOGOUT_ACTION_TYPE.DELETE_LOGOUT_FAILED, deleteLogoutFailed);
}

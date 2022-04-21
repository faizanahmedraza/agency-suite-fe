import { takeEvery, put } from "redux-saga/effects";
import LAUNCH_ACTION_TYPE from "@store/V1/Auth/Launch/LaunchActionType";
import LaunchAction from "@store/V1/Auth/Launch/LaunchAction";
import AuthService from "@src/Services/V1/AuthService";
import toast from 'react-hot-toast'
import { Navigate } from "react-router-dom"

function* postLaunch(data) {
    try {
        const response = yield AuthService.launchPost(data.request);
        if (response.success) {
            toast.success(response.message)
            yield put(LaunchAction.postLaunchSuccess(response.data));
        } else {
            yield put(LaunchAction.postLaunchFailed(response.error.message))
        }
    } catch (error) {
        toast.error("Something Went Wrong Please Try Again Later")

        yield put(LaunchAction.postLaunchFailed(error))
    }
}

function postLaunchSuccess(data) {
    const { portal_settings: { agency } } = data.response
    window.location.replace(`http://${agency.default_domain}`);
}

function postLaunchFailed(data) {
    toast.error(data.response)
}

export function* postLaunchSaga() {
    console.log("sagaaaas")
    yield takeEvery(LAUNCH_ACTION_TYPE.POST_LAUNCH, postLaunch);
}

export function* postLaunchSuccessSaga() {
    yield takeEvery(LAUNCH_ACTION_TYPE.POST_LAUNCH_SUCCESS, postLaunchSuccess);
}

export function* postLaunchFailedSaga() {
    yield takeEvery(LAUNCH_ACTION_TYPE.POST_LAUNCH_FAILED, postLaunchFailed);
}

import { takeEvery, put } from "redux-saga/effects";
import VERIFICATION from "@store/V1/Auth/Verification/ActionTypes";
import verificationAction from "@store/V1/Auth/Verification/VerificationActions";
import AuthService from "@src/Services/V1/AuthService";
import toast from 'react-hot-toast'

function* verification(data) {
    try {
        const response = yield AuthService.verificationPost(data.request);
        if (response.success) {
            toast.success(response.data.message)
            yield put(verificationAction.verificationSuccess(response.data));
        } else {
            yield put(
                verificationAction.verificationFailed(response.error.message)
            );
        }
    } catch (error) {
        console.log(error);
    }
}

function verificationSuccess(data) {
    window.location.href = "/login";
}

function verificationFailed(data) {
    toast.error(data.response);
}

export function* verificationSaga() {
    yield takeEvery(VERIFICATION.POST_VERIFICATION, verification);
}

export function* verificationSuccessSaga(data) {
    yield takeEvery(VERIFICATION.POST_VERIFICATION_SUCCESS, verificationSuccess);
}

export function* verificationFailedSaga() {
    yield takeEvery(VERIFICATION.POST_VERIFICATION_FAILED, verificationFailed);
}

import { takeEvery, put } from "redux-saga/effects";
import REGISTER from "@store/V1/Auth/Register/ActionTypes";
import registerAction from "@store/V1/Auth/Register/RegisterActions";
import AuthService from "@src/Services/V1/AuthService";
import toast from 'react-hot-toast'

function* registration(data) {
    try {
        const response = yield AuthService.registerPost(data.request);
        if (response.success) {
            yield put(registerAction.registrationSuccess(response.data));
        } else {
            yield put(
                registerAction.registrationFailed(response.error.message)
            );
        }
    } catch (error) {
        console.log(error);
    }
}

function registrationSuccess(data) {
    toast.success("Successfully Registered Please Verify To Continue")
}

function registrationFailed(data) {
    toast.error(data.response);
}

export function* registrationSaga() {
    yield takeEvery(REGISTER.POST_REGISTRATION, registration);
}

export function* registrationSuccessSaga(data) {
    yield takeEvery(REGISTER.POST_REGISTRATION_SUCCESS, registrationSuccess);
}

export function* registrationFailedSaga() {
    yield takeEvery(REGISTER.POST_REGISTRATION_FAILED, registrationFailed);
}

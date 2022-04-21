import { takeEvery, put } from "redux-saga/effects";
import CUSTOMER_REGISTER from "@store/V1/Auth/CustomerRegister/ActionTypes";
import CustomerRegisterAction from "@store/V1/Auth/CustomerRegister/CustomerRegisterActions";
import AuthService from "@src/Services/V1/AuthService";
import toast from 'react-hot-toast'

function* registration(data) {
    try {
        const response = yield AuthService.customerRegisterPost(data.request);
        if (response.success) {
            yield put(CustomerRegisterAction.registrationSuccess(response.data));
        } else {
            yield put(
                CustomerRegisterAction.registrationFailed(response.error.message)
            );
        }
    } catch (error) {
        console.log(error);
    }
}

function registrationSuccess(data) {
    toast.success("Successfully Registered Please Verify To Continue")
    setTimeout(() => {
        window.location.href = "/login";
    },2000)
}

function registrationFailed(data) {
    toast.error(data.response);
}

export function* registrationSaga() {
    yield takeEvery(CUSTOMER_REGISTER.CUSTOMER_POST_REGISTRATION, registration);
}

export function* registrationSuccessSaga() {
    yield takeEvery(CUSTOMER_REGISTER.CUSTOMER_POST_REGISTRATION_SUCCESS, registrationSuccess);
}

export function* registrationFailedSaga() {
    yield takeEvery(CUSTOMER_REGISTER.CUSTOMER_POST_REGISTRATION_FAILED, registrationFailed);
}

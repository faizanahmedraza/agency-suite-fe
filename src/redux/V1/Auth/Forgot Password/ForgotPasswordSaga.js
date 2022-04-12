import { takeEvery, put } from "redux-saga/effects";
import ForgotPassword from "@store/V1/Auth/Forgot Password/ActionTypes";
import ForgotPasswordAction from "@store/V1/Auth/Forgot Password/ForgotPasswordActions";
import AuthService from "@src/Services/V1/AuthService";
import toast from 'react-hot-toast'

function* forgotPassword(data) {
    try {
        const response = yield AuthService.forgotPasswordPost(data.request);
        if (response.success) {
            toast.error(response.message)
            yield put(ForgotPasswordAction.forgotPasswordSuccess(response.data));
        } else {
            toast.error(response.error.message)
            yield put(
                ForgotPasswordAction.forgotPasswordFailed(response.error.message)
            );
        }
    } catch (error) {
        console.log(error);
    }
}

export function* forgotPasswordSaga() {
    yield takeEvery(ForgotPassword.POST_FORGOT_PASSWORD, forgotPassword);
}

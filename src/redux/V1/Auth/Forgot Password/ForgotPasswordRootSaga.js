import { all } from "redux-saga/effects";
import {
    forgotPasswordSaga,
} from "@store/V1/Auth/Forgot Password/ForgotPasswordSaga";

export default function* ForgotPasswordSaga() {
    yield all([forgotPasswordSaga()]);
}

import { all } from "redux-saga/effects";
import {
    registrationSaga,
    registrationSuccessSaga,
    registrationFailedSaga,
} from "@store/V1/Auth/CustomerRegister/CustomerRegisterSaga";

export default function* CustomerRegisterRootSaga() {
    yield all([registrationSaga(), registrationSuccessSaga(),registrationFailedSaga()]);
}

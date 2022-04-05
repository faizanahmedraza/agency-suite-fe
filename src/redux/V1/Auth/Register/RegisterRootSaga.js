import { all } from "redux-saga/effects";
import {
    registrationSaga,
    registrationSuccessSaga,
    registrationFailedSaga,
} from "@store/V1/Auth/Register/RegisterSaga";

export default function* RegisterRootSaga() {
    yield all([registrationSaga(), registrationSuccessSaga(),registrationFailedSaga()]);
}

import { all } from "redux-saga/effects";
import {
    verificationSaga,
    verificationSuccessSaga,
    verificationFailedSaga,
} from "@store/V1/Auth/Verification/VerificationSaga";

export default function* RegisterRootSaga() {
    yield all([verificationSaga(), verificationSuccessSaga(),verificationFailedSaga()]);
}

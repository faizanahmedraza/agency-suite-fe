import { all } from "redux-saga/effects";
import LoginRootSaga from "@store/V1/Auth/Login/LoginRootSaga";
import RegisterRootSaga from "@store/V1/Auth/Register/RegisterRootSaga";
import VerificationRootSaga from "@store/V1/Auth/Verification/VerificationRootSaga";
import ForgotPasswordSaga from "@store/V1/Auth/Forgot Password/ForgotPasswordRootSaga";
import ServiceRootSaga from "@store/V1/Service/serviceRootSaga"


export default function* rootSaga() {
  yield all([
    LoginRootSaga(),
    RegisterRootSaga(),
    VerificationRootSaga(),
    ForgotPasswordSaga(),
    ServiceRootSaga(),
  ]);
}

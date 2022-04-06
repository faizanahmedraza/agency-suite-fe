import { all } from "redux-saga/effects";
import LoginRootSaga from "@store/V1/Auth/Login/LoginRootSaga";
import RegisterRootSaga from "@store/V1/Auth/Register/RegisterRootSaga";
import VerificationRootSaga from "@store/V1/Auth/Verification/VerificationRootSaga";
import CustomerRootSaga from "@store/V1/Customer/CustomerRootSaga";


export default function* rootSaga() {
  yield all([
    LoginRootSaga(),
    RegisterRootSaga(),
    VerificationRootSaga(),
    CustomerRootSaga(),
  ]);
}

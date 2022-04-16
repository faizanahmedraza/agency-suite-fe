import { all } from "redux-saga/effects";
import LoginRootSaga from "@store/V1/Auth/Login/LoginRootSaga";
import RegisterRootSaga from "@store/V1/Auth/Register/RegisterRootSaga";
import VerificationRootSaga from "@store/V1/Auth/Verification/VerificationRootSaga";
import ServiceRootSaga from "@store/V1/Service/serviceRootSaga";
import CustomerRootSaga from "@store/V1/Customer/CustomerRootSaga";
import ForgotPasswordSaga from "@store/V1/Auth/Forgot Password/ForgotPasswordRootSaga";
import PortalSettingRootSaga from "@store/V1/PortalSetting/PortalSettingRootSaga";
import ProfileSettingRootSaga from "@store/V1/ProfileSetting/ProfileSettingRootSaga";


export default function* rootSaga() {
  yield all([
    LoginRootSaga(),
    RegisterRootSaga(),
    VerificationRootSaga(),
    ServiceRootSaga(),
    CustomerRootSaga(),
    ForgotPasswordSaga(),
    PortalSettingRootSaga(),
    ProfileSettingRootSaga(),
  ]);
}

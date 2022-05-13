import { all } from "redux-saga/effects";
import LaunchRootSaga from "@store/V1/Auth/Launch/LaunchRootSaga";
import LoginRootSaga from "@store/V1/Auth/Login/LoginRootSaga";
import RegisterRootSaga from "@store/V1/Auth/Register/RegisterRootSaga";
import CustomerRegisterRootSaga from "@store/V1/Auth/CustomerRegister/CustomerRegisterRootSaga";
import VerificationRootSaga from "@store/V1/Auth/Verification/VerificationRootSaga";
import ServiceRootSaga from "@store/V1/Service/serviceRootSaga";
import CustomerServiceRootSaga from "@store/V1/CustomerPortal/Service/serviceRootSaga";
import BillingInformationRootSaga from "@store/V1/CustomerPortal/BillingInformation/BillingInformationRootSaga";
import CustomerRootSaga from "@store/V1/Customer/CustomerRootSaga";
import ForgotPasswordSaga from "@store/V1/Auth/Forgot Password/ForgotPasswordRootSaga";
import PortalSettingRootSaga from "@store/V1/PortalSetting/PortalSettingRootSaga";
import ProfileSettingRootSaga from "@store/V1/ProfileSetting/ProfileSettingRootSaga";
import ServiceRequestRootSaga from "@store/V1/ServiceRequest/ServiceRequestRootSaga";

export default function* rootSaga() {
  yield all([
    LoginRootSaga(),
    LaunchRootSaga(),
    RegisterRootSaga(),
    CustomerRegisterRootSaga(),
    VerificationRootSaga(),
    ServiceRootSaga(),
    CustomerRootSaga(),
    ForgotPasswordSaga(),
    PortalSettingRootSaga(),
    ProfileSettingRootSaga(),
    ServiceRequestRootSaga(),
    CustomerServiceRootSaga(),
    BillingInformationRootSaga(),
  ]);
}

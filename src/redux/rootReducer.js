import { combineReducers } from "redux";

// ** Reducers Imports
import LoginReducer from "@store/V1/Auth/Login/LoginReducer";
import CustomerRootReducer from "@store/V1/Customer/CustomerRootReducer";
import RegisterReducer from "@store/V1/Auth/Register/RegisterReducers";
import VerificationReducer from "@store/V1/Auth/Verification/VerificationReducers";
import ForgotPasswordReducer from "@store/V1/Auth/Forgot Password/ForgotPasswordReducers";
import ServiceReducer from "@store/V1/Service/serviceRootReducer";
import PortalSettingRootReducer from "@store/V1/PortalSetting/PortalSettingRootReducer";
import navbar from './navbar'
import layout from './layout'
import dataTables from '@src/views/tables/data-tables/store'

const rootReducer = combineReducers({
  navbar,
  layout,
  dataTables,
  login: LoginReducer,
  register: RegisterReducer,
  verification: VerificationReducer,
  service : ServiceReducer,
  customers: CustomerRootReducer,
  forgotPassword: ForgotPasswordReducer,
  portal_settings: PortalSettingRootReducer,
});

export default rootReducer

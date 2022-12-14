import { combineReducers } from "redux";

// ** Reducers Imports
import LaunchReducer from "@store/V1/Auth/Launch/LaunchReducer";
import LoginReducer from "@store/V1/Auth/Login/LoginReducer";
import LogoutReducer from "@store/V1/Auth/Logout/LogoutReducer";
import CustomerRootReducer from "@store/V1/Customer/CustomerRootReducer";
import RegisterReducer from "@store/V1/Auth/Register/RegisterReducers";
import CustomerRegistrationReducer from "@store/V1/Auth/CustomerRegister/CustomerRegisterReducers";
import VerificationReducer from "@store/V1/Auth/Verification/VerificationReducers";
import ForgotPasswordReducer from "@store/V1/Auth/Forgot Password/ForgotPasswordReducers";
import ServiceReducer from "@store/V1/Service/serviceRootReducer";
import CustomerServiceReducer from "@store/V1/CustomerPortal/Service/serviceRootReducer";
import BillingInformationRootReducer from "@store/V1/CustomerPortal/BillingInformation/BillingInformationRootReducer";
import CustomerBillingInformationRootReducer from "@store/V1/CustomerBillingInformation/CustomerBillingInformationRootReducer";
import CustomerServiceRequestRootReducer from "@store/V1/CustomerPortal/ServiceRequest/CustomerServiceRequestRootReducer";
import CustomerInvoiceRootReducer from "@store/V1/CustomerPortal/Invoice/InvoiceRootReducer";
import PortalSettingRootReducer from "@store/V1/PortalSetting/PortalSettingRootReducer";
import ProfileSettingRootReducer from "@store/V1/ProfileSetting/ProfileSettingRootReducer";
import ServiceRequestRootReducer from "@store/V1/ServiceRequest/ServiceRequestRootReducer";
import InvoiceRootReducer from "@store/V1/Invoice/InvoiceRootReducer";
import PasswordUpdateRootReducer from "@store/V1/UpdatePassword/PasswordUpdateRootReducer";
import PaymentGatewayRootReducer from "@store/V1/PaymentGateway/PaymentGatewayRootReducer";
import navbar from './navbar'
import layout from './layout'

const rootReducer = combineReducers({
  navbar,
  layout,
  login: LoginReducer,
  logout: LogoutReducer,
  launch: LaunchReducer,
  register: RegisterReducer,
  customer_register: CustomerRegistrationReducer,
  verification: VerificationReducer,
  service: ServiceReducer,
  customers: CustomerRootReducer,
  forgotPassword: ForgotPasswordReducer,
  portal_settings: PortalSettingRootReducer,
  profile_settings: ProfileSettingRootReducer,
  change_password: PasswordUpdateRootReducer,
  service_requests: ServiceRequestRootReducer,
  invoices: InvoiceRootReducer,
  customer_services: CustomerServiceReducer,
  customer_billing_information: BillingInformationRootReducer,
  billing_information: CustomerBillingInformationRootReducer,
  customer_service_requests: CustomerServiceRequestRootReducer,
  customer_invoices: CustomerInvoiceRootReducer,
  payment_gateway: PaymentGatewayRootReducer,
  
});

export default rootReducer

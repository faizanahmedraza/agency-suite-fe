import { combineReducers } from "redux";

// ** Reducers Imports
import LoginReducer from "@store/V1/Auth/Login/LoginReducer";
import CustomerRootReducer from "@store/V1/Customer/CustomerRootReducer";
import RegisterReducer from "@store/V1/Auth/Register/RegisterReducers";
import VerificationReducer from "@store/V1/Auth/Verification/VerificationReducers";
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
  customers: CustomerRootReducer
});

export default rootReducer

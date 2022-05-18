import { combineReducers } from "redux";
import UpdatePasswordReducer from "@store/V1/UpdatePassword/UPDATE/UpdatePasswordReducer";

const PasswordUpdateRootReducer = combineReducers({
  update: UpdatePasswordReducer,
});

export default PasswordUpdateRootReducer;

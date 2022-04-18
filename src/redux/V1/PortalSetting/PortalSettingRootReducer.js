import { combineReducers } from "redux";
import PortalSettingDetailReducer from "@store/V1/PortalSetting/DETAIL/PortalSettingDetailReducer";
import PortalSettingUpdateReducer from "@store/V1/PortalSetting/UPDATE/PortalSettingUpdateReducer";

const PortalSettingRootReducer = combineReducers({
  detail: PortalSettingDetailReducer,
  update: PortalSettingUpdateReducer,
});

export default PortalSettingRootReducer;

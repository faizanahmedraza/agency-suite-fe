import { combineReducers } from "redux";
import ProfileSettingDetailReducer from "@store/V1/ProfileSetting/DETAIL/ProfileSettingDetailReducer";
import ProfileSettingUpdateReducer from "@store/V1/ProfileSetting/UPDATE/ProfileSettingUpdateReducer";

const ProfileSettingRootReducer = combineReducers({
  detail: ProfileSettingDetailReducer,
  update: ProfileSettingUpdateReducer,
});

export default ProfileSettingRootReducer;

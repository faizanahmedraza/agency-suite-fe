import PROFILE_SETTING from "@store/V1/ProfileSetting/ActionTypes";

const profileSettingDetail = () => {
  return {
    type: PROFILE_SETTING.PROFILE_SETTING_DETAIL,
  };
};

const profileSettingDetailSuccess = (data) => {
  return {
    type: PROFILE_SETTING.PROFILE_SETTING_DETAIL_SUCCESS,
    response: data,
  };
};

const profileSettingDetailFailed = (data) => {
  return {
    type: PROFILE_SETTING.PROFILE_SETTING_DETAIL_FAILED,
    response: data,
  };
};

const ProfileSettingDetailAction = {
 profileSettingDetail,
 profileSettingDetailSuccess,
 profileSettingDetailFailed,
};

export default ProfileSettingDetailAction;

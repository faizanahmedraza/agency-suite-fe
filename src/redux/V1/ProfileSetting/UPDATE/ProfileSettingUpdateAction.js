import PROFILE_SETTING from "@store/V1/ProfileSetting/ActionTypes";

const profileSettingUpdate = (data) => {
    return {
        type: PROFILE_SETTING.PROFILE_SETTING_UPDATE,
        request: data
    };
};
const profileSettingUpdateSuccess = (data) => {
    return {
        type: PROFILE_SETTING.PROFILE_SETTING_UPDATE_SUCCESS,
        response: data
    };
};
const profileSettingUpdateFailed = (data) => {
    return {
        type: PROFILE_SETTING.PROFILE_SETTING_UPDATE_FAILED,
        response: data
    };
};

const ProfileSettingUpdateAction = {
    profileSettingUpdate,
    profileSettingUpdateSuccess,
    profileSettingUpdateFailed
}

export default ProfileSettingUpdateAction;
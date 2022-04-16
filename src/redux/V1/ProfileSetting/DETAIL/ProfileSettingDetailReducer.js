import PROFILE_SETTING from "@store/V1/ProfileSetting/ActionTypes";

const ProfileSettingDetailReducer = (
  state = {
    loading: false,
    profile_settings: {},
    error: null,
    fetched: false,
  },
  action
) => {
  switch (action.type) {
    case PROFILE_SETTING.PROFILE_SETTING_DETAIL:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_SETTING.PROFILE_SETTING_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        profile_settings: action.response.profile,
        fetched: true,
      };
    case PROFILE_SETTING.PROFILE_SETTING_DETAIL_FAILED:
      return {
         ...state,
          loading: false,
      };
    default:
      return state;
  }
};

export default ProfileSettingDetailReducer;

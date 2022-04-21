import PROFILE_SETTING from "@store/V1/ProfileSetting/ActionTypes";

const ProfileSettingUpdateReducer = (
    state = {
        loading: false,
        user: null,
        isFetched : false
    },
    action
) => {
    switch (action.type) {
        case PROFILE_SETTING.PROFILE_SETTING_UPDATE:
            return {
                ...state,
                loading: true,
            }
        case PROFILE_SETTING.PROFILE_SETTING_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.response.user,
                isFetched : true
            }
        case PROFILE_SETTING.PROFILE_SETTING_UPDATE_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default ProfileSettingUpdateReducer;

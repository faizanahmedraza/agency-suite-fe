import PORTAL_SETTING from "@store/V1/PortalSetting/ActionTypes";

const PortalSettingUpdateReducer = (
    state = {
        loading: false,
        portal_settings: {}
    },
    action
) => {
    switch (action.type) {
        case PORTAL_SETTING.PORTAL_SETTING_UPDATE:
            return {
                ...state,
                loading: true,
            }
        case PORTAL_SETTING.PORTAL_SETTING_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                portal_settings: action.response.portal_settings,
            }
        case PORTAL_SETTING.PORTAL_SETTING_UPDATE_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default PortalSettingUpdateReducer;

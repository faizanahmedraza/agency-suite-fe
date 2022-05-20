import PORTAL_SETTING from "@store/V1/PortalSetting/ActionTypes";
import SettingHelper from "@src/Helpers/SettingHelper";

const PortalSettingUpdateReducer = (
    state = {
        loading: false,
        portal_settings: localStorage.getItem("portal_settings") ? SettingHelper.localData(localStorage.getItem("portal_settings")) : {},
        isChanged: false
    },
    action
) => {
    switch (action.type) {
        case PORTAL_SETTING.PORTAL_SETTING_UPDATE:
            return {
                ...state,
                loading: true,
                isChanged: false
            }
        case PORTAL_SETTING.PORTAL_SETTING_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                portal_settings: action.response.portal_settings,
                isChanged: true
            }
        case PORTAL_SETTING.PORTAL_SETTING_UPDATE_FAILED:
            return {
                ...state,
                loading: false,
                isChanged: false
            }
        default:
            return state
    }
}

export default PortalSettingUpdateReducer;

import PORTAL_SETTING from "@store/V1/PortalSetting/ActionTypes";

const portalSettingUpdate = (data) => {
    return {
        type: PORTAL_SETTING.PORTAL_SETTING_UPDATE,
        request: data
    };
};
const portalSettingUpdateSuccess = (data) => {
    return {
        type: PORTAL_SETTING.PORTAL_SETTING_UPDATE_SUCCESS,
        response: data
    };
};
const portalSettingUpdateFailed = (data) => {
    return {
        type: PORTAL_SETTING.PORTAL_SETTING_UPDATE_FAILED,
        response: data
    };
};

const PortalSettingUpdateAction = {
    portalSettingUpdate,
    portalSettingUpdateSuccess,
    portalSettingUpdateFailed
}

export default PortalSettingUpdateAction;
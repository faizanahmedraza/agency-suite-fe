import PORTAL_SETTING from "@store/V1/PortalSetting/ActionType";

const portalSettingUpdate = (data) => {
    return {
        type: PORTAL_SETTING.PORTAL_SETTING_UPDATE,
        request: data
    };
};
const portalSettingUpdateSuccess = () => {
    return {
        type: PORTAL_SETTING.PORTAL_SETTING_UPDATE_SUCCESS
    };
};
const portalSettingUpdateFailed = () => {
    return {
        type: PORTAL_SETTING.PORTAL_SETTING_UPDATE_FAILED,
    };
};

const PortalSettingUpdateAction = {
    portalSettingUpdate,
    portalSettingUpdateSuccess,
    portalSettingUpdateFailed
}

export default PortalSettingUpdateAction;
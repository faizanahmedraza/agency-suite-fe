import PORTAL_SETTING from "@store/V1/PortalSetting/ActionType";

const portalSettingDetail = () => {
  return {
    type: PORTAL_SETTING.PORTAL_SETTING_DETAIL,
  };
};

const portalSettingDetailSuccess = (data) => {
  return {
    type: PORTAL_SETTING.PORTAL_SETTING_DETAIL_SUCCESS,
    response: data,
  };
};

const portalSettingDetailFailed = (data) => {
  return {
    type: PORTAL_SETTING.PORTAL_SETTING_DETAIL_FAILED,
    response: data,
  };
};

const PortalSettingDetailAction = {
 portalSettingDetail,
 portalSettingDetailSuccess,
 portalSettingDetailFailed,
};

export default PortalSettingDetailAction;

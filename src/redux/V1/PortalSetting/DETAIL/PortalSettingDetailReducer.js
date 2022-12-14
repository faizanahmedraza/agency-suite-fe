import PORTAL_SETTING from "@store/V1/PortalSetting/ActionTypes";
import SettingHelper from "@src/Helpers/SettingHelper";

const PortalSettingDetailReducer = (
  state = {
    loading: false,
    portal_settings: localStorage.getItem("portal_settings") ? SettingHelper.localData(localStorage.getItem("portal_settings")) : {},
    error: null,
    fetched: false,
  },
  action
) => {
  switch (action.type) {
    case PORTAL_SETTING.PORTAL_SETTING_DETAIL:
      return {
        ...state,
        loading: true,
      };
    case PORTAL_SETTING.PORTAL_SETTING_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        portal_settings: action.response.portal_settings,
        fetched: true,
      };
    case PORTAL_SETTING.PORTAL_SETTING_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default PortalSettingDetailReducer;

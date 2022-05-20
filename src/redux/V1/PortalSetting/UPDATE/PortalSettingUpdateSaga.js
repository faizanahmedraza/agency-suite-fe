import { takeEvery, put } from "redux-saga/effects";
import PORTAL_SETTING from "@store/V1/PortalSetting/ActionTypes";
import PortalSettingUpdateAction from "@store/V1/PortalSetting/UPDATE/PortalSettingUpdateAction";
import PortalSettingService from "@src/Services/V1/PortalSettingService";
import toast from "react-hot-toast";

function* portalSettingUpdate(data) {
  try {
    const response = yield PortalSettingService.portalSettingPut(data.request);
    if (response.success) {
      toast.success(response.message);
      yield put(PortalSettingUpdateAction.portalSettingUpdateSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(PortalSettingUpdateAction.portalSettingUpdateFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
    yield put(PortalSettingUpdateAction.portalSettingUpdateFailed());
  }
}

function portalSettingUpdateSuccess(data) {
  localStorage.setItem(
      "portal_settings",
      JSON.stringify(data.response.portal_settings)
  );
}

export function* PortalSettingUpdateSaga() {
  yield takeEvery(PORTAL_SETTING.PORTAL_SETTING_UPDATE, portalSettingUpdate);
}

export function* PortalSettingUpdateSuccessSaga() {
  yield takeEvery(PORTAL_SETTING.PORTAL_SETTING_UPDATE_SUCCESS, portalSettingUpdateSuccess);
}
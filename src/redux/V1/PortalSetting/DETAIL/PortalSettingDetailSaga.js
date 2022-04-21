import { takeEvery, put } from "redux-saga/effects";
import PORTAL_SETTING from "@store/V1/PortalSetting/ActionTypes";
import PortalSettingDetailAction from "@store/V1/PortalSetting/DETAIL/PortalSettingDetailAction";
import PortalSettingService from "@src/Services/V1/PortalSettingService";
import toast from 'react-hot-toast';

function* portalSettingDetail() {
  try {
    const response = yield PortalSettingService.portalSettingGet();
    if (response.success) {
      yield put(PortalSettingDetailAction.portalSettingDetailSuccess(response.data));
    } else {
      yield put(PortalSettingDetailAction.portalSettingDetailFailed());
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
    yield put(PortalSettingDetailAction.portalSettingDetailFailed());
  }
}

function portalSettingDetailSuccess(data) {
  localStorage.setItem(
    "portal_settings",
    JSON.stringify(data.response.portal_settings)
  );
}

export function* PortalSettingDetailSaga() {
  yield takeEvery(PORTAL_SETTING.PORTAL_SETTING_DETAIL, portalSettingDetail);
}

export function* PortalSettingDetailSuccessSaga() {
  yield takeEvery(PORTAL_SETTING.PORTAL_SETTING_DETAIL_SUCCESS, portalSettingDetailSuccess);
}
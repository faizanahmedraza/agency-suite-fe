import { takeEvery, put } from "redux-saga/effects";
import PORTAL_SETTING from "@store/V1/PortalSetting/ActionType";
import PortalSettingDetailAction from "@store/V1/PortalSetting/DETAIL/PortalSettingDetailAction";
import PortalSettingService from "@src/Services/V1/PortalSettingService";
import toast from 'react-hot-toast';

function* portalSettingDetail() {
  try {
    const response = yield PortalSettingService.portalSettingDetail();
    if (response.success) {
      yield put(PortalSettingDetailAction.portalSettingDetailSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(PortalSettingDetailAction.portalSettingDetailFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
    yield put(PortalSettingDetailAction.portalSettingDetailFailed());
  }
}

export function* portalSettingDetailSaga() {
  yield takeEvery(PORTAL_SETTING.PORTAL_SETTING_DETAIL, portalSettingDetail);
}
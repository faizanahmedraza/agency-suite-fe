import { takeEvery, put } from "redux-saga/effects";
import PROFILE_SETTING from "@store/V1/ProfileSetting/ActionTypes";
import ProfileSettingUpdateAction from "@store/V1/ProfileSetting/UPDATE/ProfileSettingUpdateAction";
import ProfileSettingService from "@src/Services/V1/ProfileSettingService";
import toast from "react-hot-toast";

function* profileSettingUpdate(data) {
  try {
    const response = yield ProfileSettingService.profileSettingPut(data.request);
    if (response.success) {
      toast.success(response.message);
      yield put(ProfileSettingUpdateAction.profileSettingUpdateSuccess(response.data));
      window.location.href="/profile";
    } else {
      toast.error(response.error.message);
      yield put(ProfileSettingUpdateAction.profileSettingUpdateFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
    yield put(ProfileSettingUpdateAction.profileSettingUpdateFailed());
  }
}

export function* ProfileSettingUpdateSaga() {
  yield takeEvery(PROFILE_SETTING.PROFILE_SETTING_UPDATE, profileSettingUpdate);
}

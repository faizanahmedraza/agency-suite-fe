import { takeEvery, put } from "redux-saga/effects";
import PROFILE_SETTING from "@store/V1/ProfileSetting/ActionTypes";
import ProfileSettingDetailAction from "@store/V1/ProfileSetting/DETAIL/ProfileSettingDetailAction";
import ProfileSettingService from "@src/Services/V1/ProfileSettingService";
import toast from 'react-hot-toast';

function* profileSettingDetail() {
  try {
    const response = yield ProfileSettingService.profileSettingGet();
     if (response.success) {
      yield put(ProfileSettingDetailAction.profileSettingDetailSuccess(response.data));
    } else {
      yield put(ProfileSettingDetailAction.profileSettingDetailFailed());
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
    yield put(ProfileSettingDetailAction.profileSettingDetailFailed());
  }
}

export function* ProfileSettingDetailSaga() {
  yield takeEvery(PROFILE_SETTING.PROFILE_SETTING_DETAIL, profileSettingDetail);
}
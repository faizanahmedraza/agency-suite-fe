import { all } from "redux-saga/effects";
import { ProfileSettingDetailSaga, ProfileSettingDetailSuccessSaga } from "@store/V1/ProfileSetting/DETAIL/ProfileSettingDetailSaga";
import { ProfileSettingUpdateSaga } from "@store/V1/ProfileSetting/UPDATE/ProfileSettingUpdateSaga";

export default function* ProfileSettingRootSaga() {
    yield all([
        ProfileSettingUpdateSaga(),
        ProfileSettingDetailSaga(),
        ProfileSettingDetailSuccessSaga(),
    ]);
}

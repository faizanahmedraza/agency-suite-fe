import { all } from "redux-saga/effects";
import { PortalSettingDetailSaga, PortalSettingDetailSuccessSaga } from "@store/V1/PortalSetting/DETAIL/PortalSettingDetailSaga";
import { PortalSettingUpdateSaga, PortalSettingUpdateSuccessSaga } from "@store/V1/PortalSetting/UPDATE/PortalSettingUpdateSaga";

export default function* PortalSettingRootSaga() {
    yield all([
        PortalSettingUpdateSaga(),
        PortalSettingDetailSaga(),
        PortalSettingDetailSuccessSaga(),
        PortalSettingUpdateSuccessSaga(),
    ]);
}

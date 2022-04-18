import { all } from "redux-saga/effects";
import { PortalSettingDetailSaga } from "@store/V1/PortalSetting/DETAIL/PortalSettingDetailSaga";
import { PortalSettingUpdateSaga } from "@store/V1/PortalSetting/UPDATE/PortalSettingUpdateSaga";

export default function* PortalSettingRootSaga() {
    yield all([
        PortalSettingUpdateSaga(),
        PortalSettingDetailSaga(),
    ]);
}

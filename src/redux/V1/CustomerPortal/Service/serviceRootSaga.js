import { all } from "redux-saga/effects";
import { ServiceListSaga } from "@store/V1/CustomerPortal/Service/List/ServiceListSaga"
import { ServiceDetailSaga } from "@store/V1/CustomerPortal/Service/Detail/ServiceDetailSaga"

export default function* ServiceRootSaga() {
    yield all([
        ServiceListSaga(),
        ServiceDetailSaga(),
    ]);
}

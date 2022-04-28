import { all } from "redux-saga/effects";
import { ServiceRequestCreateSaga, ServiceRequestCreateSuccessSaga } from "@store/V1/ServiceRequest/CREATE/ServiceRequestCreateSaga";
import { ServiceRequestListSaga } from "@store/V1/ServiceRequest/LIST/ServiceRequestListSaga"
import { ServiceRequestDetailSaga } from "@store/V1/ServiceRequest/DETAIL/ServiceRequestDetailSaga"

export default function* ServiceRequestRootSaga() {
    yield all([
        ServiceRequestCreateSaga(),
        ServiceRequestCreateSuccessSaga(),
        ServiceRequestListSaga(),
        ServiceRequestDetailSaga(),
    ]);
}

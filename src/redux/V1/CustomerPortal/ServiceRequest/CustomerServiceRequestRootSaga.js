import { all } from "redux-saga/effects";
import { ServiceRequestCreateSaga, ServiceRequestCreateSuccessSaga } from "@store/V1/CustomerPortal/ServiceRequest/CREATE/ServiceRequestCreateSaga";
import { ServiceRequestListSaga } from "@store/V1/CustomerPortal/ServiceRequest/LIST/ServiceRequestListSaga"
import { ServiceRequestDetailSaga } from "@store/V1/CustomerPortal/ServiceRequest/DETAIL/ServiceRequestDetailSaga"

export default function* CustomerServiceRequestRootSaga() {
    yield all([
        ServiceRequestCreateSaga(),
        ServiceRequestCreateSuccessSaga(),
        ServiceRequestListSaga(),
        ServiceRequestDetailSaga(),
    ]);
}

import { all } from "redux-saga/effects";
import { ServiceRequestCreateSaga, ServiceRequestCreateSuccessSaga } from "@store/V1/CustomerPortal/ServiceRequest/CREATE/ServiceRequestCreateSaga";
import { ServiceRequestListSaga } from "@store/V1/CustomerPortal/ServiceRequest/LIST/ServiceRequestListSaga"
import { ServiceRequestDetailSaga } from "@store/V1/CustomerPortal/ServiceRequest/DETAIL/ServiceRequestDetailSaga"
import { ServiceRequestCancelSaga,ServiceRequestCancelSuccessSaga } from "@store/V1/CustomerPortal/ServiceRequest/CANCEL/CancelSaga"

export default function* CustomerServiceRequestRootSaga() {
    yield all([
        ServiceRequestCreateSaga(),
        ServiceRequestCreateSuccessSaga(),
        ServiceRequestListSaga(),
        ServiceRequestDetailSaga(),
        ServiceRequestCancelSaga(),
        ServiceRequestCancelSuccessSaga()
    ]);
}

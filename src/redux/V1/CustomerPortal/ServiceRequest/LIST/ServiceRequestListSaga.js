import { takeEvery, put } from "redux-saga/effects"
import SERVICE_REQUEST from "@store/V1/CustomerPortal/ServiceRequest/ActionTypes"
import ServiceRequestListAction from "@store/V1/CustomerPortal/ServiceRequest/LIST/ServiceRequestListAction"
import ServiceRequestService from "@src/Services/V1/CustomerPortal/ServiceRequestService"

function* serviceRequestList(data) {
    const response = yield ServiceRequestService.serviceRequestList(data.request)
    if (response.success) {
        yield put(ServiceRequestListAction.serviceRequestListSuccess(response.data))
    } else {
        yield put(ServiceRequestListAction.serviceRequestListFailed(response))
    }
}

export function* ServiceRequestListSaga() {
    yield takeEvery(SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_LIST, serviceRequestList);
}

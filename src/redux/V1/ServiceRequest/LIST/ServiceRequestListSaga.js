import { takeEvery, put } from "redux-saga/effects"
import SERVICE_REQUEST from "@store/V1/ServiceRequest/ActionTypes"
import ServiceRequestListAction from "@store/V1/ServiceRequest/LIST/ServiceRequestListAction"
import AgencyServiceRequestService from "@src/Services/V1/AgencyServiceRequestService"

function* serviceRequestList() {
    const response = yield AgencyServiceRequestService.serviceRequestList()
    if (response.success) {
        yield put(ServiceRequestListAction.serviceRequestListSuccess(response.data))
    } else {
        yield put(ServiceRequestListAction.serviceRequestListFailed(response))
    }
}

export function* ServiceRequestListSaga() {
    yield takeEvery(SERVICE_REQUEST.SERVICE_REQUEST_LIST, serviceRequestList);
}

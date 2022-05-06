import { takeEvery, put } from "redux-saga/effects"
import SERVICE_REQUEST from "@store/V1/ServiceRequest/ActionTypes"
import ServiceRequestStatusAction from "@store/V1/ServiceRequest/STATUS/ServiceRequestStatusAction"
import AgencyServiceRequestService from "@src/Services/V1/AgencyServiceRequestService"
import toast from "react-hot-toast"

function* serviceRequestStatus(data) {
    const response = yield AgencyServiceRequestService.serviceRequestStatus(data.request)
    if (response.success) {
        toast.success("Status Changed")
        yield put(ServiceRequestStatusAction.customerStatusSuccess(response.data))
    } else {
        toast.error(response.error.message)
        yield put(ServiceRequestStatusAction.customerStatusFailed(response))
    }
}

export function* ServiceRequestStatusSaga() {
    yield takeEvery(SERVICE_REQUEST.SERVICE_REQUEST_STATUS, serviceRequestStatus);
}

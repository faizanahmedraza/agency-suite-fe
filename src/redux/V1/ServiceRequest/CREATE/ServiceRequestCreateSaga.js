import { takeEvery, put } from "redux-saga/effects"
import SERVICE_REQUEST from "@store/V1/ServiceRequest/ActionTypes"
import ServiceRequestCreateAction from "@store/V1/ServiceRequest/CREATE/ServiceRequestCreateAction"
import AgencyServiceRequestService from "@src/Services/V1/AgencyServiceRequestService"
import toast from "react-hot-toast"

function* serviceRequestCreate(data) {
    const response = yield AgencyServiceRequestService.serviceRequestPost(data.request)
    if (response.success) {
        toast.success(response.message)
        yield put(ServiceRequestCreateAction.serviceRequestCreateSuccess(response))
    } else {
        toast.error(response.error.message)
        yield put(ServiceRequestCreateAction.serviceRequestCreateFailed(response))
    }
}

function serviceRequestCreateSuccess() {
    window.location.href = "/request-services";
}

export function* ServiceRequestCreateSuccessSaga() {
    yield takeEvery(SERVICE_REQUEST.SERVICE_REQUEST_CREATE_SUCCESS, serviceRequestCreateSuccess);
}

export function* ServiceRequestCreateSaga() {
    yield takeEvery(SERVICE_REQUEST.SERVICE_REQUEST_CREATE, serviceRequestCreate);
}

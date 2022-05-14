import { takeEvery, put } from "redux-saga/effects"
import SERVICE_REQUEST from "@store/V1/CustomerPortal/ServiceRequest/ActionTypes"
import ServiceRequestCreateAction from "@store/V1/CustomerPortal/ServiceRequest/CREATE/ServiceRequestCreateAction"
import ServiceRequestService from "@src/Services/V1/CustomerPortal/ServiceRequestService"
import toast from "react-hot-toast"

function* serviceRequestCreate(data) {
    const response = yield ServiceRequestService.serviceRequestPost(data.request)
    if (response.success) {
        toast.success(response.message)
        yield put(ServiceRequestCreateAction.serviceRequestCreateSuccess(response))
    } else {
        toast.error(response.error.message)
        yield put(ServiceRequestCreateAction.serviceRequestCreateFailed(response))
    }
}

function serviceRequestCreateSuccess() {
    window.location.href = "/customer-service-requests";
}

export function* ServiceRequestCreateSuccessSaga() {
    yield takeEvery(SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CREATE_SUCCESS, serviceRequestCreateSuccess);
}

export function* ServiceRequestCreateSaga() {
    yield takeEvery(SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CREATE, serviceRequestCreate);
}

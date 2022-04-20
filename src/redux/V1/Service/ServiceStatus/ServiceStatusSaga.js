import { takeEvery, put } from "redux-saga/effects"
import SERVICE from "@store/V1/Service/ActionTypes"
import ServiceActions from "@store/V1/Service/ServiceStatus/ServiceStatusAction"
import AgencyService from "@src/Services/V1/AgencyService"
import toast from "react-hot-toast"

function* serviceStatus(data) {
    const response = yield AgencyService.serviceStatus(data.request)
    if (response.success) {
        toast.success("Status Changed")
        yield put(ServiceActions.serviceStatusSuccess(response.data))
    } else {
        toast.error(response.error.message)
        yield put(ServiceActions.serviceStatusFailed(response))
    }
}

export function* ServiceStatusSaga() {
    yield takeEvery(SERVICE.SERVICE_STATUS, serviceStatus);
}

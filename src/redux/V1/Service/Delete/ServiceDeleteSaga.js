import { takeEvery, put } from "redux-saga/effects"
import SERVICE from "@store/V1/Service/ActionTypes"
import ServiceActions from "@store/V1/Service/Delete/ServiceDeleteAction"
import AgencyService from "@src/Services/V1/AgencyService"
import toast from "react-hot-toast"

function* serviceDelete(data) {
    const response = yield AgencyService.serviceDelete(data.request)
    console.log(response)
    if (response.success) {
        toast.success(response.message)
        yield put(ServiceActions.serviceDeleteSuccess(response))
    } else {
        toast.error(response.error.message)
        yield put(ServiceActions.serviceDeleteFailed(response))
    }
}

export function* serviceDeleteSaga() {
    yield takeEvery(SERVICE.SERVICE_DELETE, serviceDelete);
}

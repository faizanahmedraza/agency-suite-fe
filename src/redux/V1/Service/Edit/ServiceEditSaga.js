import { takeEvery, put } from "redux-saga/effects"
import SERVICE from "@store/V1/Service/ActionTypes"
import ServiceActions from "@store/V1/Service/Edit/ServiceEditAction"
import AgencyService from "@src/Services/V1/AgencyService"
import toast from "react-hot-toast"

function* serviceEdit(data) {
    const response = yield AgencyService.servicEdit(data.request)
    if (response.success) {
        toast.success(response.message)
        yield put(ServiceActions.serviceEditSuccess(response))
    } else {
        toast.error(response.error.message)
        yield put(ServiceActions.serviceEditFailed(response))
    }
}

function* serviceEditSuccess(){
    window.location.href = "/services";
}

export function* ServiceEditSuccessSaga() {
    yield takeEvery(SERVICE.SERVICE_EDIT_SUCCESS, serviceEditSuccess);
}
export function* ServiceEditSaga() {
    yield takeEvery(SERVICE.SERVICE_EDIT, serviceEdit);
}

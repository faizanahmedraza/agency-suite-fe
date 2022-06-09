import { takeEvery, put } from "redux-saga/effects"
import SERVICE from "@store/V1/Service/ActionTypes"
import ServiceActions from "@store/V1/Service/Create/ServiceCreateAction"
import AgencyService from "@src/Services/V1/AgencyService"
import toast from "react-hot-toast"

function* serviceCreate(data) {
    const response = yield AgencyService.servicePost(data.request)
    if (response.success) {
        toast.success(response.message)
        yield put(ServiceActions.serviceCreateSuccess(response))
    } else {
        toast.error(response.error.message)
        yield put(ServiceActions.serviceCreateFailed(response))
    }
}

function serviceCreateSuccess() {
    window.location.href = "/services";
}

export function* serviceCreateSuccessSaga() {
    yield takeEvery(SERVICE.SERVICE_CREATE_SUCCESS, serviceCreateSuccess);
}

export function* ServiceCreateSaga() {
    yield takeEvery(SERVICE.SERVICE_CREATE, serviceCreate);
}

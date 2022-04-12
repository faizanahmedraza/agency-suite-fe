import { takeEvery, put } from "redux-saga/effects"
import SERVICE from "@store/V1/Service/ActionTypes"
import ServiceActions from "@store/V1/Service/List/ServiceListAction"
import AgencyService from "@src/Services/V1/AgencyService"

function* serviceList(data) {
    const response = yield AgencyService.serviceList()
    console.log(response)
    if (response.success) {
        yield put(ServiceActions.serviceListSuccess(response.data))
    } else {
        yield put(ServiceActions.serviceListFailed(response))
    }
}

export function* ServiceListSaga() {
    yield takeEvery(SERVICE.SERVICE_LIST, serviceList);
}

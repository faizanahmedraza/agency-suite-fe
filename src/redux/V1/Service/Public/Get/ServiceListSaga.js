import { takeEvery, put } from "redux-saga/effects"
import SERVICE from "@store/V1/Service/ActionTypes"
import ServiceActions from "@store/V1/Service/Public/Get/ServiceListAction"
import AgencyService from "@src/Services/V1/AgencyService"

function* servicePublicList(data) {
    const response = yield AgencyService.servicePublicList()
    console.log(response)
    if (response.success) {
        yield put(ServiceActions.serviceListSuccess(response.data))
    } else {
        yield put(ServiceActions.serviceListFailed(response))
    }
}

export function* ServicePublicListSaga() {
    yield takeEvery(SERVICE.SERVICE_PUBLIC_LIST, servicePublicList);
}

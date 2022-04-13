import { takeEvery, put } from "redux-saga/effects"
import SERVICE from "@store/V1/Service/ActionTypes"
import ServiceActions from "@store/V1/Service/Pagination/ServicePaginationAction"
import AgencyService from "@src/Services/V1/AgencyService"

function* servicePagination(data) {
    const response = yield AgencyService.servicePagination(data.request)
    if (response.success) {
        yield put(ServiceActions.servicePaginationSuccess(response.data))
    } else {
        yield put(ServiceActions.servicePaginationFailed(response))
    }
}

export function* ServicePaginationSaga() {
    yield takeEvery(SERVICE.SERVICE_PAGINATION, servicePagination);
}

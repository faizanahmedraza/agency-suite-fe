import { takeEvery, put } from "redux-saga/effects"
import SERVICE from "@store/V1/Service/ActionTypes"
import ServiceActions from "@store/V1/Service/Catalog Status/CatalogStatusAction"
import AgencyService from "@src/Services/V1/AgencyService"
import toast from "react-hot-toast"

function* serviceCatalog(data) {
    const response = yield AgencyService.serviceCatalog(data.request)
    if (response.success) {
        toast.success("Status Changed")
        yield put(ServiceActions.serviceCatalogSuccess(response.data))
    } else {
        toast.error(response.error.message)
        yield put(ServiceActions.serviceCatalogFailed(response))
    }
}

export function* ServiceCatalogSaga() {
    yield takeEvery(SERVICE.SERVICE_CATALOG, serviceCatalog);
}

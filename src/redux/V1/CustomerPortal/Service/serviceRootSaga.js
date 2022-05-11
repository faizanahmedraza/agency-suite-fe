import { all } from "redux-saga/effects";
import { ServiceListSaga } from "@store/V1/CustomerPortal/Service/List/ServiceListSaga"
import { ServiceDetailSaga } from "@store/V1/CustomerPortal/Service/Detail/ServiceDetailSaga"
import { ServicePaginationSaga } from "@store/V1/CustomerPortal/Service/Pagination/ServicePaginationSaga"

export default function* ServiceRootSaga() {
    yield all([
        ServiceListSaga(),
        ServiceDetailSaga(),
        ServicePaginationSaga(),
    ]);
}

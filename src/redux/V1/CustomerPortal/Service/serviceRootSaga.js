import { all } from "redux-saga/effects";
import { ServiceListSaga } from "@store/V1/CustomerPortal/Service/List/ServiceListSaga"
import { ServicePaginationSaga } from "@store/V1/CustomerPortal/Service/Pagination/ServicePaginationSaga"

export default function* ServiceRootSaga() {
    yield all([
        ServiceListSaga(),
        ServicePaginationSaga(),
    ]);
}

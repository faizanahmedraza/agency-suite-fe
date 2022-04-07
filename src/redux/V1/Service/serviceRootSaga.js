import { all } from "redux-saga/effects";
import { ServiceCreateSaga , serviceCreateSuccessSaga } from "@store/V1/Service/Create/ServiceCreateSaga"
import { ServiceListSaga } from "@store/V1/Service/List/ServiceListSaga"

export default function* ServiceRootSaga() {
    yield all([
        ServiceCreateSaga(),
        serviceCreateSuccessSaga(),
        ServiceListSaga()
    ]);
}

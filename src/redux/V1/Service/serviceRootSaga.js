import { all } from "redux-saga/effects";
import { ServiceCreateSaga } from "@store/V1/Service/Create/ServiceCreateSaga"

export default function* ServiceRootSaga() {
    yield all([
        ServiceCreateSaga()
    ]);
}

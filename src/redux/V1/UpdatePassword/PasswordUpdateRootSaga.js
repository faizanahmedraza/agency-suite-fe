import { all } from "redux-saga/effects";
import { PasswordUpdateSaga } from "@store/V1/UpdatePassword/UPDATE/UpdatePasswordSaga";

export default function* PasswordUpdateRootSaga() {
    yield all([
        PasswordUpdateSaga(),
    ]);
}

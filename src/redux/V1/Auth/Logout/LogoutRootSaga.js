import { all } from "redux-saga/effects";
import {
    deleteLogoutSaga,
    deleteLogoutSuccessSaga,
    deleteLogoutFailedSaga,
} from "@store/V1/Auth/Logout/LogoutSaga";

export default function* LogoutRootSaga() {
    yield all([deleteLogoutSaga(), deleteLogoutSuccessSaga(), deleteLogoutFailedSaga()]);
}

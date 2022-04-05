import { all } from "redux-saga/effects";
import {
    postLoginSaga,
    postLoginSuccessSaga,
    postLoginFailedSaga,
} from "@store/V1/Auth/Login/LoginSaga";

export default function* LoginRootSaga() {
    yield all([postLoginSaga(), postLoginSuccessSaga(), postLoginFailedSaga()]);
}

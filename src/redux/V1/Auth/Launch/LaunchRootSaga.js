import { all } from "redux-saga/effects";
import {
    postLaunchSaga,
    postLaunchSuccessSaga,
    postLaunchFailedSaga,
} from "@store/V1/Auth/Launch/LaunchSaga";

export default function* LaunchRootSaga() {
    yield all([postLaunchSaga(), postLaunchSuccessSaga(),
    postLaunchFailedSaga(),]);
}

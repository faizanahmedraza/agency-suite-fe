import { all } from "redux-saga/effects";
import { PaymentGatewayListSaga } from "@store/V1/PaymentGateway/GET/PaymentGatewayListSaga";

export default function* PaymentGatewayRootSaga() {
    yield all([
        PaymentGatewayListSaga()
    ]);
}

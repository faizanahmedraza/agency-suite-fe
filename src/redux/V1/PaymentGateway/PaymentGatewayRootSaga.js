import { all } from "redux-saga/effects";
import { PaymentGatewayListSaga } from "@store/V1/PaymentGateway/Detail/PaymentGatewayDetailSaga";
import { PaymentGatewayCreateSaga } from "@store/V1/PaymentGateway/Create/PaymentGatewayCreateSaga";

export default function* PaymentGatewayRootSaga() {
    yield all([
        PaymentGatewayListSaga(),
        PaymentGatewayCreateSaga()
    ]);
}

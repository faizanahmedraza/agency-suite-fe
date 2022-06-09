import { takeEvery, put } from "redux-saga/effects"
import PAYMENT_GATEWAY from "@store/V1/PaymentGateway/ActionTypes"
import PaymentGatewayService from "@src/Services/V1/PaymentGatewayService";
import PaymentGatewayActions from "@store/V1/PaymentGateway/Create/PaymentGatewayCreateAction"

function* PaymentGatewayCreate(data) {
    const response = yield PaymentGatewayService.paymentGatewayCreate(data.request)
    if (response.success) {
        yield put(PaymentGatewayActions.paymentGatewayCreateSuccess(response.data))
    } else {
        yield put(PaymentGatewayActions.paymentGatewayCreateFailed(response))
    }
}

export function* PaymentGatewayCreateSaga() {
    yield takeEvery(PAYMENT_GATEWAY.PAYMENT_GATEWAY_CREATE, PaymentGatewayCreate);
}

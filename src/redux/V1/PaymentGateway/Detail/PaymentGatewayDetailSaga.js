import { takeEvery, put } from "redux-saga/effects"
import PAYMENT_GATEWAY from "@store/V1/PaymentGateway/ActionTypes"
import PaymentGatewayService from "@src/Services/V1/PaymentGatewayService";
import PaymentGatewayActions from "@store/V1/PaymentGateway/Detail/PaymentGatewayDetailAction"

function* PaymentGatewayList(data) {
    const response = yield PaymentGatewayService.paymentGatewayDetail(data.request)
    if (response.success) {
        yield put(PaymentGatewayActions.paymentGatewayListSuccess(response.data))
    } else {
        yield put(PaymentGatewayActions.paymentGatewayListFailed(response))
    }
}

export function* PaymentGatewayListSaga() {
    yield takeEvery(PAYMENT_GATEWAY.PAYMENT_GATEWAY_DETAIL, PaymentGatewayList);
}

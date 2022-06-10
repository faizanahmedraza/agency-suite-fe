import { takeEvery, put } from "redux-saga/effects"
import PAYMENT_GATEWAY from "@store/V1/PaymentGateway/ActionTypes"
import PaymentGatewayService from "@src/Services/V1/PaymentGatewayService";
import PaymentGatewayActions from "@store/V1/PaymentGateway/Status/PaymentGatewayStatusAction"
import toast from "react-hot-toast"

function* PaymentGatewayStatus(data) {
    const response = yield PaymentGatewayService.paymentGatewayStatus(data.request)
    if (response.success) {
        toast.success("Status Changed")
        yield put(PaymentGatewayActions.paymentGatewayStatusSuccess(response.data))
    } else {
        yield put(PaymentGatewayActions.paymentGatewayStatusFailed(response))
    }
}

export function* PaymentGatewayStatusSaga() {
    yield takeEvery(PAYMENT_GATEWAY.PAYMENT_GATEWAY_STATUS, PaymentGatewayStatus);
}

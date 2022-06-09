import { takeEvery, put } from "redux-saga/effects"
import PAYMENT_GATEWAY from "@store/V1/PaymentGateway/ActionTypes"
// import ServiceActions from "@store/V1/Service/List/ServiceListAction"
// import AgencyService from "@src/Services/V1/AgencyService"

function* PaymentGatewayList(data) {

    console.log("reducer chala")
    // const response = yield AgencyService.serviceList(data.request)
    // if (response.success) {
    //     yield put(ServiceActions.serviceListSuccess(response.data))
    // } else {
    //     yield put(ServiceActions.serviceListFailed(response))
    // }
}

export function* PaymentGatewayListSaga() {
    yield takeEvery(PAYMENT_GATEWAY.PAYMENT_GATEWAY_DETAIL, PaymentGatewayList);
}

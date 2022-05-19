import { takeEvery, put } from "redux-saga/effects";
import SERVICE from "@store/V1/CustomerPortal/Service/ActionTypes"
import ServiceActions from "@store/V1/CustomerPortal/Service/Detail/ServiceDetailAction"
import AgencyService from "@src/Services/V1/CustomerPortal/AgencyService"
import toast from 'react-hot-toast';

function* serviceDetail(data) {
  try {
    const response = yield AgencyService.serviceDetail(data.request);
    if (response.success) {
      yield put(ServiceActions.serviceDetailSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(ServiceActions.serviceDetailFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
    yield put(ServiceActions.serviceDetailFailed());
  }
}

export function* InvoiceDetailSaga() {
  yield takeEvery(SERVICE.CUSTOMER_SERVICE_DETAIL, serviceDetail);
}
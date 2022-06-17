import { takeEvery, put } from "redux-saga/effects";
import SERVICE_REQUEST from "@store/V1/CustomerPortal/ServiceRequest/ActionTypes"
import CancelAction from "@store/V1/CustomerPortal/ServiceRequest/CANCEL/CancelAction";
import ServiceRequestService from "@src/Services/V1/CustomerPortal/ServiceRequestService"
import toast from 'react-hot-toast';

function* serviceRequestCancel(data) {
  try {
    const response = yield ServiceRequestService.serviceRequestCancel(data.request);
    if (response.success) {
      toast.success(response.message)
      yield put(CancelAction.cancelServiceRequestSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(CancelAction.cancelServiceRequestFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
  }
}

function* serviceRequestCancelSuccess() {
  window.location.href = "/customer-service-requests";
}

export function* ServiceRequestCancelSaga() {
  yield takeEvery(SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CANCEL, serviceRequestCancel);
}

export function* ServiceRequestCancelSuccessSaga() {
  yield takeEvery(SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CANCEL_SUCCESS, serviceRequestCancelSuccess);
}
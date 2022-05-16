import { takeEvery, put } from "redux-saga/effects";
import SERVICE_REQUEST from "@store/V1/CustomerPortal/ServiceRequest/ActionTypes"
import ServiceRequestDetailAction from "@store/V1/CustomerPortal/ServiceRequest/DETAIL/ServiceRequestDetailAction"
import ServiceRequestService from "@src/Services/V1/CustomerPortal/ServiceRequestService"
import toast from 'react-hot-toast';

function* serviceRequestDetail(data) {
  try {
    const response = yield ServiceRequestService.serviceRequestDetail(data.request);
    if (response.success) {
      yield put(ServiceRequestDetailAction.serviceRequestDetailSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(ServiceRequestDetailAction.serviceRequestDetailFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
  }
}

export function* ServiceRequestDetailSaga() {
  yield takeEvery(SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_DETAIL, serviceRequestDetail);
}
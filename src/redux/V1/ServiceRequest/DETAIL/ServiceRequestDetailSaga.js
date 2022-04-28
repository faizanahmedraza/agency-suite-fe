import { takeEvery, put } from "redux-saga/effects";
import SERVICE_REQUEST from "@store/V1/ServiceRequest/ActionTypes"
import ServiceRequestDetailAction from "@store/V1/ServiceRequest/DETAIL/ServiceRequestDetailAction"
import AgencyServiceRequestService from "@src/Services/V1/AgencyServiceRequestService"
import toast from 'react-hot-toast';

function* serviceRequestDetail(data) {
  try {
    const response = yield AgencyServiceRequestService.serviceRequestDetail(data.request);
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
    yield put(ServiceRequestDetailAction.serviceRequestDetailFailed());
  }
}

export function* ServiceRequestDetailSaga() {
  yield takeEvery(SERVICE_REQUEST.SERVICE_REQUEST_DETAIL, serviceRequestDetail);
}
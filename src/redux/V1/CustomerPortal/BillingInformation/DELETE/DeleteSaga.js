import { takeEvery, put } from "redux-saga/effects";
import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";
import DeleteAction from "@store/V1/CustomerPortal/BillingInformation/DELETE/DeleteAction";
import BillingInformationService from "@src/Services/V1/CustomerPortal/BillingInformationService";
import toast from 'react-hot-toast';

function* billingInfoDelete(data) {
  try {
    const response = yield BillingInformationService.billingInformationDelete(data.request);
    if (response.success) {
      yield put(DeleteAction.billingInfoDeleteSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(DeleteAction.billingInfoDeleteFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
  }
}

export function* BillingInformationDeleteSaga() {
  yield takeEvery(BILLING_INFORMATION.BILLING_INFORMATION_DELETE, billingInfoDelete);
}
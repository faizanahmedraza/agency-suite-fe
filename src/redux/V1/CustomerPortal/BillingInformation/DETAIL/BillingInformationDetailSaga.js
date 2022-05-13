import { takeEvery, put } from "redux-saga/effects";
import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";
import BillingInformationDetailAction from "@store/V1/CustomerPortal/BillingInformation/DETAIL/BillingInformationDetailAction";
import BillingInformationService from "@src/Services/V1/CustomerPortal/BillingInformationService";
import toast from 'react-hot-toast';

function* billingInformationDetail(data) {
  try {
    const response = yield BillingInformationService.billingInformationDetail(data.request);
    if (response.success) {
      yield put(BillingInformationDetailAction.billingInformationDetailSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(BillingInformationDetailAction.billingInformationDetailFailed(response));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
    yield put(BillingInformationDetailAction.billingInformationDetailFailed());
  }
}

export function* BillingInformationDetailSaga() {
  yield takeEvery(BILLING_INFORMATION.BILLING_INFORMATION_DETAIL, billingInformationDetail);
}
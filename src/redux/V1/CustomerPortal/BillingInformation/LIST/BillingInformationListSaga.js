import { takeEvery, put } from "redux-saga/effects";
import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";
import BillingInformationListAction from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListAction";
import BillingInformationService from "@src/Services/V1/CustomerPortal/BillingInformationService";
import toast from 'react-hot-toast';

function* billingInformationList() {
  try {
    const response = yield BillingInformationService.billingInformationList();
    if (response.success) {
      yield put(BillingInformationListAction.billingInformationListSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(BillingInformationListAction.billingInformationListFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
  }
}

export function* BillingInformationListSaga() {
  yield takeEvery(BILLING_INFORMATION.BILLING_INFORMATION_LIST, billingInformationList);
}
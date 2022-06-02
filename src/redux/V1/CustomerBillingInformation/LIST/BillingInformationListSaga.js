import { takeEvery, put } from "redux-saga/effects";
import CUSTOMER_BILLING_INFORMATION from "@store/V1/CustomerBillingInformation/ActionType";
import BillingInformationListAction from "@store/V1/CustomerBillingInformation/LIST/BillingInformationListAction";
import BillingInformationService from "@src/Services/V1/CustomerBillingInformationService";
import toast from 'react-hot-toast';

function* billingInformationList(data) {
  try {
    const response = yield BillingInformationService.billingInformationList(data.request);
    if (response.success) {
      yield put(BillingInformationListAction.billingInformationListSuccess(response.data));
    } else {
      // toast.error(response.error.message);
      yield put(BillingInformationListAction.billingInformationListFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
  }
}

export function* BillingInformationListSaga() {
  yield takeEvery(CUSTOMER_BILLING_INFORMATION.CUSTOMER_BILLING_INFORMATION_LIST, billingInformationList);
}
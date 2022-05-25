import { takeEvery, put } from "redux-saga/effects";
import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";
import MarkPrimaryAction from "@store/V1/CustomerPortal/BillingInformation/MARK_PRIMARY/MarkPrimaryAction";
import BillingInformationService from "@src/Services/V1/CustomerPortal/BillingInformationService";
import toast from 'react-hot-toast';

function* markPrimary(data) {
  try {
    const response = yield BillingInformationService.markPrimaryPut(data.request);
    if (response.success) {
      yield put(MarkPrimaryAction.markPrimarySuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(MarkPrimaryAction.markPrimaryFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
  }
}

export function* MarkPrimarySaga() {
  yield takeEvery(BILLING_INFORMATION.MARK_PRIMARY, markPrimary);
}
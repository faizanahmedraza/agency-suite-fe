import { takeEvery, put } from "redux-saga/effects";
import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";
import PaymentMethodAction from "@store/V1/CustomerPortal/BillingInformation/PAYMENT_METHOD/PaymentMethodAction";
import BillingInformationService from "@src/Services/V1/CustomerPortal/BillingInformationService";
import toast from 'react-hot-toast';

function* paymentMethod(data) {
  try {
    const response = yield BillingInformationService.paymentMethodPut(data.request);
    if (response.success) {
      yield put(PaymentMethodAction.paymentMethodSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(PaymentMethodAction.paymentMethodFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
  }
}

export function* PaymentMethodSaga() {
  yield takeEvery(BILLING_INFORMATION.PAYMENT_METHOD, paymentMethod);
}
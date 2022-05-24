import { takeEvery, put } from "redux-saga/effects";
import INVOICE from "@store/V1/CustomerPortal/Invoice/ActionTypes"
import InvoicePaidAction from "@store/V1/CustomerPortal/Invoice/InvoicePaid/InvoicePaidAction";
import InvoiceService from "@src/Services/V1/CustomerPortal/InvoiceService"
import toast from 'react-hot-toast';

function* invoicePaid(data) {
  try {
    const response = yield InvoiceService.invoicePaidPut(data.request);
    if (response.success) {
      yield put(InvoicePaidAction.invoicePaidSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(InvoicePaidAction.invoicePaidFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
  }
}

export function* InvoicePaidSaga() {
  yield takeEvery(INVOICE.CUSTOMER_INVOICE_PAID, invoicePaid);
}
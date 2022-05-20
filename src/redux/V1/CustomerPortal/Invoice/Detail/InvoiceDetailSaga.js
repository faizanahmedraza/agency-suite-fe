import { takeEvery, put } from "redux-saga/effects";
import INVOICE from "@store/V1/CustomerPortal/Invoice/ActionTypes"
import InvoiceDetailAction from "@store/V1/CustomerPortal/Invoice/Detail/InvoiceDetailAction"
import InvoiceService from "@src/Services/V1/CustomerPortal/InvoiceService"
import toast from 'react-hot-toast';

function* serviceDetail(data) {
  try {
    const response = yield InvoiceService.invoiceDetail(data.request);
    if (response.success) {
      yield put(InvoiceDetailAction.invoiceDetailSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(InvoiceDetailAction.invoiceDetailFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
  }
}

export function* InvoiceDetailSaga() {
  yield takeEvery(INVOICE.CUSTOMER_INVOICE_DETAIL, serviceDetail);
}
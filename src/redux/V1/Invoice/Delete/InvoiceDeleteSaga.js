import { takeEvery, put } from "redux-saga/effects";
import INVOICE from "@store/V1/Invoice/ActionTypes"
import InvoiceDeleteAction from "@store/V1/Invoice/Delete/InvoiceDeleteAction"
import InvoiceService from "@src/Services/V1/InvoiceService"
import toast from 'react-hot-toast';

function* invoiceDelete(data) {
  try {
    const response = yield InvoiceService.invoiceDelete(data.request);
    if (response.success) {
      yield put(InvoiceDeleteAction.invoiceDeleteSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(InvoiceDeleteAction.invoiceDeleteFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
  }
}

export function* InvoiceDeleteSaga() {
  yield takeEvery(INVOICE.INVOICE_DELETE, invoiceDelete);
}
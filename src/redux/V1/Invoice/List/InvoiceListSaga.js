import { takeEvery, put } from "redux-saga/effects"
import INVOICE from "@store/V1/Invoice/ActionTypes"
import InvoiceListAction from "@store/V1/Invoice/List/InvoiceListAction"
import InvoiceService from "@src/Services/V1/InvoiceService"

function* invoiceList(data) {
    const response = yield InvoiceService.invoiceList(data.request)
    if (response.success) {
        yield put(InvoiceListAction.invoiceListSuccess(response.data))
    } else {
        yield put(InvoiceListAction.invoiceListFailed(response))
    }
}

export function* InvoiceListSaga() {
    yield takeEvery(INVOICE.INVOICE_LIST, invoiceList);
}

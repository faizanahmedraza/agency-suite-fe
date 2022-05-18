import { takeEvery, put } from "redux-saga/effects"
import INVOICE from "@store/V1/CustomerPortal/Invoice/ActionTypes"
import InvoiceListAction from "@store/V1/CustomerPortal/Invoice/List/InvoiceListAction"
import InvoiceService from "@src/Services/V1/CustomerPortal/InvoiceService"

function* serviceList(data) {
    const response = yield InvoiceService.invoiceList(data.request)
    if (response.success) {
        yield put(InvoiceListAction.invoiceListSuccess(response.data))
    } else {
        yield put(InvoiceListAction.invoiceListFailed(response))
    }
}

export function* ServiceListSaga() {
    yield takeEvery(INVOICE.CUSTOMER_INVOICE_LIST, serviceList);
}

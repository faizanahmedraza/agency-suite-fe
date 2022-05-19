import { takeEvery, put } from "redux-saga/effects"
import INVOICE from "@store/V1/Invoice/ActionTypes"
import InvoiceStatusAction from "@store/V1/Invoice/Status/InvoiceStatusAction"
import InvoiceService from "@src/Services/V1/InvoiceService"
import toast from "react-hot-toast"

function* invoiceStatus(data) {
    const response = yield InvoiceService.invoiceStatus(data.request)
    if (response.success) {
        toast.success("Status Changed")
        yield put(InvoiceStatusAction.invoiceStatusSuccess(response.data))
    } else {
        toast.error(response.error.message)
        yield put(InvoiceStatusAction.invoiceStatusFailed(response))
    }
}

export function* InvoiceStatusSaga() {
    yield takeEvery(INVOICE.INVOICE_STATUS, invoiceStatus);
}

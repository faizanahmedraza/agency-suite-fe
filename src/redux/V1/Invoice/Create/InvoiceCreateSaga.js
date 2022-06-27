import { takeEvery, put } from "redux-saga/effects"
import INVOICE from "@store/V1/Invoice/ActionTypes"
import InvoiceCreateAction from "@store/V1/Invoice/Create/InvoiceCreateAction"
import InvoiceService from "@src/Services/V1/InvoiceService"
import toast from "react-hot-toast"

function* invoiceCreate(data) {
    const response = yield InvoiceService.invoicePost(data.request)
    if (response.success) {
        toast.success(response.message)
        yield put(InvoiceCreateAction.invoiceCreateSuccess(response))
    } else {
        toast.error(response.error.message)
        yield put(InvoiceCreateAction.invoiceCreateFailed(response))
    }
}

function invoiceCreateSuccess() {
    window.location.href = "/invoices"; 
}

export function* InvoiceCreateSuccessSaga() {
    yield takeEvery(INVOICE.INVOICE_CREATE_SUCCESS, invoiceCreateSuccess);
}

export function* InvoiceCreateSaga() {
    yield takeEvery(INVOICE.INVOICE_CREATE, invoiceCreate);
}

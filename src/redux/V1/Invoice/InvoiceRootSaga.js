import { all } from "redux-saga/effects";
import { InvoiceListSaga } from "@store/V1/Invoice/List/InvoiceListSaga"
import { InvoiceDeleteSaga } from "@store/V1/Invoice/Delete/InvoiceDeleteSaga"

export default function* InvoiceRootSaga() {
    yield all([
        InvoiceListSaga(),
        InvoiceDeleteSaga(),
    ]);
}

import { all } from "redux-saga/effects";
import { InvoiceListSaga } from "@store/V1/Invoice/List/InvoiceListSaga"
import { InvoiceDetailSaga } from "@store/V1/Invoice/Detail/InvoiceDetailSaga"
import { InvoiceStatusSaga } from "@store/V1/Invoice/Status/InvoiceStatusSaga"
import { InvoiceDeleteSaga } from "@store/V1/Invoice/Delete/InvoiceDeleteSaga"
import { InvoicePaidSaga } from "@store/V1/Invoice/InvoicePaid/InvoicePaidSaga"

export default function* InvoiceRootSaga() {
    yield all([
        InvoiceListSaga(),
        InvoiceDetailSaga(),
        InvoiceDeleteSaga(),
        InvoiceStatusSaga(),
        InvoicePaidSaga()
    ]);
}

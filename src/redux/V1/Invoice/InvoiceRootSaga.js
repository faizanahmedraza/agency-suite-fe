import { all } from "redux-saga/effects";
import { InvoiceListSaga } from "@store/V1/Invoice/List/InvoiceListSaga"
import { InvoiceCreateSaga,InvoiceCreateSuccessSaga } from "@store/V1/Invoice/Create/InvoiceCreateSaga"
import { InvoiceDetailSaga } from "@store/V1/Invoice/Detail/InvoiceDetailSaga"
import { InvoiceStatusSaga } from "@store/V1/Invoice/Status/InvoiceStatusSaga"
import { InvoiceDeleteSaga } from "@store/V1/Invoice/Delete/InvoiceDeleteSaga"
import { InvoicePaidSaga } from "@store/V1/Invoice/InvoicePaid/InvoicePaidSaga"

export default function* InvoiceRootSaga() {
    yield all([
        InvoiceListSaga(),
        InvoiceCreateSaga(),
        InvoiceCreateSuccessSaga(),
        InvoiceDetailSaga(),
        InvoiceDeleteSaga(),
        InvoiceStatusSaga(),
        InvoicePaidSaga()
    ]);
}

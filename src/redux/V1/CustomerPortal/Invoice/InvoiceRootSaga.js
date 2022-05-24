import { all } from "redux-saga/effects";
import { InvoiceListSaga } from "@store/V1/CustomerPortal/Invoice/List/InvoiceListSaga"
import { InvoiceDetailSaga } from "@store/V1/CustomerPortal/Invoice/Detail/InvoiceDetailSaga"
import { InvoicePaidSaga } from "@store/V1/CustomerPortal/Invoice/InvoicePaid/InvoicePaidSaga"

export default function* InvoiceRootSaga() {
    yield all([
        InvoiceListSaga(),
        InvoiceDetailSaga(),
        InvoicePaidSaga()
    ]);
}

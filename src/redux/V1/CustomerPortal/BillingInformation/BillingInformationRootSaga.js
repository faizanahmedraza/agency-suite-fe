import { all } from "redux-saga/effects";
import { BillingInformationListSaga } from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListSaga";
import { BillingInformationDetailSaga } from "@store/V1/CustomerPortal/BillingInformation/DETAIL/BillingInformationDetailSaga";
import { BillingInformationCreateSaga } from "@store/V1/CustomerPortal/BillingInformation/CREATE/BillingInformationCreateSaga";
import { BillingInformationDeleteSaga } from "@store/V1/CustomerPortal/BillingInformation/DELETE/DeleteSaga";
import { MarkPrimarySaga } from "@store/V1/CustomerPortal/BillingInformation/MARK_PRIMARY/MarkPrimarySaga";

export default function* BillingInformationRootSaga() {
  yield all([
    BillingInformationListSaga(),
    BillingInformationDetailSaga(),
    BillingInformationCreateSaga(),
    BillingInformationDeleteSaga(),
    MarkPrimarySaga(),
  ]);
}

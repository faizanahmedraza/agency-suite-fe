import { all } from "redux-saga/effects";
import { BillingInformationListSaga } from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListSaga";
import { BillingInformationDetailSaga } from "@store/V1/CustomerPortal/BillingInformation/DETAIL/BillingInformationDetailSaga";
import { BillingInformationCreateSaga } from "@store/V1/CustomerPortal/BillingInformation/CREATE/BillingInformationCreateSaga";
import { BillingInformationUpdateSaga } from "@store/V1/CustomerPortal/BillingInformation/UPDATE/BillingInformationUpdateSaga";

export default function* BillingInformationRootSaga() {
  yield all([
    BillingInformationListSaga(),
    BillingInformationDetailSaga(),
    BillingInformationCreateSaga(),
    BillingInformationUpdateSaga(),
  ]);
}

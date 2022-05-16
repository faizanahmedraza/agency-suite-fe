import { all } from "redux-saga/effects";
import { BillingInformationDetailSaga } from "@store/V1/CustomerPortal/BillingInformation/DETAIL/BillingInformationDetailSaga";
import { BillingInformationCreateSaga } from "@store/V1/CustomerPortal/BillingInformation/CREATE/BillingInformationCreateSaga";
import { BillingInformationUpdateSaga } from "@store/V1/CustomerPortal/BillingInformation/UPDATE/BillingInformationUpdateSaga";

export default function* BillingInformationRootSaga() {
  yield all([
    BillingInformationDetailSaga(),
    BillingInformationCreateSaga(),
    BillingInformationUpdateSaga(),
  ]);
}

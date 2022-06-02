import { all } from "redux-saga/effects";
import { BillingInformationListSaga } from "@store/V1/CustomerBillingInformation/LIST/BillingInformationListSaga";

export default function* CustomerBillingInformationRootSaga() {
  yield all([
    BillingInformationListSaga()
  ]);
}

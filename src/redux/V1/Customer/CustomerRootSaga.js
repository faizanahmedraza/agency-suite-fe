import { all } from "redux-saga/effects";
import { customerListSaga } from "@store/V1/Customer/LIST/CustomerListSaga";
import { customerFirstSaga } from "@store/V1/Customer/FIRST/CustomerFirstSaga";
import { customerDeleteSaga } from "@store/V1/Customer/DELETE/CustomerDeleteSaga";

export default function* CustomerRootSaga() {
  yield all([
    customerListSaga(),
    customerFirstSaga(),
    customerDeleteSaga(),
  ]);
}

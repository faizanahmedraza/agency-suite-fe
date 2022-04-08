import { all } from "redux-saga/effects";
import { customerListSaga } from "@store/V1/Customer/LIST/CustomerListSaga";
import { customerDetailSaga } from "@store/V1/Customer/DETAIL/CustomerDetailSaga";
import { customerCreateSaga } from "@store/V1/Customer/CREATE/CustomerCreateSaga";
import { customerUpdateSaga } from "@store/V1/Customer/UPDATE/CustomerUpdateSaga";
import { customerDeleteSaga } from "@store/V1/Customer/DELETE/CustomerDeleteSaga";

export default function* CustomerRootSaga() {
  yield all([
    customerListSaga(),
    customerDetailSaga(),
    customerCreateSaga(),
    customerUpdateSaga(),
    customerDeleteSaga(),
  ]);
}

import { all } from "redux-saga/effects";
import { customerListSaga } from "@store/V1/Customer/LIST/CustomerListSaga";
import { customerDetailSaga } from "@store/V1/Customer/DETAIL/CustomerDetailSaga";
import { customerCreateSaga,customerCreateSuccessSaga } from "@store/V1/Customer/CREATE/CustomerCreateSaga";
import { customerUpdateSaga } from "@store/V1/Customer/UPDATE/CustomerUpdateSaga";
import { customerDeleteSaga } from "@store/V1/Customer/DELETE/CustomerDeleteSaga";
import { CustomerStatusSaga } from "@store/V1/Customer/STATUS/CustomerStatusSaga";

export default function* CustomerRootSaga() {
  yield all([
    customerListSaga(),
    customerDetailSaga(),
    customerCreateSaga(),
    customerCreateSuccessSaga(),
    customerUpdateSaga(),
    customerDeleteSaga(),
    CustomerStatusSaga(),
  ]);
}

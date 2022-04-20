import { takeEvery, put } from "redux-saga/effects";
import CUSTOMER from "@store/V1/Customer/ActionType";
import CustomerDeleteAction from "@store/V1/Customer/DELETE/CustomerDeleteAction";
import CustomerListAction from "@store/V1/Customer/LIST/CustomerListAction";
import CustomerService from "@src/Services/V1/CustomerService";
import toast from 'react-hot-toast';

function* customerDelete(data) {
  try {
    const response = yield CustomerService.customerDelete(data.request);
    if (response.success) {
      toast.success(response.message);
      yield put(CustomerDeleteAction.customerDeleteSuccess(response.data));
      yield put(CustomerListAction.customerList());
    } else {
      toast.error(response.error.message);
      yield put(CustomerDeleteAction.customerDeleteFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
    yield put(CustomerDeleteAction.customerDeleteFailed());
  }
}

export function* customerDeleteSaga() {
  yield takeEvery(CUSTOMER.CUSTOMER_DELETE, customerDelete);
}
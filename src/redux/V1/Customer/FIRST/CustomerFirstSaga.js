import { takeEvery, put } from "redux-saga/effects";
import CUSTOMER from "@store/V1/Customer/ActionType";
import CustomerFirstAction from "@store/V1/Customer/FIRST/CustomerFirstAction";
import CustomerService from "@src/Services/V1/CustomerService";
import toast from 'react-hot-toast';

function* customerFirst(data) {
  try {
    const response = yield CustomerService.CustomerFirst(data.request);
    if (response.success) {
      yield put(CustomerFirstAction.customerFirstSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(CustomerFirstAction.CustomerFirstFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
    yield put(CustomerFirstAction.CustomerFirstFailed());
  }
}

export function* customerFirstSaga() {
  yield takeEvery(CUSTOMER.CUSTOMER_FIRST, customerFirst);
}
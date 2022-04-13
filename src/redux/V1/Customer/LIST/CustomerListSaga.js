import { takeEvery, put } from "redux-saga/effects";
import CUSTOMER from "@store/V1/Customer/ActionType";
import CustomerListAction from "@store/V1/Customer/LIST/CustomerListAction";
import CustomerService from "@src/Services/V1/CustomerService";
import toast from 'react-hot-toast';

function* customerList(data) {
  try {
    const response = yield CustomerService.customerList(data.request);
    if (response.success) {
      yield put(CustomerListAction.customerListSuccess(response.data));
    } else {
      yield put(CustomerListAction.customerListFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
    yield put(CustomerListAction.customerListFailed());
  }
}

export function* customerListSaga() {
  yield takeEvery(CUSTOMER.CUSTOMER_LIST, customerList);
}

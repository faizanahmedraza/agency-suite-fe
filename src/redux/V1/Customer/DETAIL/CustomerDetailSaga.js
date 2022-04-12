import { takeEvery, put } from "redux-saga/effects";
import CUSTOMER from "@store/V1/Customer/ActionType";
import CustomerDetailAction from "@store/V1/Customer/DETAIL/CustomerDetailAction";
import CustomerService from "@src/Services/V1/CustomerService";
import toast from 'react-hot-toast';

function* customerDetail(data) {
  try {
    const response = yield CustomerService.customerDetail(data.request);
    if (response.success) {
      yield put(CustomerDetailAction.customerDetailSuccess(response.data));
    } else {
      toast.error(response.error.message);
      yield put(CustomerDetailAction.customerDetailFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );
    yield put(CustomerDetailAction.customerDetailFailed());
  }
}

export function* customerDetailSaga() {
  yield takeEvery(CUSTOMER.CUSTOMER_DETAIL, customerDetail);
}
import { takeEvery, put } from "redux-saga/effects"
import CUSTOMER from "@store/V1/Customer/ActionType";
import CustomerUpdateAction from "@store/V1/Customer/UPDATE/CustomerUpdateAction";
import CustomerService from "@src/Services/V1/CustomerService";
import toast from 'react-hot-toast';

function* customerUpdate(data) {
    const response = yield CustomerService.customerPut(data.request.form, data.request.id)
    if (response.success) {
        toast.success(response.message)
        yield put(CustomerUpdateAction.customerUpdateSuccess(response.data))
        window.location.href = "/customers";
    } else {
        toast.error(response.error.message)
        yield put(CustomerUpdateAction.customerUpdateFailed(response))
    }
}

export function* customerUpdateSaga() {
    yield takeEvery(CUSTOMER.CUSTOMER_UPDATE, customerUpdate);
}

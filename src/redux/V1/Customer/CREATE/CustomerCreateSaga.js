import { takeEvery, put } from "redux-saga/effects"
import CUSTOMER from "@store/V1/Customer/ActionType";
import CustomerCreateAction from "@store/V1/Customer/CREATE/CustomerCreateAction";
import CustomerService from "@src/Services/V1/CustomerService";
import toast from 'react-hot-toast';

function* customerCreate(data) {
    const response = yield CustomerService.customerPost(data.request)
    if (response.success) {
        toast.success(response.message)
        yield put(CustomerCreateAction.customerCreateSuccess(response));
    } else {
        toast.error(response.error.message)
        yield put(CustomerCreateAction.customerCreateFailed(response))
    }
}

export function* customerCreateSaga() {
    yield takeEvery(CUSTOMER.CUSTOMER_CREATE, customerCreate);
}

function customerCreateSuccess() {
    window.location.href = "/customers";
}

export function* customerCreateSuccessSaga() {
    yield takeEvery(CUSTOMER.CUSTOMER_CREATE_SUCCESS, customerCreateSuccess);
}


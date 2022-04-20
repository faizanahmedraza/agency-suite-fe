import { takeEvery, put } from "redux-saga/effects"
import CUSTOMER from "@store/V1/Customer/ActionType";
import CustomerStatusAction from "@store/V1/Customer/STATUS/CustomerStatusAction";
import CustomerService from "@src/Services/V1/CustomerService";
import toast from "react-hot-toast"

function* customerToggleStatus(data) {
    const response = yield CustomerService.customerToggleStatus(data.request)
    if (response.success) {
        toast.success("Status Changed")
        yield put(CustomerStatusAction.customerStatusSuccess(response.data))
    } else {
        toast.error(response.error.message)
        yield put(CustomerStatusAction.customerStatusFailed(response))
    }
}

export function* CustomerStatusSaga() {
    yield takeEvery(CUSTOMER.CUSTOMER_STATUS, customerToggleStatus);
}

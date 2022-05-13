import { takeEvery, put } from "redux-saga/effects"
import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";
import BillingInformationUpdateAction from "@store/V1/CustomerPortal/BillingInformation/UPDATE/BillingInformationUpdateAction";
import BillingInformationService from "@src/Services/V1/CustomerPortal/BillingInformationService";
import toast from 'react-hot-toast';

function* billingInformationUpdate(data) {
    try {
        const response = yield BillingInformationService.billingInformationPut(data.request.form)
        if (response.success) {
            toast.success(response.message)
            yield put(BillingInformationUpdateAction.billingInformationUpdateSuccess(response.data))
        } else {
            toast.error(response.error.message)
            yield put(BillingInformationUpdateAction.billingInformationUpdateFailed(response.error))
        }
    } catch (error) {
        toast.error(
            "Something went wrong and we have been notified about the problem"
        );
        yield put(BillingInformationUpdateAction.billingInformationUpdateFailed());
    }
}

export function* BillingInformationUpdateSaga() {
    yield takeEvery(BILLING_INFORMATION.BILLING_INFORMATION_UPDATE, billingInformationUpdate);
}

import { takeEvery, put } from "redux-saga/effects"
import BILLING_INFORMATION from "@store/V1/CustomerPortal/BillingInformation/ActionType";
import BillingInformationCreateAction from "@store/V1/CustomerPortal/BillingInformation/CREATE/BillingInformationCreateAction";
import BillingInformationService from "@src/Services/V1/CustomerPortal/BillingInformationService";
import toast from 'react-hot-toast';

function* billingInformationCreate(data) {
    try {
        const response = yield BillingInformationService.billingInformationPost(data.request)
        if (response.success) {
            toast.success(response.message)
            yield put(BillingInformationCreateAction.billingInformationCreateSuccess(response));
        } else {
            toast.error(response.error.message)
            yield put(BillingInformationCreateAction.billingInformationCreateFailed(response.error))
        }
    } catch (error) {
        toast.error(
            "Something went wrong and we have been notified about the problem"
        );
        yield put(BillingInformationCreateAction.billingInformationCreateFailed());
    }
}

export function* BillingInformationCreateSaga() {
    yield takeEvery(BILLING_INFORMATION.BILLING_INFORMATION_CREATE, billingInformationCreate);
}

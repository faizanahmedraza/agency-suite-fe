import { takeEvery, put } from "redux-saga/effects";
import PASSWORD_UPDATE from "@store/V1/UpdatePassword/ActionTypes";
import PasswordUpdateAction from "@store/V1/UpdatePassword/UPDATE/UpdatePasswordAction";
import UpdatePasswordService from "@src/Services/V1/UpdatePasswordService";
import toast from "react-hot-toast";

function* passwordUpdate(data) {
  try {
    const response = yield UpdatePasswordService.passwordUpdatePut(data.request);
    if (response.success) {
      toast.success(response.message);
      yield put(PasswordUpdateAction.passwordUpdateSuccess(response.data));
      window.location.href="/profile";
    } else {
      toast.error(response.error.message);
      yield put(PasswordUpdateAction.passwordUpdateFailed(response.error));
    }
  } catch (error) {
    toast.error(
      "Something went wrong and we have been notified about the problem"
    );   
  }
}

export function* PasswordUpdateSaga() {
  yield takeEvery(PASSWORD_UPDATE.PASSWORD_UPDATE, passwordUpdate);
}
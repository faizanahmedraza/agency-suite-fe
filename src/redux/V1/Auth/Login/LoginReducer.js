import LOGIN_ACTION_TYPE from "@store/V1/Auth/Login/LoginActionType";
import LoginHelper from "@src/Helpers/LoginHelper";

export default (
    state = {
        loading: false,
        isAuthenticated: localStorage.getItem("access_token") ? true : false,
        token: localStorage.getItem("access_token"),
        user: localStorage.getItem("user")
            ? LoginHelper.localData(localStorage.getItem("user"))
            : null,
        permissions: localStorage.getItem("permissions")
            ? LoginHelper.localData(localStorage.getItem("permissions"))
            : [],
    },
    action
) => {
    switch (action.type) {
        case LOGIN_ACTION_TYPE.POST_LOGIN:
            return { ...state, loading: true };
        case LOGIN_ACTION_TYPE.POST_LOGIN_SCCUESS:
            return { ...state, loading: false };
        case LOGIN_ACTION_TYPE.POST_LOGIN_FAILED:
            return { ...state, loading: false };
        default:
            return state;
    }
};

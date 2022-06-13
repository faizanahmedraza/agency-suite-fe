import LOGOUT_ACTION_TYPE from "@store/V1/Auth/Logout/LogoutActionType";

export default (
    state = {
        loading: false,
        success: false
    },
    action
) => {
    switch (action.type) {
        case LOGOUT_ACTION_TYPE.DELETE_LOGOUT:
            return { loading: true, success: false };
        case LOGOUT_ACTION_TYPE.DELETE_LOGOUT_SUCCESS:
            return { loading: false, success: true };
        case LOGOUT_ACTION_TYPE.DELETE_LOGOUT_FAILED:
            return { ...state, loading: false };
        default:
            return state;
    }
};

import LAUNCH_ACTION_TYPE from "@store/V1/Auth/Launch/LaunchActionType";

export default (
    state = {
        loading: false,
        portal_settings : null,
        agency : null
    },
    action
) => {
    switch (action.type) {
        case LAUNCH_ACTION_TYPE.POST_LAUNCH:
            return { ...state, loading: true };
        case LAUNCH_ACTION_TYPE.POST_LAUNCH_SUCCESS:
            return { ...state, loading: false , portal_settings : action.response.portal_settings , agency : action.response.portal_settings.agency };
        case LAUNCH_ACTION_TYPE.POST_LAUNCH_FAILED:
            return { ...state, loading: false };
        default:
            return state;
    }
};

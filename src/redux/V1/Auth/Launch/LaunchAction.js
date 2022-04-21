import LAUNCH_ACTION_TYPE from "@store/V1/Auth/Launch/LaunchActionType";

function postLaunch(request) {
    return {
        type: LAUNCH_ACTION_TYPE.POST_LAUNCH,
        request
    };
}

function postLaunchSuccess(response) {
    return {
        type: LAUNCH_ACTION_TYPE.POST_LAUNCH_SUCCESS,
        response
    };
}

function postLaunchFailed(response) {
    return { type: LAUNCH_ACTION_TYPE.POST_LAUNCH_FAILED, response };
}

const LaunchAction = {
    postLaunch,
    postLaunchSuccess,
    postLaunchFailed,
};

export default LaunchAction;

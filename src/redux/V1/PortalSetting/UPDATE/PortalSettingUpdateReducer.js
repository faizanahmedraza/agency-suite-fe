import SERVICE from "@store/V1/Service/ActionTypes"

const PortalSettingUpdateReducer = (
    state = {
        loading: false,
        portal_settings: {}
    },
    action
) => {
    switch (action.type) {
        case PORT_SETTING_UPDATE.PORT_SETTING_UPDATE:
            return {
                ...state,
                loading: true,
            }
        case PORT_SETTING_UPDATE.PORT_SETTING_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                portal_settings: action.response.portal_settings,
            }
        case PORT_SETTING_UPDATE.PORT_SETTING_UPDATE_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default PortalSettingUpdateReducer;

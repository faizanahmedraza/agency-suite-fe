import SERVICE from "@store/V1/Service/ActionTypes"

const ServiceStatusReducer = (
    state = {
        loading: false,
        isChanged : false
    },
    action
) => {
    switch (action.type) {
        case SERVICE.SERVICE_STATUS:
            return {
                ...state,
                loading: true,
                isChanged : false
            }
        case SERVICE.SERVICE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isChanged : true
            }
        case SERVICE.SERVICE_STATUS_FAILED:
            return {
                ...state,
                loading: false,
                isChanged : false
            }
        default:
            return state
    }
}

export default ServiceStatusReducer;

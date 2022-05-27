import SERVICE from "@store/V1/Service/ActionTypes"

const ServiceStatusReducer = (
    state = {
        loading: false,
        isChanged : false,
        response: false,
    },
    action
) => {
    switch (action.type) {
        case SERVICE.SERVICE_STATUS:
            return {
                ...state,
                loading: true,
                isChanged : false,
                response: false,
            }
        case SERVICE.SERVICE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isChanged : true,
                response: true,
            }
        case SERVICE.SERVICE_STATUS_FAILED:
            return {
                ...state,
                loading: false,
                isChanged : false,
                response: true,
            }
        default:
            return state
    }
}

export default ServiceStatusReducer;

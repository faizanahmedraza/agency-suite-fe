import SERVICE_REQUEST from "@store/V1/ServiceRequest/ActionTypes"

const ServiceRequestCreateReducer = (
    state = {
        loading: false,
        error: null
    },
    action
) => {
    switch (action.type) {
        case SERVICE_REQUEST.SERVICE_REQUEST_CREATE:
            return {
                ...state,
                loading: true,
            }
        case SERVICE_REQUEST.SERVICE_REQUEST_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case SERVICE_REQUEST.SERVICE_REQUEST_CREATE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.response.message
            }
        default:
            return state
    }
}

export default ServiceRequestCreateReducer;

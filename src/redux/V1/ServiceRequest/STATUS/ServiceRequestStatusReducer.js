import SERVICE_REQUEST from "@store/V1/ServiceRequest/ActionTypes"

const ServiceRequestStatusReducer = (
    state = {
        loading: false,
        isChanged : false
    },
    action
) => {
    switch (action.type) {
        case SERVICE_REQUEST.SERVICE_REQUEST_STATUS:
            return {
                ...state,
                loading: true,
                isChanged : false
            }
        case SERVICE_REQUEST.SERVICE_REQUEST_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isChanged : true
            }
        case SERVICE_REQUEST.SERVICE_REQUEST_STATUS_FAILED:
            return {
                ...state,
                loading: false,
                isChanged : false
            }
        default:
            return state
    }
}

export default ServiceRequestStatusReducer;

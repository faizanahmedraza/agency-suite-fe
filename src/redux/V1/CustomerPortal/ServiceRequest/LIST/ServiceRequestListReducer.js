import SERVICE_REQUEST from "@store/V1/CustomerPortal/ServiceRequest/ActionTypes"

const ServiceRequestListReducer = (
    state = {
        loading: false,
        service_requests: [],
        pagination : null
    },
    action
) => {
    switch (action.type) {
        case SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_LIST:
            return {
                ...state,
                loading: true,
            }
        case SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                service_requests: action.response.customer_service_request,
                pagination : action.response.pagination
            }
        case SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_LIST_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default ServiceRequestListReducer;

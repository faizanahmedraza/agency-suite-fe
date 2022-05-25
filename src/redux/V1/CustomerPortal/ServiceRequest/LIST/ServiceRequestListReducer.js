import SERVICE_REQUEST from "@store/V1/CustomerPortal/ServiceRequest/ActionTypes"

const ServiceRequestListReducer = (
    state = {
        loading: false,
        service_requests: [],
        pagination : null,
        isFetched: false,
    },
    action
) => {
    switch (action.type) {
        case SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_LIST:
            return {
                ...state,
                loading: true,
                isFetched: false,
            }
        case SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                service_requests: action.response.customer_service_request,
                pagination : action.response.pagination,
                isFetched: true,
            }
        case SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_LIST_FAILED:
            return {
                ...state,
                loading: false,
                isFetched: false,
            }
        default:
            return state
    }
}

export default ServiceRequestListReducer;

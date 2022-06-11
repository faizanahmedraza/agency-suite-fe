import SERVICE from "@store/V1/CustomerPortal/Service/ActionTypes"

const ServiceListReducer = (
    state = {
        loading: false,
        services: [],
        pagination : null,
        isFetched: false,
    },
    action
) => {
    switch (action.type) {
        case SERVICE.CUSTOMER_SERVICE_LIST:
            return {
                ...state,
                loading: true,
                isFetched: false,
                services: [],
            }
        case SERVICE.CUSTOMER_SERVICE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.response.services,
                pagination : action.response.pagination,
                isFetched: true,
            }
        case SERVICE.CUSTOMER_SERVICE_LIST_FAILED:
            return {
                ...state,
                loading: false,
                isFetched: false,
            }
        default:
            return state
    }
}

export default ServiceListReducer;

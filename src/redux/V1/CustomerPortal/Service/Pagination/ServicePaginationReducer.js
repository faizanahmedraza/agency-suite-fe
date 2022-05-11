import SERVICE from "@store/V1/CustomerPortal/Service/ActionTypes"

const ServicePaginationReducer = (
    state = {
        loading: false,
        services: [],
        isFetched :false
    },
    action
) => {
    switch (action.type) {
        case SERVICE.CUSTOMER_SERVICE_PAGINATION:
            return {
                ...state,
                loading: true,
            }
        case SERVICE.CUSTOMER_SERVICE_PAGINATION_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.response.services,
                isFetched : true
            }
        case SERVICE.CUSTOMER_SERVICE_PAGINATION_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default ServicePaginationReducer;

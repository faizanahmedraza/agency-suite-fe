import SERVICE from "@store/V1/Service/ActionTypes"

const ServiceListReducer = (
    state = {
        loading: false,
        services: [],
        pagination : null
    },
    action
) => {
    switch (action.type) {
        case SERVICE.SERVICE_LIST:
            return {
                ...state,
                loading: true,
            }
        case SERVICE.SERVICE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.response.services,
                pagination : action.response.pagination
            }
        case SERVICE.SERVICE_LIST_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default ServiceListReducer;
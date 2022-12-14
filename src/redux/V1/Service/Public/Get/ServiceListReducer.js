import SERVICE from "@store/V1/Service/ActionTypes"

const ServicePublicListReducer = (
    state = {
        loading: false,
        services: [],
        pagination : null,
        isFetched: false,
    },
    action
) => {
    switch (action.type) {
        case SERVICE.SERVICE_PUBLIC_LIST:
            return {
                ...state,
                loading: true,
                isFetched: false,
            }
        case SERVICE.SERVICE_PUBLIC_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.response.services,
                pagination : action.response.pagination,
                isFetched: true,
            }
        case SERVICE.SERVICE_PUBLIC_LIST_FAILED:
            return {
                ...state,
                loading: false,
                isFetched: false,
            }
        default:
            return state
    }
}

export default ServicePublicListReducer;

import SERVICE from "@store/V1/Service/ActionTypes"

const ServiceCreatReducer = (
    state = {
        loading: false,
        error: null
    },
    action
) => {
    switch (action.type) {
        case SERVICE.SERVICE_CREATE:
            return {
                ...state,
                loading: true,
            }
        case SERVICE.SERVICE_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case SERVICE.SERVICE_CREATE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.response.message
            }
        default:
            return state
    }
}

export default ServiceCreatReducer;

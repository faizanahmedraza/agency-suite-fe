import SERVICE from "@store/V1/Service/ActionTypes"

const ServiceDeleteReducer = (
    state = {
        loading: false,
        isDeleted: false
    },
    action
) => {
    switch (action.type) {
        case SERVICE.SERVICE_DELETE:
            return {
                ...state,
                loading: true,
                isDeleted: false
            }
        case SERVICE.SERVICE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: true,
            }
        case SERVICE.SERVICE_DELETE_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default ServiceDeleteReducer;

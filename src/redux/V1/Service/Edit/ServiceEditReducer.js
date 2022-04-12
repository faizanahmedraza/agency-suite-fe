import SERVICE from "@store/V1/Service/ActionTypes"

const ServiceEditReducer = (
    state = {
        loading: false,
    },
    action
) => {
    switch (action.type) {
        case SERVICE.SERVICE_EDIT:
            return {
                ...state,
                loading: true,
            }
        case SERVICE.SERVICE_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case SERVICE.SERVICE_EDIT_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default ServiceEditReducer;

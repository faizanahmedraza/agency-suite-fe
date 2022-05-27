import SERVICE from "@store/V1/Service/ActionTypes"

const ServiceCatalogReducer = (
    state = {
        loading: false,
        isChanged : false,
        response: false,
    },
    action
) => {
    switch (action.type) {
        case SERVICE.SERVICE_CATALOG:
            return {
                ...state,
                loading: true,
                isChanged : false,
                response: false,
            }
        case SERVICE.SERVICE_CATALOG_SUCCESS:
            return {
                ...state,
                loading: false,
                isChanged : true,
                response: true,
            }
        case SERVICE.SERVICE_CATALOG_FAILED:
            return {
                ...state,
                loading: false,
                isChanged : false,
                response: true,
            }
        default:
            return state
    }
}

export default ServiceCatalogReducer;

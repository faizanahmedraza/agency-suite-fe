import SERVICE from "@store/V1/Service/ActionTypes"

const ServiceCatalogReducer = (
    state = {
        loading: false,
        isChanged : false
    },
    action
) => {
    switch (action.type) {
        case SERVICE.SERVICE_CATALOG:
            return {
                ...state,
                loading: true,
                isChanged : false
            }
        case SERVICE.SERVICE_CATALOG_SUCCESS:
            return {
                ...state,
                loading: false,
                isChanged : true
            }
        case SERVICE.SERVICE_CATALOG_FAILED:
            return {
                ...state,
                loading: false,
                isChanged : false
            }
        default:
            return state
    }
}

export default ServiceCatalogReducer;

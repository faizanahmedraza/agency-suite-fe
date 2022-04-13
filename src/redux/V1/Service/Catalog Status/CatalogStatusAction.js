import SERVICE from "@store/V1/Service/ActionTypes"

const serviceCatalog = (data) => {
    return {
        type: SERVICE.SERVICE_CATALOG,
        request : data
    };
};
const serviceCatalogSuccess = (data) => {
    return {
        type: SERVICE.SERVICE_CATALOG_SUCCESS,
        response: data,
    };
};
const serviceCatalogFailed = () => {
    return {
        type: SERVICE.SERVICE_CATALOG_FAILED,
    };
};

const ServiceCatalogAction = {
    serviceCatalog,
    serviceCatalogSuccess,
    serviceCatalogFailed
}

export default ServiceCatalogAction;
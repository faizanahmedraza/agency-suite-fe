import SERVICE from "@store/V1/CustomerPortal/Service/ActionTypes"

const servicePagination = (data) => {
    return {
        type: SERVICE.CUSTOMER_SERVICE_PAGINATION,
        request: data
    };
};
const servicePaginationSuccess = (data) => {
    return {
        type: SERVICE.CUSTOMER_SERVICE_PAGINATION_SUCCESS,
        response: data,
    };
};
const servicePaginationFailed = () => {
    return {
        type: SERVICE.CUSTOMER_SERVICE_PAGINATION_FAILED,
    };
};

const ServicePaginationAction = {
    servicePagination,
    servicePaginationSuccess,
    servicePaginationFailed
}

export default ServicePaginationAction;
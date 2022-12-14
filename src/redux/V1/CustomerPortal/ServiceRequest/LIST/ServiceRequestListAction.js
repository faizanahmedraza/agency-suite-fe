import SERVICE_REQUEST from "@store/V1/CustomerPortal/ServiceRequest/ActionTypes"

const serviceRequestList = (data) => {
    return {
        type: SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_LIST,
        request: data
    };
};
const serviceRequestListSuccess = (data) => {
    return {
        type: SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_LIST_SUCCESS,
        response: data,
    };
};
const serviceRequestListFailed = () => {
    return {
        type: SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_LIST_FAILED,
    };
};

const ServiceRequestListAction = {
    serviceRequestList,
    serviceRequestListSuccess,
    serviceRequestListFailed
}

export default ServiceRequestListAction;
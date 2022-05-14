import SERVICE_REQUEST from "@store/V1/CustomerPortal/ServiceRequest/ActionTypes"

const serviceRequestCreate = (data) => {
    return {
        type: SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CREATE,
        request: data,
    };
};
const serviceRequestCreateSuccess = (data) => {
    return {
        type: SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CREATE_SUCCESS,
        response: data,
    };
};
const serviceRequestCreateFailed = (data) => {
    return {
        type: SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CREATE_FAILED,
        response: data,
    };
};

const ServiceRequestCreateAction = {
    serviceRequestCreate,
    serviceRequestCreateSuccess,
    serviceRequestCreateFailed
}

export default ServiceRequestCreateAction;
import SERVICE_REQUEST from "@store/V1/ServiceRequest/ActionTypes"

const serviceRequestStatus = (data) => {
    return {
        type: SERVICE_REQUEST.SERVICE_REQUEST_STATUS,
        request : data
    };
};
const serviceRequestStatusSuccess = (data) => {
    return {
        type: SERVICE_REQUEST.SERVICE_REQUEST_STATUS_SUCCESS,
        response: data,
    };
};
const serviceRequestStatusFailed = () => {
    return {
        type: SERVICE_REQUEST.SERVICE_REQUEST_STATUS_FAILED,
    };
};

const ServiceRequestStatusAction = {
    serviceRequestStatus,
    serviceRequestStatusSuccess,
    serviceRequestStatusFailed
}

export default ServiceRequestStatusAction;
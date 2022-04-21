import SERVICE from "@store/V1/Service/ActionTypes"

const serviceStatus = (data) => {
    return {
        type: SERVICE.SERVICE_STATUS,
        request : data
    };
};
const serviceStatusSuccess = (data) => {
    return {
        type: SERVICE.SERVICE_STATUS_SUCCESS,
        response: data,
    };
};
const serviceStatusFailed = () => {
    return {
        type: SERVICE.SERVICE_STATUS_FAILED,
    };
};

const ServiceStatusAction = {
    serviceStatus,
    serviceStatusSuccess,
    serviceStatusFailed
}

export default ServiceStatusAction;
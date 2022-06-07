import SERVICE from "@store/V1/Service/ActionTypes"

const serviceCreate = (data) => {
    return {
        type: SERVICE.SERVICE_CREATE,
        request: data,
    };
};
const serviceCreateSuccess = (data) => {
    return {
        type: SERVICE.SERVICE_CREATE_SUCCESS,
        response: data,
    };
};
const serviceCreateFailed = (data) => {
    return {
        type: SERVICE.SERVICE_CREATE_FAILED,
        response: data,
    };
};

const ServiceCreateAction = {
    serviceCreate,
    serviceCreateSuccess,
    serviceCreateFailed
}

export default ServiceCreateAction;
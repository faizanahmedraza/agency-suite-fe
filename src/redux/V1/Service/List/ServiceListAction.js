import SERVICE from "@store/V1/Service/ActionTypes"

const serviceList = () => {
    return {
        type: SERVICE.SERVICE_LIST,
    };
};
const serviceListSuccess = (data) => {
    return {
        type: SERVICE.SERVICE_LIST_SUCCESS,
        response: data,
    };
};
const serviceListFailed = () => {
    return {
        type: SERVICE.SERVICE_LIST_FAILED,
    };
};

const ServiceCreateAction = {
    serviceList,
    serviceListSuccess,
    serviceListFailed
}

export default ServiceCreateAction;
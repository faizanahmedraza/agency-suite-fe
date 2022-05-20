import SERVICE from "@store/V1/Service/ActionTypes"

const serviceList = (data) => {
    return {
        type: SERVICE.SERVICE_LIST,
        request: data
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

const ServiceListAction = {
    serviceList,
    serviceListSuccess,
    serviceListFailed
}

export default ServiceListAction;
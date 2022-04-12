import SERVICE from "@store/V1/Service/ActionTypes"

const serviceDelete = (data) => {
    return {
        type: SERVICE.SERVICE_DELETE,
        request: data
    };
};
const serviceDeleteSuccess = () => {
    return {
        type: SERVICE.SERVICE_DELETE_SUCCESS
    };
};
const serviceDeleteFailed = () => {
    return {
        type: SERVICE.SERVICE_DELETE_FAILED,
    };
};

const ServiceDeleteAction = {
    serviceDelete,
    serviceDeleteSuccess,
    serviceDeleteFailed
}

export default ServiceDeleteAction;
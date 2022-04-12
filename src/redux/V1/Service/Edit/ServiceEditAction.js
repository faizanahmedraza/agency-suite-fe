import SERVICE from "@store/V1/Service/ActionTypes"

const serviceEdit = (data) => {
    return {
        type: SERVICE.SERVICE_EDIT,
        request: data
    };
};
const serviceEditSuccess = () => {
    return {
        type: SERVICE.SERVICE_EDIT_SUCCESS
    };
};
const serviceEditFailed = () => {
    return {
        type: SERVICE.SERVICE_EDIT_FAILED,
    };
};

const ServiceEditAction = {
    serviceEdit,
    serviceEditSuccess,
    serviceEditFailed
}

export default ServiceEditAction;
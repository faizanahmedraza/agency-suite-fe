import SERVICE from "@store/V1/CustomerPortal/Service/ActionTypes"

const serviceList = (data) => {
    return {
        type: SERVICE.CUSTOMER_SERVICE_LIST,
        request: data,
    };
};
const serviceListSuccess = (data) => {
    return {
        type: SERVICE.CUSTOMER_SERVICE_LIST_SUCCESS,
        response: data,
    };
};
const serviceListFailed = () => {
    return {
        type: SERVICE.CUSTOMER_SERVICE_LIST_FAILED,
    };
};

const ServiceListAction = {
    serviceList,
    serviceListSuccess,
    serviceListFailed
}

export default ServiceListAction;
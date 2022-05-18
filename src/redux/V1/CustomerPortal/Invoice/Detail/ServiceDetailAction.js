import SERVICE from "@store/V1/CustomerPortal/Service/ActionTypes"

const serviceDetail = (id) => {
  return {
    type: SERVICE.CUSTOMER_SERVICE_DETAIL,
    request: id,
  };
};

const serviceDetailSuccess = (data) => {
  return {
    type: SERVICE.CUSTOMER_SERVICE_DETAIL_SUCCESS,
    response: data,
  };
};

const serviceDetailFailed = (data) => {
  return {
    type: SERVICE.CUSTOMER_SERVICE_DETAIL_FAILED,
    response: data,
  };
};

const ServiceDetailAction = {
  serviceDetail,
  serviceDetailSuccess,
  serviceDetailFailed,
};

export default ServiceDetailAction;

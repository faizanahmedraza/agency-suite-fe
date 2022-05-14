import SERVICE_REQUEST from "@store/V1/CustomerPortal/ServiceRequest/ActionTypes"

const serviceRequestDetail = (data) => {
  return {
    type: SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_DETAIL,
    request: data,
  };
};

const serviceRequestDetailSuccess = (data) => {
  return {
    type: SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_DETAIL_SUCCESS,
    response: data,
  };
};

const serviceRequestDetailFailed = (data) => {
  return {
    type: SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_DETAIL_FAILED,
    response: data,
  };
};

const ServiceRequestDetailAction = {
  serviceRequestDetail,
  serviceRequestDetailSuccess,
  serviceRequestDetailFailed,
};

export default ServiceRequestDetailAction;

import SERVICE_REQUEST from "@store/V1/CustomerPortal/ServiceRequest/ActionTypes"

const cancelServiceRequest = (id) => {
  return {
    type: SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CANCEL,
    request: id,
  };
};

const cancelServiceRequestSuccess = (data) => {
  return {
    type: SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CANCEL_SUCCESS,
    response: data,
  };
};

const cancelServiceRequestFailed = (data) => {
  return {
    type: SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CANCEL_FAILED,
    response: data,
  };
};

const CancelAction = {
  cancelServiceRequest,
  cancelServiceRequestSuccess,
  cancelServiceRequestFailed,
};

export default CancelAction;

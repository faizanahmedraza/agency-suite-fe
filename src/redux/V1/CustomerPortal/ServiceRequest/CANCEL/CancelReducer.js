import SERVICE_REQUEST from "@store/V1/CustomerPortal/ServiceRequest/ActionTypes"

const DeleteReducer = (
  state = {
    loading: false,
    success: false,
    error: null,
    isCancelled: false
  },
  action
) => {
  switch (action.type) {
    case SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CANCEL:
      return {
        ...state,
        loading: true,
        isCancelled: false
      };
    case SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CANCEL_SUCCESS:
      return {
        ...state,
        loading: false,
        isCancelled: true
      };
    case SERVICE_REQUEST.CUSTOMER_SERVICE_REQUEST_CANCEL_FAILED:
      return {
         ...state,
          loading: false,
          error: action.response.message,
          isCancelled: false
      };
    default:
      return state;
  }
};

export default DeleteReducer;

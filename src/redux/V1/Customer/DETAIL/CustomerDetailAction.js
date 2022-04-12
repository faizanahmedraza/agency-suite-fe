import CUSTOMER from "@store/V1/Customer/ActionType";

const customerDetail = (id) => {
  return {
    type: CUSTOMER.CUSTOMER_DETAIL,
    request: id,
  };
};

const customerDetailSuccess = (data) => {
  return {
    type: CUSTOMER.CUSTOMER_DETAIL_SUCCESS,
    response: data,
  };
};

const customerDetailFailed = (data) => {
  return {
    type: CUSTOMER.CUSTOMER_DETAIL_FAILED,
    response: data,
  };
};

const CustomerDetailAction = {
  customerDetail,
  customerDetailSuccess,
  customerDetailFailed,
};

export default CustomerDetailAction;

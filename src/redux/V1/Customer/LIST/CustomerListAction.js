import CUSTOMER from "@store/V1/Customer/ActionType";

const customerList = (data) => {
  return {
    type: CUSTOMER.CUSTOMER_LIST,
    request: data,
  };
};
const customerListSuccess = (data) => {
  return {
    type: CUSTOMER.CUSTOMER_LIST_SUCCESS,
    response: data,
  };
};
const customerListFailed = (data) => {
  return {
    type: CUSTOMER.CUSTOMER_LIST_FAILED,
    response: data,
  };
};

const CustomerListAction = {
  customerList,
  customerListSuccess,
  customerListFailed,
};

export default CustomerListAction;

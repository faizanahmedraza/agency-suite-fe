import CUSTOMER from "@store/V1/Customer/ActionType";

const customerDelete = (id) => {
  return {
    type: CUSTOMER.CUSTOMER_DELETE,
    request: id,
  };
};
const customerDeleteSuccess = (data) => {
  return {
    type: CUSTOMER.CUSTOMER_DELETE_SUCCESS,
    response: data,
  };
};
const customerDeleteFailed = (data) => {
  return {
    type: CUSTOMER.CUSTOMER_DELETE_FAILED,
    response: data,
  };
};

const CustomerDeleteAction = {
  customerDelete,
  customerDeleteSuccess,
  customerDeleteFailed,
};

export default CustomerDeleteAction;

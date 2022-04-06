import CUSTOMER from "@store/V1/Customer/ActionType";

const customerFirst = (id) => {
  return {
    type: CUSTOMER.CUSTOMER_FIRST,
    request: id,
  };
};

const customerFirstSuccess = (data) => {
  return {
    type: CUSTOMER.CUSTOMER_FIRST_SUCCESS,
    response: data,
  };
};

const customerFirstFailed = (data) => {
  return {
    type: CUSTOMER.CUSTOMER_FIRST_FAILED,
    response: data,
  };
};

const CustomerFirstAction = {
  customerFirst,
  customerFirstSuccess,
  customerFirstFailed,
};

export default CustomerFirstAction;

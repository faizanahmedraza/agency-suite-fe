import { combineReducers } from "redux";
import InvoiceListReducer from "@store/V1/Invoice/List/InvoiceListReducer";
import InvoiceDeleteReducer from "@store/V1/Invoice/Delete/InvoiceDeleteReducer";

const InvoiceRootReducer = combineReducers({
  list : InvoiceListReducer,
  delete: InvoiceDeleteReducer,
});

export default InvoiceRootReducer;

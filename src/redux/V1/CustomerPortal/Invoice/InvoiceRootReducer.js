import { combineReducers } from "redux";
import InvoiceListReducer from "@store/V1/CustomerPortal/Invoice/List/InvoiceListReducer";
import InvoiceDetailReducer from "@store/V1/CustomerPortal/Invoice/Detail/InvoiceDetailReducer";

const InvoiceRootReducer = combineReducers({
  list : InvoiceListReducer,
  detail: InvoiceDetailReducer,
});

export default InvoiceRootReducer;

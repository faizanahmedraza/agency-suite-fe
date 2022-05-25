import { combineReducers } from "redux";
import InvoiceListReducer from "@store/V1/CustomerPortal/Invoice/List/InvoiceListReducer";
import InvoiceDetailReducer from "@store/V1/CustomerPortal/Invoice/Detail/InvoiceDetailReducer";
import InvoicePaidReducer from "@store/V1/CustomerPortal/Invoice/InvoicePaid/InvoicePaidReducer";

const InvoiceRootReducer = combineReducers({
  list : InvoiceListReducer,
  detail: InvoiceDetailReducer,
  invoice_paid: InvoicePaidReducer
});

export default InvoiceRootReducer;

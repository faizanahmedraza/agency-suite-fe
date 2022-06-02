import { combineReducers } from "redux";
import InvoiceListReducer from "@store/V1/Invoice/List/InvoiceListReducer";
import InvoiceDetailReducer from "@store/V1/Invoice/Detail/InvoiceDetailReducer";
import InvoiceStatusReducer from "@store/V1/Invoice/Status/InvoiceStatusReducer";
import InvoiceDeleteReducer from "@store/V1/Invoice/Delete/InvoiceDeleteReducer";
import InvoicePaidReducer from "@store/V1/Invoice/InvoicePaid/InvoicePaidReducer";

const InvoiceRootReducer = combineReducers({
  list : InvoiceListReducer,
  detail: InvoiceDetailReducer,
  delete: InvoiceDeleteReducer,
  status: InvoiceStatusReducer,
  invoice_paid: InvoicePaidReducer
});

export default InvoiceRootReducer;

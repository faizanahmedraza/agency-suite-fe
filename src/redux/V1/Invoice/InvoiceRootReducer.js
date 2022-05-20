import { combineReducers } from "redux";
import InvoiceListReducer from "@store/V1/Invoice/List/InvoiceListReducer";
import InvoiceStatusReducer from "@store/V1/Invoice/Status/InvoiceStatusReducer";
import InvoiceDeleteReducer from "@store/V1/Invoice/Delete/InvoiceDeleteReducer";

const InvoiceRootReducer = combineReducers({
  list : InvoiceListReducer,
  delete: InvoiceDeleteReducer,
  status: InvoiceStatusReducer,
});

export default InvoiceRootReducer;

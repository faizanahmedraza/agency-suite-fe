import INVOICE from "@store/V1/CustomerPortal/Invoice/ActionTypes"

const InvoiceListReducer = (
    state = {
        loading: false,
        invoices: [],
        pagination : null
    },
    action
) => {
    switch (action.type) {
        case INVOICE.CUSTOMER_INVOICE_LIST:
            return {
                ...state,
                loading: true,
            }
        case INVOICE.CUSTOMER_INVOICE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                invoices: action.response.customer_invoices,
                pagination : action.response.pagination
            }
        case INVOICE.CUSTOMER_INVOICE_LIST_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default InvoiceListReducer;

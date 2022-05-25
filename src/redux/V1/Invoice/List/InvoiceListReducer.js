import INVOICE from "@store/V1/Invoice/ActionTypes"

const InvoiceListReducer = (
    state = {
        loading: false,
        invoices: [],
        pagination : null,
        isFetched: false,
    },
    action
) => {
    switch (action.type) {
        case INVOICE.INVOICE_LIST:
            return {
                ...state,
                loading: true,
                isFetched: false,
            }
        case INVOICE.INVOICE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                invoices: action.response.customer_invoices,
                pagination : action.response.pagination,
                isFetched: true,
            }
        case INVOICE.INVOICE_LIST_FAILED:
            return {
                ...state,
                loading: false,
                isFetched: false,
            }
        default:
            return state
    }
}

export default InvoiceListReducer;

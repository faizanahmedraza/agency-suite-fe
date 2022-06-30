import INVOICE from "@store/V1/Invoice/ActionTypes"

const InvoiceCreateReducer = (
    state = {
        loading: false,
        error: null
    },
    action
) => {
    switch (action.type) {
        case INVOICE.INVOICE_CREATE:
            return {
                ...state,
                loading: true,
            }
        case INVOICE.INVOICE_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case INVOICE.INVOICE_CREATE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.response.message
            }
        default:
            return state
    }
}

export default InvoiceCreateReducer;

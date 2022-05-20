import INVOICE from "@store/V1/Invoice/ActionTypes"

const InvoiceStatusReducer = (
    state = {
        loading: false,
        isChanged : false
    },
    action
) => {
    switch (action.type) {
        case INVOICE.INVOICE_STATUS:
            return {
                ...state,
                loading: true,
                isChanged : false
            }
        case INVOICE.INVOICE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isChanged : true
            }
        case INVOICE.INVOICE_STATUS_FAILED:
            return {
                ...state,
                loading: false,
                isChanged : false
            }
        default:
            return state
    }
}

export default InvoiceStatusReducer;

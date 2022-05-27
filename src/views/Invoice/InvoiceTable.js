import React, { useState, useEffect } from 'react'
import {
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input
} from "reactstrap";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "@store/store"
import ReactPaginate from 'react-paginate';
import { formatDate } from '@utils'
import GeneralHelper from "@src/Helpers/GeneralHelper";
import { Trash, Eye } from "react-feather";
import InvoiceDeleteAction from "@store/V1/Invoice/Delete/InvoiceDeleteAction"
import InvoiceStatusAction from "@store/V1/Invoice/Status/InvoiceStatusAction"
import InvoiceListAction from "@store/V1/Invoice/List/InvoiceListAction"

const InvoiceTable = (props) => {
    const _data = props.data;
    const [currentItems, setCurrentItems] = useState([]);
    const [offset, setOffset] = useState(props?.pagination?.current_page === undefined ? 0 : props?.pagination?.current_page - 1);
    const [pageCount, setPageCount] = useState(props?.pagination?.total_pages === undefined ? 0 : props?.pagination?.total_pages);
    const [invoiceId, setInvoiceId] = useState(null)
    const [centeredModal, setCenteredModal] = useState(false)
    const dispatch = useDispatch()

    const getInvoiceInfo = (id) => {
        setInvoiceId(id)
        setCenteredModal(!centeredModal)
    }

    const deleteService = () => {
        dispatch(InvoiceDeleteAction.invoiceDelete(invoiceId))
        setCenteredModal(!centeredModal)
    }

    const {
        list: {
            loading,
            invoices,
            pagination,
            isFetched
        }
    } = useSelector(state => state.invoices);

    useEffect(() => {
        if (!isFetched) return setCurrentItems(_data);
        setCurrentItems(invoices);
        setPageCount(pagination.total_pages)
        setOffset(pagination.current_page - 1)
    }, [offset]);

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        dispatch(InvoiceListAction.invoiceList(
            GeneralHelper.Serialize({
                page: selectedPage,
            })
        ))
        setOffset(event.selected)
    };

    const handleShowInvoiceStatus = (e, id) => {
        dispatch(InvoiceStatusAction.invoiceStatus(id))
    }

    return (
        <div>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>INVOICE NUMBER</th>
                        <th>CUSTOMER</th>
                        <th>SERVICE</th>
                        <th>AMOUNT</th>
                        <th>IS PAID</th>
                        <th>CREATED AT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.map((invoice) => {
                        return (
                            <tr key={invoice.id}>
                                <td>{invoice?.invoice_number}</td>
                                <td>{invoice?.customer?.first_name + ' ' + invoice?.customer?.last_name}</td>
                                <td>
                                    <span className='align-middle fw-bold'>{GeneralHelper.PascalCase(invoice?.customer_service_request?.service?.name)}</span>
                                </td>
                                <td>{invoice?.amount}</td>
                                <td className='text-center'>
                                    <div className='form-switch form-check-primary'>
                                        <Input type='switch' className='' onChange={(e) => handleShowInvoiceStatus(e, invoice.id)} defaultChecked={invoice.is_paid} id='icon-secondnary' name='icon-status' />
                                    </div>
                                </td>
                                <td>{formatDate(invoice?.created_at)}</td>
                                <td className='text-center'>
                                    <Link to={`/invoice/detail/${invoice.id}`}>
                                        <Eye className='me-50' size={20} />
                                    </Link>
                                    <Trash className='me-50' size={20} />
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
            {
                props.pagination ?
                    <div className='d-flex justify-content-end pt-1'>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< Previous"
                            renderOnZeroPageCount={null}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            activeClassName={'active'}
                            forcePage={offset}
                        />
                    </div>
                    : null
            }
            {/* Delete modal */}
            <div className='vertically-centered-modal'>
                <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
                    <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Confirmation</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this invoice?
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={() => setCenteredModal(!centeredModal)}>
                            Cancel
                        </Button>
                        <Button color='danger' onClick={deleteService}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}

export default InvoiceTable
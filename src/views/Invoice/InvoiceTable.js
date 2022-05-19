import React, { useState, useEffect } from 'react'
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input
} from "reactstrap";
import { useDispatch } from "@store/store"
import ReactPaginate from 'react-paginate';
import { formatDate } from '@utils'
import GeneralHelper from "@src/Helpers/GeneralHelper";
import { MoreVertical, Trash } from "react-feather";
import InvoiceDeleteAction from "@store/V1/Invoice/Delete/InvoiceDeleteAction"
import InvoiceStatusAction from "@store/V1/Invoice/Status/InvoiceStatusAction"

const InvoiceTable = (props) => {
    const _data = props.data;
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(props?.pagination?.per_page);
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

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(_data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(_data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % _data.length;
        setItemOffset(newOffset);
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
                                <td>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                            <MoreVertical size={15} />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <div className='dropdown-item' onClick={() => getInvoiceInfo(invoice.id)} >
                                                <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                            </div>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
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
import React, { useState, useEffect } from 'react'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownToggle, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap'
import { formatDate } from '@utils'
import { MoreVertical, Edit, Trash, Check, X } from 'react-feather'
import { Link } from "react-router-dom"
import ServiceDeleteActions from '@store/V1/Service/Delete/ServiceDeleteAction'
import { useDispatch } from "@store/store"
import ReactPaginate from 'react-paginate';

const ServiceTable = ({ services, pagination }) => {

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const [serviceId, setServiceId] = useState(null)
    const [centeredModal, setCenteredModal] = useState(false)
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()

    const getServiceInfo = (id) => {
        setServiceId(id)
        setCenteredModal(!centeredModal)
    }

    const deleteService = () => {
        dispatch(ServiceDeleteActions.serviceDelete(serviceId))
        setCenteredModal(!centeredModal)
    }

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        // console.log(`Loading services from ${itemOffset} to ${endOffset}`);
        setCurrentItems(services.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(services.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % services.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };

    const CustomLabel = ({ htmlFor }) => {
        return (
            <Label className='form-check-label' htmlFor={htmlFor}>
                <span className='switch-icon-left'>
                    <Check size={14} />
                </span>
                <span className='switch-icon-right'>
                    <X size={14} />
                </span>
            </Label>
        )
    }

    return (
        <div>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>Show in catalog ?</th>
                        <th>Service Type</th>
                        <th>CREATED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.map((service) => {
                        return (
                            <tr key={service.id}>
                                <td>
                                    <Link to={`/services/edit/${service.id}`}>
                                        <span className='align-middle fw-bold'>{service.name}</span>
                                    </Link>
                                </td>
                                <td>{service.subscription_type !== "recurring" ? `$${service.price_types.price}` : "-"}</td>
                                <td>
                                    <div className='form-switch form-check-primary'>
                                        <Input type='switch' className='w-50' id='icon-primary' name='icon-primary' />
                                        <CustomLabel htmlFor='icon-primary' />
                                    </div>
                                </td>
                                <td>{service.subscription_type}</td>
                                <td>
                                    {formatDate(service.created_at)}
                                </td>
                                <td>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                            <MoreVertical size={15} />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <Link className='dropdown-item' to={`/services/edit/${service.id}`}>
                                                <Edit className='me-50' size={10} /> <span className='align-middle'>Edit</span>
                                            </Link>
                                            <div className='dropdown-item' onClick={() => getServiceInfo(service.id)} >
                                                <Trash className='me-50' size={10} /> <span className='align-middle'>Delete</span>
                                            </div>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div className='d-flex justify-content-end pt-1'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
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
            {/* Delete modal */}
            <div className='vertically-centered-modal'>
                <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
                    <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Confirmation</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this service ?
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

export default ServiceTable
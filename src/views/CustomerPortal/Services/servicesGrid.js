import React, { useState, useEffect } from 'react'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownToggle, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap'
import { formatDate } from '@utils'
import { MoreVertical, Edit, Trash, Check, X } from 'react-feather'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "@store/store"     
import ReactPaginate from 'react-paginate';
import ServicePaginationAction from '@store/V1/CustomerPortal/Service/Pagination/ServicePaginationAction'
import ServiceActions from '@store/V1/CustomerPortal/Service/List/ServiceListAction'

const ServicesGrid = ({ services, pagination }) => {

    const [currentItems, setCurrentItems] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [pageCount, setPageCount] = useState(0);
    // const [current_id, setCurrent_id] = useState(null);

    const {
        pagination: {
            services: newService,
            loading,
            isFetched
        }
    } = useSelector(state => state.service)

    const [serviceId, setServiceId] = useState(null)
    const [centeredModal, setCenteredModal] = useState(false)
    const dispatch = useDispatch()

    const getServiceInfo = (id) => {
        setServiceId(id)
        setCenteredModal(!centeredModal)
    }

    // useEffect(() => {
    //     if (newService.length) return setCurrentItems(newService);
    // }, [newService]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(services.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(services.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % services.length;
        setItemOffset(newOffset);
        // const selected = event.selected + 1
        // dispatch(ServicePaginationAction.servicePagination(selected))
    };

    return (
        <div>
            {
                   "Services"
            }
            {
                pagination ?
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

export default ServicesGrid
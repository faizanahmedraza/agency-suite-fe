import React, { useState, useEffect } from 'react'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownToggle, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap'
import { formatDate } from '@utils'
import { MoreVertical, Edit, Trash, Check, X } from 'react-feather'
import { Link } from "react-router-dom"
import ServiceDeleteActions from '@store/V1/Service/Delete/ServiceDeleteAction'
import { useDispatch, useSelector } from "@store/store"     
import ReactPaginate from 'react-paginate';
import ServicePaginationAction from '@store/V1/Service/Pagination/ServicePaginationAction'
import ServiceActions from '@store/V1/Service/List/ServiceListAction'
import ServiceCatalogActions from '@store/V1/Service/Catalog Status/CatalogStatusAction'
import ServiceStatusAction from '@store/V1/Service/ServiceStatus/ServiceStatusAction'


const ServiceTable = ({ services, pagination }) => {

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

    const deleteService = () => {
        dispatch(ServiceDeleteActions.serviceDelete(serviceId))
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

    const handleShowCatalogStatus = (e, id) => {
        dispatch(ServiceCatalogActions.serviceCatalog(id))
    }

    const handleShowServiceStatus = (e, id) => {
        dispatch(ServiceStatusAction.serviceStatus(id))
    }

    return (
        <div>
            {
                loading ?
                    <div className='text-center'>
                        <strong>Loading...</strong>
                    </div>
                    :
                    (
                        <Table bordered responsive>
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th className='text-center'>Show in catalog ?</th>
                                    <th>Service Type</th>
                                    <th className='text-center'>Status </th>
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
                                            <td className='text-center'>
                                                <div className='form-switch form-check-primary'>
                                                    <Input type='switch'  onChange={(e) => handleShowCatalogStatus(e, service.id)} defaultChecked={service.catalog_status === "active"} id='icon-primary' name='icon-primary' />
                                                </div>
                                            </td>
                                            <td>{service.subscription_type}</td>
                                            <td className='text-center'>
                                                <div className='form-switch form-check-primary'>
                                                    <Input type='switch' className='' onChange={(e) => handleShowServiceStatus(e, service.id)} defaultChecked={service.status === "active"} id='icon-secondnary' name='icon-status' />
                                                </div>
                                            </td>
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
                    )
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

export default ServiceTable
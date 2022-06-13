import React, { useState, useEffect } from 'react'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownToggle, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap'
import { formatDate } from '@utils'
import { MoreVertical, Edit, Trash, Check, X } from 'react-feather'
import { Link , useSearchParams} from "react-router-dom"
import ServiceDeleteActions from '@store/V1/Service/Delete/ServiceDeleteAction'
import { useDispatch, useSelector } from "@store/store"
import ReactPaginate from 'react-paginate';
import ServiceActions from '@store/V1/Service/List/ServiceListAction'
import ServiceCatalogActions from '@store/V1/Service/Catalog Status/CatalogStatusAction'
import ServiceStatusAction from '@store/V1/Service/ServiceStatus/ServiceStatusAction'
import GeneralHelper from "@src/Helpers/GeneralHelper";

const ServiceTable = ({ services, pagination, tabIndex }) => {

    const [currentItems, setCurrentItems] = useState(services.length > 0 ? services : []);
    const [offset, setOffset] = useState(pagination?.current_page === undefined ? 0 : pagination?.current_page - 1);
    const [pageCount, setPageCount] = useState(pagination?.total_pages === undefined ? 0 : pagination?.total_pages);
    const [searchParam, setSearchParam] = useSearchParams()

    const {
        list: { services: newServices, pagination: newPagination, isFetched, loading },
    } = useSelector(state => state.service)

    const [serviceId, setServiceId] = useState(null)
    const [centeredModal, setCenteredModal] = useState(false)
    const [centeredStatusModal, setCenteredStatusModal] = useState(false)
    const [serviceStatus, setServiceStatus] = useState(null)
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
        if (!isFetched) return setCurrentItems(services);
        setCurrentItems(newServices);
        setPageCount(newPagination.total_pages)
        setOffset(newPagination.current_page - 1)
    }, [offset]);

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        if (tabIndex == 1) {
            setSearchParam({ index: selectedPage, tabindex: tabIndex })
            dispatch(ServiceActions.serviceList(GeneralHelper.Serialize({
                page: selectedPage
            })));
        } else if (tabIndex == 2) {
            setSearchParam({ index: selectedPage, tabindex: tabIndex })
            dispatch(ServiceActions.serviceList(GeneralHelper.Serialize({
                page: selectedPage,
                catalog_status: "active"
            })));
        } else if (tabIndex == 3) {
            setSearchParam({ index: selectedPage, tabindex: tabIndex })
            dispatch(ServiceActions.serviceList(GeneralHelper.Serialize({
                page: selectedPage,
                service_type: "one-off"
            })));
        } else if (tabIndex == 4) {
            setSearchParam({ index: selectedPage, tabindex: tabIndex })
            dispatch(ServiceActions.serviceList(GeneralHelper.Serialize({
                page: selectedPage,
                service_type: "recurring"
            })));
        }
        setOffset(event.selected)
    };

    const handleShowCatalogStatus = (e, id) => {
        dispatch(ServiceCatalogActions.serviceCatalog(id))
    }

    const changeServiceStatus = () => {
        dispatch(ServiceStatusAction.serviceStatus({
            id: serviceId,
            status: serviceStatus
        }))
        setCenteredStatusModal(!centeredStatusModal);
    }

    const handleServiceStatus = (e, id) => {
        setCenteredStatusModal(!centeredStatusModal);
        setServiceId(id);
        setServiceStatus(e.target.value);
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
                                    <th>Status</th>
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
                                            <td>{service.subscription_type !== "recurring" ? `$${Number.parseFloat(service.price_types.price).toFixed(2)}` : "-"}</td>
                                            <td className='text-center'>
                                                <div className='form-switch form-check-primary'>
                                                    <Input type='switch' onChange={e => handleShowCatalogStatus(e, service.id)} defaultChecked={service.catalog_status === "active"} id='icon-primary' name='icon-primary' />
                                                </div>
                                            </td>
                                            <td>{service.subscription_type}</td>
                                            <td className='text-left' width="165px">
                                                <Input type='select' name='select' id='select-basic' value={service.status} onChange={(e) => handleServiceStatus(e, service.id)}>
                                                    <option value="pending">Pending</option>
                                                    <option value="active">Active</option>
                                                    <option value="blocked">Blocked</option>
                                                </Input>
                                            </td>
                                            <td>
                                                {formatDate(service.created_at)}
                                            </td>
                                            <td>
                                                <Link to={`/services/edit/${service.id}`}>
                                                    <Edit className='me-50' size={20} />
                                                </Link>
                                                <Trash role="button" onClick={() => getServiceInfo(service.id)} size={20} />
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
                        Are you sure you want to delete this service ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color='secondary' outline onClick={() => setCenteredModal(!centeredModal)}>
                            Cancel
                        </Button>
                        <Button color='primary' onClick={deleteService}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
            <div className="vertically-centered-modal">
                <Modal
                    isOpen={centeredStatusModal}
                    toggle={() => setCenteredStatusModal(!centeredStatusModal)}
                    className="modal-dialog-centered"
                >
                    <ModalHeader toggle={() => setCenteredStatusModal(!centeredStatusModal)}>
                        Confirmation
                    </ModalHeader>
                    <ModalBody>Are you sure you want to change the status of this service ?</ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => setCenteredStatusModal(!centeredStatusModal)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="danger"
                            onClick={() => changeServiceStatus()}
                        >
                            Yes
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}

export default ServiceTable
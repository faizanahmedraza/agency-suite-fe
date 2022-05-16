import React, { useState, useEffect } from 'react'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownToggle, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap'
import { Save } from 'react-feather'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "@store/store"
import ReactPaginate from 'react-paginate';
import GeneralHelper from "@src/Helpers/GeneralHelper";

const ServiceTable = ({ services, pagination }) => {

    const [currentItems, setCurrentItems] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [pageCount, setPageCount] = useState(0);

    const {
        pagination: {
            loading,
        }
    } = useSelector(state => state.customer_services)

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(services.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(services.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % services.length;
        setItemOffset(newOffset);
    };

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
                                    <th>SERVICE TYPE</th>
                                    <th>PRICE</th>
                                    <th>PURCHASE LIMIT</th>
                                    <th>MAXIMUM CONCURRENT REQUESTS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentItems && currentItems.map((service) => {
                                    return (
                                        <tr key={service.id}>
                                            <td>
                                                <Link to={`/customer-service-requests/create/${service.id}`}>
                                                    <span className='align-middle fw-bold'>{GeneralHelper.PascalCase(service.name)}</span>
                                                </Link>
                                            </td>
                                            <td>{GeneralHelper.PascalCase(service.subscription_type)}</td>
                                            <td>{service.subscription_type !== "recurring" ? `$${service?.price_types?.price}` : "-"}</td>
                                            <td>{(service.subscription_type !== "recurring" && service?.price_types?.purchase_limit !== null) ? `${service?.price_types?.purchase_limit}` : "-"}</td>
                                            <td>{service.subscription_type === "recurring" ? `${service?.price_types?.max_concurrent_requests}` : "-"}</td>
                                            <td>
                                                <Link to={`/customer-service-requests/create/${service.id}`}>
                                                    <Save className='me-50' size={10} /> <span className='align-middle'>Subscribe</span>
                                                </Link>
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
        </div>
    )
}

export default ServiceTable
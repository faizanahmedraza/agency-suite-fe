import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap'
import { Save } from 'react-feather'
import { Link } from "react-router-dom"
import { useSelector } from "@store/store"
import ReactPaginate from 'react-paginate';
import GeneralHelper from "@src/Helpers/GeneralHelper";

const ServiceTable = ({ services, pagination }) => {

    const [currentItems, setCurrentItems] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(pagination?.per_page);
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
                                    <th>AGENCY</th>
                                    <th>SERVICE REQUEST</th>
                                    <th>AMOUNT</th>
                                    <th>IS PAID</th>
                                    <th>CREATED AT</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems && currentItems.map((service) => {
                                    return (
                                        <tr>
                                            <td>
                                                <span className='align-middle fw-bold'>FAIZAN AHMED RAZA</span>
                                            </td>
                                            <td>$4263</td>
                                            <td>
                                                12 Jun 2019
                                            </td>
                                            <td>$762</td>
                                            <td>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                                        <MoreVertical size={15} />
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <Link className='dropdown-item' to='/invoice/edit/1'>
                                                            <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                                        </Link>
                                                        <div className='dropdown-item' onClick={() => setFormModal(!formModal)}>
                                                            <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
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
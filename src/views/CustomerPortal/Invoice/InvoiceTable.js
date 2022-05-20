import React, { useState, useEffect } from 'react'
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    Table,
  } from "reactstrap";
import { Link } from "react-router-dom"
import ReactPaginate from 'react-paginate';
import { formatDate } from '@utils'
import GeneralHelper from "@src/Helpers/GeneralHelper";
import { MoreVertical, Edit, Trash } from "react-feather";

const InvoiceTable = (props) => {
    const _data = props.data;
    const [formModal, setFormModal] = useState(false);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(props?.pagination?.per_page);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(_data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(_data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % _data.length;
        setItemOffset(newOffset);
    };

    return (
        <div>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>INVOICE NUMBER</th>
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
                                <td>
                                    <span className='align-middle fw-bold'>{GeneralHelper.PascalCase(invoice?.customer_service_request?.service?.name)}</span>
                                </td>
                                <td>{invoice?.amount}</td>
                                <td>{invoice?.is_paid ? 'Yes' : 'No'}</td>
                                <td>{formatDate(invoice?.created_at)}</td>
                                <td>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                            <MoreVertical size={15} />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <Link className='dropdown-item' to={`/customer-invoices/detail/${invoice.id}`}>
                                                <Edit className='me-50' size={15} /> <span className='align-middle'>Detail</span>
                                            </Link>
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
        </div>
    )
}

export default InvoiceTable
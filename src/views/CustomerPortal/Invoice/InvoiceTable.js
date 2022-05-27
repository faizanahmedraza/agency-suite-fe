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
import { useDispatch, useSelector } from "@store/store"
import InvoiceListAction from "@store/V1/CustomerPortal/Invoice/List/InvoiceListAction"
import GeneralHelper from "@src/Helpers/GeneralHelper";
import { Eye } from "react-feather";

const InvoiceTable = (props) => {
    const _data = props.data;
    const dispatch = useDispatch();
    const [currentItems, setCurrentItems] = useState([]);
    const [offset, setOffset] = useState(props?.pagination?.current_page === undefined ? 0 : props?.pagination?.current_page - 1);
    const [pageCount, setPageCount] = useState(props?.pagination?.total_pages === undefined ? 0 : props?.pagination?.total_pages);

    const {
        list: {
            loading,
            invoices,
            pagination,
            isFetched
        }
    } = useSelector(state => state.customer_invoices);

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

    return (
        <div>
            {
                currentItems.length ?

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
                                        <td className='text-center'>
                                            <Link to={`/customer-invoices/detail/${invoice.id}`}>
                                                <Eye className='me-50' size={20} />
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </Table>
                    :
                    <div className="text-center">
                        <strong >No Items Found !</strong>
                    </div>
            }
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
        </div>
    )
}

export default InvoiceTable
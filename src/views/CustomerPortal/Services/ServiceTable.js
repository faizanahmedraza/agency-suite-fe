import React, { useState, useEffect } from 'react'
import { Table, Tooltip } from 'reactstrap'
import { Save } from 'react-feather'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "@store/store"
import ReactPaginate from 'react-paginate';
import GeneralHelper from "@src/Helpers/GeneralHelper";
import ServiceActions from '@store/V1/CustomerPortal/Service/List/ServiceListAction'

const ServiceTable = (props) => {

    const dispatch = useDispatch();
    const [currentItems, setCurrentItems] = useState([]);
    const [offset, setOffset] = useState(props?.pagination?.current_page === undefined ? 0 : props?.pagination?.current_page - 1);
    const [pageCount, setPageCount] = useState(props?.pagination?.total_pages === undefined ? 0 : props?.pagination?.total_pages);
    const [tooltipOpen, setTooltipOpen] = useState(false)

    const {
        list: {
            loading,
            services,
            pagination,
            isFetched
        },
    } = useSelector(state => state.customer_services)

    useEffect(() => {
        if (!isFetched) return setCurrentItems(props.services);
        setCurrentItems(services);
        setPageCount(pagination.total_pages)
        setOffset(pagination.current_page - 1)
    }, [offset]);

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        if (props?.tabIndex == 1) {
            dispatch(ServiceActions.serviceList(
                GeneralHelper.Serialize({
                    page: selectedPage,
                })
            ));
        } else if (props?.tabIndex == 2) {
            dispatch(ServiceActions.serviceList(GeneralHelper.Serialize({
                page: selectedPage,
                service_type: "one-off"
            })));
        } else if (props?.tabIndex == 3) {
            dispatch(ServiceActions.serviceList(GeneralHelper.Serialize({
                page: selectedPage,
                service_type: "recurring"
            })));
        }
        setOffset(event.selected)
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
                                            <td>{service.subscription_type !== "recurring" ? `$${Number.parseFloat(service?.price_types?.price).toFixed(2)}` : "-"}</td>
                                            <td>{(service.subscription_type !== "recurring" && service?.price_types?.purchase_limit !== null) ? `${service?.price_types?.purchase_limit}` : "-"}</td>
                                            <td>{service.subscription_type === "recurring" ? `${service?.price_types?.max_concurrent_requests}` : "-"}</td>
                                            <td>
                                                <Link className='primary'
                                                    to={`/customer-service-requests/create/${service.id}`}
                                                    id="subscribeLink"
                                                >
                                                    <Save className="me-50" size={20} />
                                                </Link>
                                                <Tooltip
                                                    placement='top'
                                                    isOpen={tooltipOpen}
                                                    target='subscribeLink'
                                                    toggle={() => setTooltipOpen(!tooltipOpen)}
                                                >
                                                    Subscribe
                                                </Tooltip>
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
        </div>
    )
}

export default ServiceTable
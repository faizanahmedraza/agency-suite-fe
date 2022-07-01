import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "@store/store";
import { formatDate } from '@utils'
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import ReactPaginate from "react-paginate";
import { Eye } from "react-feather";
import ServiceRequestListAction from "@store/V1/CustomerPortal/ServiceRequest/LIST/ServiceRequestListAction";
import GeneralHelper from "@src/Helpers/GeneralHelper";

const ServiceRequestList = ({ service_requests, pagination, tabIndex}) => {
  const dispatch = useDispatch();
  const [currentItems, setCurrentItems] = useState(service_requests.length > 0 ? service_requests : []);
  const [offset, setOffset] = useState(pagination?.current_page === undefined ? 0 : pagination?.current_page - 1);
  const [pageCount, setPageCount] = useState(pagination?.total_pages === undefined ? 0 : pagination?.total_pages);

  const {
    list: {
      service_requests: newServiceRequests,
      pagination: newPagination,
      isFetched
    }
  } = useSelector(state => state.customer_service_requests);

  useEffect(() => {
    if (!isFetched) return setCurrentItems(service_requests);
    setCurrentItems(newServiceRequests);
    setPageCount(newPagination.total_pages)
    setOffset(newPagination.current_page - 1)
  }, [offset]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    if (tabIndex == 1) {
      setSearchParam({ index: selectedPage, tabindex: tabIndex })
      dispatch(ServiceRequestListAction.serviceRequestList(
        GeneralHelper.Serialize({
          page: selectedPage,
        })
      ));
    } else if (tabIndex == 2) {
      setSearchParam({ index: selectedPage, tabindex: tabIndex })
      dispatch(ServiceRequestListAction.serviceRequestList(GeneralHelper.Serialize({
        page: selectedPage,
        status: "active"
      })));
    }
    setOffset(event.selected)
  };

  return (
    <React.Fragment>
      {
        currentItems.length ?
          <>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>SERVICE NAME</th>
                  <th>IS RECURRING</th>
                  <th>STATUS</th>
                  <th>REQUESTED DATE</th>
                  <th>RENEWAL DATE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((request) => {
                    return (
                      <tr key={request.id}>
                        <td>
                          <Link to={`/customer-service-requests/detail/${request.id}`}>
                            <span className="align-middle fw-bold">
                              {request?.service_name}
                            </span>
                          </Link>
                        </td>
                        <td>{request.is_recurring ? 'Yes' : 'No'}</td>
                        <td className='text-left'>
                          <span className="align-middle fw-bold">
                            {request.status}
                          </span>
                        </td>
                        <td>{formatDate(request.created_at)}</td>
                        <td>{request.next_recurring_date ? formatDate(request.next_recurring_date) : ""}</td>
                        <td>
                          <Link
                            to={`/customer-service-requests/detail/${request.id}`}
                          >
                            <Eye className="me-50" size={20} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end pt-1">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
                forcePage={offset}
              />
            </div>
          </>
          :
          <div className="text-center">
            <strong >No Items Found !</strong>
          </div>
      }
    </React.Fragment>
  );
};

export default ServiceRequestList;

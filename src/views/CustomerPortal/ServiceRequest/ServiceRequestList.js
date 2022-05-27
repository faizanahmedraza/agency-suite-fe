import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "@store/store";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import ReactPaginate from "react-paginate";
import { Edit } from "react-feather";

const ServiceRequestList = (props) => {
  const _data = props.data;
  const dispatch = useDispatch();
  const [currentItems, setCurrentItems] = useState([]);
  const [offset, setOffset] = useState(props?.pagination?.current_page === undefined ? 0 : props?.pagination?.current_page - 1);
  const [pageCount, setPageCount] = useState(props?.pagination?.total_pages === undefined ? 0 : props?.pagination?.total_pages);

  const {
    list: {
      service_requests,
      pagination,
      isFetched
    }
  } = useSelector(state => state.customer_service_requests);

  useEffect(() => {
    if (!isFetched) return setCurrentItems(_data);
    setCurrentItems(service_requests);
    setPageCount(pagination.total_pages)
    setOffset(pagination.current_page - 1)
  }, [offset]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    if (props?.tabIndex == 1) {
      dispatch(ServiceRequestListAction.serviceRequestList(
        GeneralHelper.Serialize({
          page: selectedPage,
        })
      ));
    } else if (props?.tabIndex == 2) {
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

          <Table bordered responsive>
            <thead>
              <tr>
                <th>SERVICE NAME</th>
                <th>STATUS</th>
                <th>IS RECURRING</th>
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
                      <td className='text-left'>
                        <span className="align-middle fw-bold">
                          {request.status}
                        </span>
                      </td>
                      <td>{request.status ? 'Yes' : 'No'}</td>
                      <td>
                        <Link
                          to={`/customer-service-requests/detail/${request.id}`}
                        >
                          <Edit className="me-50" size={20} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          :
          <div className="text-center">
            <strong >No Items Found !</strong>
          </div>
      }
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
    </React.Fragment>
  );
};

export default ServiceRequestList;

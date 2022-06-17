import React, { useState, useEffect } from "react";
import { formatDate } from '@utils'
import { useDispatch, useSelector } from "@store/store";
import { Link, useSearchParams } from "react-router-dom";
import {
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
} from "reactstrap";
import ReactPaginate from "react-paginate";
import { Eye } from "react-feather";
import ServiceRequestStatusAction from "@store/V1/ServiceRequest/STATUS/ServiceRequestStatusAction";
import ServiceRequestListAction from "@store/V1/ServiceRequest/LIST/ServiceRequestListAction";
import GeneralHelper from "@src/Helpers/GeneralHelper";

const ServiceRequestList = ({ service_requests, pagination, tabIndex}) => {
  const dispatch = useDispatch();
  const [centeredModal, setCenteredModal] = useState(false)
  const [serviceRequestId, setServiceRequestId] = useState()
  const [serviceRequestStatus, setServiceRequestStatus] = useState();
  const [currentItems, setCurrentItems] = useState(service_requests.length > 0 ? service_requests : []);
  const [offset, setOffset] = useState(pagination?.current_page === undefined ? 0 : pagination?.current_page - 1);
  const [pageCount, setPageCount] = useState(pagination?.total_pages === undefined ? 0 : pagination?.total_pages);
  const [searchParam, setSearchParam] = useSearchParams()

  const {
    list: {
      service_requests: newServiceRequests,
      pagination: newPagination,
      isFetched
    }
  } = useSelector((state) => state.service_requests);

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
      dispatch(ServiceRequestListAction.serviceRequestList(GeneralHelper.Serialize({
        page: selectedPage,
      })));
    } else if (tabIndex == 2) {
      setSearchParam({ index: selectedPage, tabindex: tabIndex })
      dispatch(ServiceRequestListAction.serviceRequestList(GeneralHelper.Serialize({
        page: selectedPage,
        status: "active"
      })));
    }
    setOffset(event.selected)
  };

  const changeRequestServiceStatus = () => {
    dispatch(ServiceRequestStatusAction.serviceRequestStatus({
      id: serviceRequestId,
      status: serviceRequestStatus
    }));
    setCenteredModal(!centeredModal);
  }

  const handleServiceRequestStatus = (e, id) => {
    setCenteredModal(!centeredModal);
    setServiceRequestId(id);
    setServiceRequestStatus(e.target.value);
  }

  return (
    <React.Fragment>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>CUSTOMER NAME</th>
            <th>SERVICE NAME</th>
            <th>STATUS</th>
            <th>CREATED AT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((request) => {
              return (
                <tr key={request.id}>
                  <td>
                    <Link to={`/customers/edit/${request?.customer?.id}`}>
                      <span className="align-middle fw-bold">
                        {request?.customer?.first_name + " " + request?.customer?.last_name}
                      </span>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/services/edit/${request?.service?.id}`}>
                      <span className="align-middle fw-bold">
                        {request?.service?.name}
                      </span>
                    </Link>
                  </td>
                  <td className='text-left'>
                    <Input type='select' name='select' id='select-basic' value={request.status} onChange={(e) => handleServiceRequestStatus(e, request.id)}>
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="hold">Hold</option>
                      <option value="completed">Completed</option>
                    </Input>
                  </td>
                  <td>{formatDate(request.created_at)}</td>
                  <td className="text-center">
                    <Link
                      to={`/service-requests/detail/${request.id}`}
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
      <div className="vertically-centered-modal">
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            Confirmation
          </ModalHeader>
          <ModalBody>Are you sure you want to change the status of this service request ?</ModalBody>
          <ModalFooter>
            <Button
              color='secondary'
              outline
              onClick={() => setCenteredModal(!centeredModal)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => changeRequestServiceStatus()}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ServiceRequestList;

import React, { useState, useEffect } from "react";
import { useDispatch } from "@store/store";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  Input,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
} from "reactstrap";
import ReactPaginate from "react-paginate";
import { MoreVertical, Edit } from "react-feather";
import moment from "moment";
import ServiceRequestStatusAction from "@store/V1/ServiceRequest/STATUS/ServiceRequestStatusAction";

const ServiceRequestList = (props) => {
  const _data = props.data;
  const dispatch = useDispatch();
  const [formModal, setFormModal] = useState(false);
  const [deleteCustomerId, setCustomerId] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(props?.pagination?.per_page);

  const serviceRequestDelete = (id) => {
    //action
    setFormModal(!formModal);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(_data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(_data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % _data.length;
    setItemOffset(newOffset);
  };

  const handleServiceRequestStatus = (e, id) => {
    dispatch(ServiceRequestStatusAction.serviceRequestStatus({
      id: id,
      status: e.target.value
    }));
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
                        {request?.customer?.first_name+ " "+request?.customer?.last_name}
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
                    </Input>
                  </td>
                  <td>{moment(request.created_at).format('YYYY-MM-DD')}</td>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="icon-btn hide-arrow"
                        color="transparent"
                        size="sm"
                        caret
                      >
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <Link
                          className="dropdown-item"
                          to={`/service-requests/detail/${request.id}`}
                        >
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">Detail</span>
                        </Link>
                      </DropdownMenu>
                    </UncontrolledDropdown>
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
        />
      </div>
      <div className="vertically-centered-modal">
        <Modal
          isOpen={formModal}
          toggle={() => setCenteredModal(!formModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!formModal)}>
            Confirmation
          </ModalHeader>
          <ModalBody>Are you sure you want to delete this service request ?</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => setCenteredModal(!formModal)}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={() => serviceRequestDelete(deleteCustomerId)}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ServiceRequestList;

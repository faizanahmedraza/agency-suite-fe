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
    //action
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
                      <span className="align-middle fw-bold">
                        {request.customer_name}
                      </span>
                  </td>
                  <td>
                      <span className="align-middle fw-bold">
                        {request.service_name}
                      </span>
                  </td>
                  <td className='text-center'>
                    <div className='form-switch form-check-primary'>
                      <Input type='switch' className='w-full' onChange={(e) => handleServiceRequestStatus(e, request.id)} defaultChecked={request.status === "completed"} id='icon-primary' name='icon-primary' />
                    </div>
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

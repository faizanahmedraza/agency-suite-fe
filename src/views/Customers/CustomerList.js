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
import CustomerDeleteAction from "@store/V1/Customer/DELETE/CustomerDeleteAction";
import CustomerStatusAction from "@store/V1/Customer/STATUS/CustomerStatusAction";
import { MoreVertical, Edit, Trash } from "react-feather";

const CustomerList = (props) => {
  const _data = props.data;
  const dispatch = useDispatch();
  const [formModal, setFormModal] = useState(false);
  const [deleteCustomerId, setCustomerId] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(props?.pagination?.per_page);

  const customerDelete = (id) => {
    dispatch(CustomerDeleteAction.customerDelete(id));
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

  const handleCustomerStatus = (e, id) => {
    dispatch(CustomerStatusAction.customerStatus(id))
  }

  return (
    <React.Fragment>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>STATUS</th>
            <th>LAST LOGGED IN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((customer) => {
              return (
                <tr key={customer.id}>
                  <td>
                    <Link to={`/customers/edit/${customer.id}`}>
                      <span className="align-middle fw-bold">
                        {customer.first_name + " " + customer.last_name}
                      </span>
                    </Link>
                  </td>
                  <td>{customer.email}</td>
                  <td className='text-center'>
                    <div className='form-switch form-check-primary'>
                      <Input type='switch' className='w-full' onChange={(e) => handleCustomerStatus(e, customer.id)} defaultChecked={customer.status === "active"} id='icon-primary' name='icon-primary' />
                    </div>
                  </td>
                  <td>{customer.last_logged_in}</td>
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
                          to={`/customers/edit/${customer.id}`}
                        >
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">Edit</span>
                        </Link>
                        <div
                          className="dropdown-item"
                          onClick={() => {
                            setFormModal(!formModal);
                            setCustomerId(customer.id);
                          }}
                        >
                          <Trash className="me-50" size={15} />{" "}
                          <span className="align-middle">Delete</span>
                        </div>
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
          <ModalBody>Are you sure you want to delete this customer ?</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => setCenteredModal(!formModal)}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={() => customerDelete(deleteCustomerId)}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default CustomerList;

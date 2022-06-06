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
import CustomerListAction from "@store/V1/Customer/LIST/CustomerListAction";
import GeneralHelper from "@src/Helpers/GeneralHelper";
import { Edit, Trash } from "react-feather";
import { useSelector } from "react-redux";

const CustomerList = (props) => {
  const _data = props.data;
  const dispatch = useDispatch();
  const [formModal, setFormModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [customerStatus, setCustomerStatus] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [offset, setOffset] = useState(props?.pagination?.current_page === undefined ? 0 : props?.pagination?.current_page - 1);
  const [pageCount, setPageCount] = useState(props?.pagination?.total_pages === undefined ? 0 : props?.pagination?.total_pages);

  const customerDelete = (id) => {
    dispatch(CustomerDeleteAction.customerDelete(id));
    setFormModal(!formModal);
  };

  const {
    list: { customers, pagination, isFetched },
  } = useSelector((state) => state.customers);

  useEffect(() => {
    if (!isFetched) return setCurrentItems(_data);
    setCurrentItems(customers);
    setPageCount(pagination.total_pages)
    setOffset(pagination.current_page - 1)
  }, [offset]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    if (props?.tabIndex == 1) {
      dispatch(
        CustomerListAction.customerList(
          GeneralHelper.Serialize({
            page: selectedPage,
          })
        )
      );
    } else if (props?.tabIndex == 2) {
      dispatch(
        CustomerListAction.customerList(
          GeneralHelper.Serialize({
            page: selectedPage,
            status: "active",
          })
        )
      );
    } else if (props?.tabIndex == 3) {
      dispatch(
        CustomerListAction.customerList(
          GeneralHelper.Serialize({
            page: selectedPage,
            status: "pending",
          })
        )
      );
    }
    setOffset(event.selected)
  };

  const changeCustomerStatus = () => {
    dispatch(CustomerStatusAction.customerStatus({
      id: customerId,
      status: customerStatus
    }))
    setStatusModal(!statusModal);
  }

  const handleCustomerStatus = (e, id) => {
    setStatusModal(!statusModal);
    setCustomerId(id);
    setCustomerStatus(e.target.value);
  };

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
          {currentItems ?
            currentItems.map((customer, key) => {
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
                  <td className='text-left' width="165px">
                    <Input type='select' name='select' id='select-basic' value={customer.status} onChange={(e) => handleCustomerStatus(e, customer.id)}>
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="blocked">BLocked</option>
                    </Input>
                  </td>
                  <td>{customer.last_logged_in ?? "-"}</td>
                  <td>
                    <Link
                      to={`/customers/edit/${customer.id}`}
                    >
                      <Edit className="me-50" size={20} />
                    </Link>
                    <Trash role="button" onClick={() => {
                      setFormModal(!formModal);
                      setCustomerId(customer.id);
                    }} className="me-50" size={20} />
                  </td>
                </tr>
              );
            })
            : <p>No Data Found !</p>}
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
              onClick={() => customerDelete(customerId)}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div className="vertically-centered-modal">
                <Modal
                    isOpen={statusModal}
                    toggle={() => setStatusModal(!statusModal)}
                    className="modal-dialog-centered"
                >
                    <ModalHeader toggle={() => setStatusModal(!statusModal)}>
                        Confirmation
                    </ModalHeader>
                    <ModalBody>Are you sure you want to change the status of this customer ?</ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => setStatusModal(!statusModal)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="danger"
                            onClick={() => changeCustomerStatus()}
                        >
                            Yes
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
    </React.Fragment>
  );
};

export default CustomerList;

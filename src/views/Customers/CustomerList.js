import React, { useState, useEffect } from "react";
import { formatDate } from '@utils'
import { useDispatch } from "@store/store";
import { Link , useSearchParams} from "react-router-dom";
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
import CustomerDeleteAction from "@store/V1/Customer/DELETE/CustomerDeleteAction";
import CustomerStatusAction from "@store/V1/Customer/STATUS/CustomerStatusAction";
import CustomerListAction from "@store/V1/Customer/LIST/CustomerListAction";
import GeneralHelper from "@src/Helpers/GeneralHelper";
import { Edit, Trash } from "react-feather";
import { useSelector } from "react-redux";

const CustomerList = ({ customers, pagination, tabIndex}) => {
  const dispatch = useDispatch();
  const [formModal, setFormModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [customerStatus, setCustomerStatus] = useState(null);
  const [currentItems, setCurrentItems] = useState(customers.length > 0 ? customers : []);
  const [offset, setOffset] = useState(pagination?.current_page === undefined ? 0 : pagination?.current_page - 1);
  const [pageCount, setPageCount] = useState(pagination?.total_pages === undefined ? 0 : pagination?.total_pages);
  const [searchParam, setSearchParam] = useSearchParams()

  const customerDelete = (id) => {
    dispatch(CustomerDeleteAction.customerDelete(id));
    setFormModal(!formModal);
  };

  const {
    list: { customers : newCustomers, pagination: newPagination, isFetched },
  } = useSelector((state) => state.customers);

  useEffect(() => {
    if (!isFetched) return setCurrentItems(customers);
    setCurrentItems(newCustomers);
    setPageCount(newPagination.total_pages)
    setOffset(newPagination.current_page - 1)
  }, [offset]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    if (tabIndex == 1) {
      setSearchParam({ index: selectedPage, tabindex: tabIndex })
      dispatch(
        CustomerListAction.customerList(
          GeneralHelper.Serialize({
            page: selectedPage,
          })
        )
      );
    } else if (tabIndex == 2) {
      setSearchParam({ index: selectedPage, tabindex: tabIndex })
      dispatch(
        CustomerListAction.customerList(
          GeneralHelper.Serialize({
            page: selectedPage,
            status: "active",
          })
        )
      );
    } else if (tabIndex == 3) {
      setSearchParam({ index: selectedPage, tabindex: tabIndex })
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
                    <Link to={`/customers/edit/${customer.id}`} target="_blank">
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
                      <option value="blocked">Blocked</option>
                    </Input>
                  </td>
                  <td>{formatDate(customer.last_logged_in) ?? "-"}</td>
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
          toggle={() => setFormModal(!formModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setFormModal(!formModal)}>
            Confirmation
          </ModalHeader>
          <ModalBody>Are you sure you want to delete this customer ?</ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              outline
              onClick={() => setFormModal(!formModal)}
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
                            color="secondary"
                            outline
                            onClick={() => setStatusModal(!statusModal)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
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

import React, { useState } from 'react';
import { useDispatch } from '@store/store';
import { Link } from 'react-router-dom';
import {
    UncontrolledDropdown,
    Badge, DropdownMenu,
    DropdownToggle,
    Modal,
    ModalHeader,
    ModalBody,
    Button
} from 'reactstrap';
import CustomerDeleteAction from "@store/V1/Customer/DELETE/CustomerDeleteAction";
import { MoreVertical, Edit, Trash } from 'react-feather';

const CustomerList = (props) => {
    const _data = props.data;
    const dispatch = useDispatch();
    const [formModal, setFormModal] = useState(false);
    const [deleteCustomerId, setCustomerId] = useState();

    const customerDelete = (id) => {
        dispatch(CustomerDeleteAction.customerDelete(id));
        setFormModal(!formModal);
    }

    return (
        <React.Fragment>
            {_data.length > 0 ?
                _data.map((customer) => (
                    <tr key={customer.id}>
                        <td>
                            <span className='align-middle fw-bold'>{customer.first_name + ' ' + customer.last_name}</span>
                        </td>
                        <td>{customer.email}</td>
                        <td>
                            <Badge pill color='light-primary' className='me-1'>
                                {customer.status}
                            </Badge>
                        </td>
                        <td>{customer.last_logged_in}</td>
                        <td>
                            <UncontrolledDropdown>
                                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                    <MoreVertical size={15} />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <Link className='dropdown-item' to={`/customers/edit/${customer.id}`}>
                                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                    </Link>
                                    <div className='dropdown-item' onClick={() => {
                                        setFormModal(!formModal)
                                        setCustomerId(customer.id)
                                    }}>
                                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </td>
                    </tr>
                ))
                :
                <tr><td colSpan={5} className="text-center"><strong>No Record Exist.</strong></td></tr>}
            <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setFormModal(!formModal)}></ModalHeader>
                <ModalBody>
                    <h3 className='text-center mb-2'>Are you sure you want to delete?</h3>
                    <div className='d-flex justify-content-around'>
                        <Button.Ripple color="secondary" onClick={() => setFormModal(!formModal)}>
                            Cancel
                        </Button.Ripple>
                        <Button.Ripple color='danger' onClick={() => customerDelete(deleteCustomerId)}>
                                Delete
                        </Button.Ripple>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>);
}

export default CustomerList;
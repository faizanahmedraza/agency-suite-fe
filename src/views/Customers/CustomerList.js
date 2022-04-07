import React from 'react';
import { Link } from 'react-router-dom';
import {
    UncontrolledDropdown,
    Badge, DropdownMenu,
    DropdownToggle,
} from 'reactstrap'
import { MoreVertical, Edit, Trash } from 'react-feather';

const CustomerList = (props) => {
    const _data = props.data;
    return (
        _data.length > 0 ?
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
                                <Link className='dropdown-item' to='/customers/edit/1'>
                                    <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                </Link>
                                <div className='dropdown-item' onClick={() => setFormModal(!formModal)}>
                                    <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                </div>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr>
            ))
            :
            <tr><td colSpan={5} className="text-center"><strong>No Record Exist.</strong></td></tr>
    );
}

export default CustomerList;
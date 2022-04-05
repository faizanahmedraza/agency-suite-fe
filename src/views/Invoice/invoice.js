import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  Card,
  CardBody,
  UncontrolledDropdown,
  Badge, DropdownMenu,
  DropdownToggle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import { MoreVertical, Edit, Trash } from 'react-feather'

const Invoice = () => {

  const [formModal, setFormModal] = useState(false);

  return (
    <div>
      <Card>
        <CardBody>
          <div className='row'>
            <div className='col-md-9'>
              <h1>Invoices</h1>
            </div>
            <div className='col-md-3'>
              <Link to="/invoice/create">
                <Button.Ripple className="w-100" color='primary'>Create Invoice</Button.Ripple>
              </Link>
            </div>
          </div>
        </CardBody >
      </Card >
      <Card>
        <CardBody>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>CLIENT</th>
                <th>TOTAL</th>
                <th>ISSUED DATE</th>
                <th>BALANCE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className='align-middle fw-bold'>FAIZAN AHMED RAZA</span>
                </td>
                <td>$4263</td>
                <td>
                12 Jun 2019
                </td>
                <td>$762</td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <Link className='dropdown-item' to='/invoice/edit/1'>
                        <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                      </Link>
                      <div className='dropdown-item' onClick={() => setFormModal(!formModal)}>
                        <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
              <tr>
                <td>
                  <span className='align-middle fw-bold'>HARIS GHORI</span>
                </td>
                <td>$3171</td>
                <td>
                25 Sep 2019
                </td>
                <td>-$205</td>
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
              <tr>
                <td>
                  <span className='align-middle fw-bold'>Mehmood</span>
                </td>
                <td>$4836</td>
                <td>
                22 Oct 2019
                </td>
                <td><Badge pill color='light-success' className='me-1'>
                    Paid
                  </Badge></td>
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
              <tr>
                <td>
                  <span className='align-middle fw-bold'>Fahad</span>
                </td>
                <td>$5181</td>
                <td>22 Oct 2019</td>
                <td>
                  <Badge pill color='light-success' className='me-1'>
                    Paid
                  </Badge>
                </td>
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
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
        <ModalHeader toggle={() => setFormModal(!formModal)}></ModalHeader>
        <ModalBody>
          <h3 className='text-center mb-2'>Are you sure you want to delete?</h3>
          <div className='d-flex justify-content-around'>
            <Button.Ripple color="secondary" onClick={() => setFormModal(!formModal)}>
              Cancel
            </Button.Ripple>
            <Button.Ripple color='danger'>
              <Link className='text-white' to='/customers/delete/1'>
                Delete
              </Link>
            </Button.Ripple>
          </div>
        </ModalBody>
      </Modal>
    </div >
  )
}

export default Invoice;
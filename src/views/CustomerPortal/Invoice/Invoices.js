import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import { MoreVertical, Edit, Trash } from 'react-feather'

const Invoice = () => {

  const [formModal, setFormModal] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bs-primary', 'black');
  }, [])

  return (
    <div>
      <Card>
        <CardBody>
          <div className='row'>
            <div className='col-md-9'>
              <h1>Invoices</h1>
            </div>
          </div>
        </CardBody >
      </Card >
      <Card>
        <CardBody>
         
        </CardBody>
      </Card>
    </div >
  )
}

export default Invoice;
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "@store/store";
import {
  Card,
  CardBody,
} from 'reactstrap'
import InvoiceListAction from "@store/V1/CustomerPortal/Invoice/List/InvoiceListAction"
import InvoiceTable from '@src/views/CustomerPortal/Invoice/InvoiceTable'

const Loader = () => {
  return (
    <div className="text-center">
      <strong>Loading...</strong>
    </div>
  );
};

const Invoice = () => {

  const dispatch = useDispatch();
  const {
    list: {
      loading,
      invoices,
      pagination
    }
  } = useSelector(state => state.customer_invoices);

  useEffect(() => {
    if (!invoices.length) return dispatch(InvoiceListAction.invoiceList());
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
          {loading ? (
            <Loader />
          ) :
            <InvoiceTable data={invoices} pagination={pagination} />
          }
        </CardBody>
      </Card>
    </div >
  )
}

export default Invoice;
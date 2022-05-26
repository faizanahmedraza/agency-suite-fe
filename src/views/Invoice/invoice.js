import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "@store/store";
import {
  Card,
  CardBody,
} from 'reactstrap'
import InvoiceListAction from "@store/V1/Invoice/List/InvoiceListAction"
import InvoiceTable from '@src/views/Invoice/InvoiceTable'

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
    },
    delete: {
      isDeleted
    },
    status: {
      isChanged
    },
  } = useSelector(state => state.invoices);

  useEffect(() => {
    dispatch(InvoiceListAction.invoiceList());
  }, [isDeleted, isChanged])

  return (
    <div>
      <Card>
        <CardBody>
          <div className='row'>
            <div className='col-md-9'>
              <h1>Invoices</h1>
            </div>
            {/* <div className='col-md-3'>
              <Link to="/invoice/create">
                <Button.Ripple className="w-100" color='primary'>Create Invoice</Button.Ripple>
              </Link>
            </div> */}
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
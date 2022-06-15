import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from "@store/store";
import {
  Card,
  CardBody,
} from 'reactstrap'
import InvoiceListAction from "@store/V1/CustomerPortal/Invoice/List/InvoiceListAction"
import InvoiceTable from '@src/views/CustomerPortal/Invoice/InvoiceTable'
import GeneralHelper from "@src/Helpers/GeneralHelper";

const Loader = () => {
  return (
    <div className="text-center">
      <strong>Loading...</strong>
    </div>
  );
};

const Invoice = () => {
  const [searchParam] = useSearchParams()
  const index = searchParam.get('index')
  const dispatch = useDispatch();
  const {
    list: {
      loading,
      invoices,
      pagination
    }
  } = useSelector(state => state.customer_invoices);

  useEffect(() => {
    dispatch(InvoiceListAction.invoiceList(index ? GeneralHelper.Serialize({
      page: index,
    }) : ""));
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
            <InvoiceTable invoices={invoices} pagination={pagination} />
          }
        </CardBody>
      </Card>
    </div >
  )
}

export default Invoice;
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from "@store/store";
import {
  Card,
  CardBody,
} from 'reactstrap'
import InvoiceListAction from "@store/V1/Invoice/List/InvoiceListAction"
import InvoiceTable from '@src/views/Invoice/InvoiceTable'
import GeneralHelper from "@src/Helpers/GeneralHelper";

const Loader = () => {
  return (
    <div className="text-center">
      <strong>Loading...</strong>
    </div>
  );
};

const Invoice = () => {
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams()

  const index = searchParam.get('index')
  
  const {
    list: {
      loading,
      pagination,
      invoices
    },
    delete: {
      isDeleted
    },
    status: {
      isChanged
    },
  } = useSelector(state => state.invoices);

  useEffect(() => {
    dispatch(InvoiceListAction.invoiceList(index ? GeneralHelper.Serialize({
      page: index,
    }) : ""));
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
            <InvoiceTable invoices={invoices} pagination={pagination} />
          }
        </CardBody>
      </Card>
    </div >
  )
}

export default Invoice;
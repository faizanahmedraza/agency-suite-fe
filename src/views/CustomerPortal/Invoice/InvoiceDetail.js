import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Button,
    Form
} from 'reactstrap'
import { useDispatch, useSelector } from '@store/store'
import InvoiceDetailAction from "@store/V1/CustomerPortal/Invoice/Detail/InvoiceDetailAction"
import BillingCardInfo from '@src/views/CustomerPortal/Billing/BillingCardInfo';
import InvoicePaidAction from "@store/V1/CustomerPortal/Invoice/InvoicePaid/InvoicePaidAction";
import BillingInformationListAction from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListAction";
import Loader from '@src/views/GrowLoader';
import GeneralHelper from "@src/Helpers/GeneralHelper";
import draftToHtml from 'draftjs-to-html';

const InvoiceDetail = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const {
        customer_invoices: {
            detail: {
                loading,
                customer_invoice,
                fetched
            },
            invoice_paid: {
                loading: createLoading, isPaid
            }
        },
        customer_billing_information: {
            list: { customer_billing_information, fetched: billingInfofetched }
        }
    } = useSelector(state => state);

    const [invoicePaid, setInvoicePaid] = useState({
        card_id: "",
        invoice_id: id
    });

    function descriptionConversion(str) {
        if (str) {
            const hashConfig = {
                trigger: '#',
                separator: ' ',
            }
            return draftToHtml(JSON.parse(str), hashConfig)
        }
    }

    const handleInvoicePaidField = (e) => {
        setInvoicePaid({
            ...invoicePaid,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(InvoicePaidAction.invoicePaid(invoicePaid));
    }

    useEffect(() => {
        if (!fetched) { dispatch(InvoiceDetailAction.invoiceDetail(id)) };
        if (!billingInfofetched) return dispatch(BillingInformationListAction.billingInformationList());

        if (billingInfofetched) {
            const primaryCard = customer_billing_information.find(({ is_primary }) => is_primary === true)
            setInvoicePaid({ ...invoicePaid, card_id: primaryCard?.id ?? "" })
        }
    }, [fetched, billingInfofetched]);

    useEffect(() => {
        if (!fetched || isPaid) return dispatch(InvoiceDetailAction.invoiceDetail(id))
    }, [isPaid]);

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h1>Invoice Details</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    {loading ? <Loader /> : <>
                        <Row>
                            <Col md="3" sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label fs-5 fw-bold' for='select-basic'>
                                        Invoice Number
                                    </Label>
                                    <p className='text-wrap'>
                                        {customer_invoice && customer_invoice.invoice_number}
                                    </p>
                                </div>
                            </Col>
                            {customer_invoice.customer_service_request ? <>
                                <Col md="3" sm="12">
                                    <div className="mb-1">
                                        <Label className="form-label fs-5 fw-bold" for="select-basic">
                                            Quantity
                                        </Label>
                                        <p className="text-wrap">
                                            {customer_invoice.customer_service_request.quantity}
                                        </p>
                                    </div>
                                </Col>
                                <Col md="3" sm="12">
                                    <div className="mb-1">
                                        <Label className="form-label fs-5 fw-bold" for="select-basic">
                                            Amount
                                        </Label>
                                        <p className="text-wrap">
                                            $
                                            {Number.parseFloat(
                                                customer_invoice && customer_invoice.amount
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                </Col>
                            </> : ""}
                            <Col md="3" sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label fs-5 fw-bold' for='select-basic'>
                                        Is Invoice Paid?
                                    </Label>
                                    <p className='text-wrap'>
                                        {customer_invoice.is_paid && GeneralHelper.Capitalize(customer_invoice.is_paid)}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        {customer_invoice.customer_service_request ? <>
                            <Row>
                                {customer_invoice && customer_invoice?.service?.image &&
                                    <Col md='12' sm='12'>
                                        <div className="mb-2">
                                            <img src={customer_invoice && customer_invoice?.customer_service_request?.service?.image} max-width="100%" height="300" alt="service image" />
                                        </div>
                                    </Col>
                                }
                                <Col md="12" sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5 fw-bold' for='select-basic'>
                                            Service Name
                                        </Label>
                                        <p>
                                            {customer_invoice && customer_invoice?.customer_service_request?.service?.name}
                                        </p>
                                    </div>
                                </Col>
                                <Col md="12" sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5 fw-bold' for='select-basic'>
                                            Service Description
                                        </Label>
                                        <p className='text-wrap'>
                                            {customer_invoice && customer_invoice?.customer_service_request?.service?.description}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            {
                                customer_invoice?.customer_service_request?.is_recurring ?
                                    (
                                        <Row>
                                            <Col md='12' sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label fs-5 fw-bold pb-0 mb-0' for='select-basic'>
                                                        Service Subscription
                                                    </Label>
                                                    <div className='demo-inline-spacing'>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' value="weekly" defaultChecked={customer_invoice && customer_invoice?.customer_service_request?.recurring_type === "weekly"} disabled />
                                                            <Label className='form-check-label' for='sr4'>
                                                                {'weekly - $' + Number.parseFloat(customer_invoice && customer_invoice?.customer_service_request?.service?.price_types.weekly).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr5' value="monthly" defaultChecked={customer_invoice && customer_invoice?.customer_service_request?.recurring_type === "monthly"} disabled />
                                                            <Label className='form-check-label' for='sr5'>
                                                                {'monthly - $' + Number.parseFloat(customer_invoice && customer_invoice?.customer_service_request?.service?.price_types.monthly).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr3' value="quarterly" defaultChecked={customer_invoice && customer_invoice?.customer_service_request?.recurring_type === "quarterly"} disabled />
                                                            <Label className='form-check-label' for='sr3'>
                                                                {'quarterly - $' + Number.parseFloat(customer_invoice && customer_invoice?.customer_service_request?.service?.price_types.quarterly).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr2' value="biannually" defaultChecked={customer_invoice && customer_invoice?.customer_service_request?.recurring_type === "biannually"} disabled />
                                                            <Label className='form-check-label' for='sr2'>
                                                                {'biannually - $' + Number.parseFloat(customer_invoice && customer_invoice?.customer_service_request?.service?.price_types.biannually).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr1' value="annually" defaultChecked={customer_invoice && customer_invoice?.customer_service_request?.recurring_type === "annually"} disabled />
                                                            <Label className='form-check-label' for='sr1'>
                                                                {'annually - $' + Number.parseFloat(customer_invoice && customer_invoice?.customer_service_request?.service?.price_types.annually).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    ) : (
                                        <Row>
                                            <Col md='4' sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label fs-5 fw-bold' for='select-basic'>
                                                        Subscription Type
                                                    </Label>
                                                    <p className='text-wrap'>
                                                        one-off
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col md='4' sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label fs-5 fw-bold' for='select-basic'>
                                                        Purchase Limit
                                                    </Label>
                                                    <p className='text-wrap'>
                                                        {customer_invoice?.customer_service_request?.service?.price_types?.purchase_limit ?? "---"}
                                                    </p>
                                                </div>
                                            </Col>
                                        </Row>
                                    )
                            }
                            <Row>
                                <Col md='12' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='title'>
                                            Intake Title
                                        </Label>
                                        <Input type='text' value={customer_invoice?.customer_service_request?.intake_form[0]?.title ? customer_invoice?.customer_service_request?.intake_form[0]?.title : ""} name='title' id='title' placeholder='Enter Title' readOnly />
                                    </div>
                                </Col>
                                <Col md='12' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='description'>
                                            Intake Description
                                        </Label>
                                        <p className='text-wrap' contentEditable='false' dangerouslySetInnerHTML={{
                                            __html: descriptionConversion(customer_invoice?.customer_service_request
                                                ?.intake_form[0]?.description)
                                        }}>
                                        </p>                                    </div>
                                </Col>
                                {(customer_invoice?.customer_service_request.status !== 'cancelled' && customer_invoice.is_paid == "no") ?
                                    <Col md='12' sm='12' className='my-2'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <BillingCardInfo billingInfoList={customer_billing_information} cardId={invoicePaid.card_id} onChangeField={handleInvoicePaidField} />
                                            <Form onSubmit={onSubmitHandler}>
                                                <Button color='primary' className='btn-sm py-1 px-3 mt-2' type='submit' disabled={createLoading}>
                                                    {
                                                        createLoading ?
                                                            <Loader />
                                                            :
                                                            <span>
                                                                Paid
                                                            </span>
                                                    }
                                                </Button>
                                            </Form>
                                        </div>
                                    </Col>
                                    : ""}
                            </Row>
                        </>
                            : <>
                                <Table className="mt-2" responsive>
                                    <thead>
                                        <tr>
                                            <th className='py-1'>Item Name</th>
                                            <th className='py-1'>Rate</th>
                                            <th className='py-1'>Quantity</th>
                                            <th className='py-1'>Discount</th>
                                            <th className='py-1'>Gross Amount</th>
                                            <th className='py-1'>Net Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customer_invoice.invoice_items && customer_invoice.invoice_items.map((invoice) => {
                                            return (
                                                <tr key={invoice.id}>
                                                    <td className='py-1'>
                                                        {invoice.name}
                                                    </td>
                                                    <td className='py-1'>
                                                        <span className='fw-bold'>${invoice.rate}</span>
                                                    </td>
                                                    <td className='py-1'>
                                                        <span className='fw-bold'>{invoice.quantity}</span>
                                                    </td>
                                                    <td className='py-1'>
                                                        <span className='fw-bold'>${invoice.discount ? invoice.discount : 0}</span>
                                                    </td>
                                                    <td className='py-1'>
                                                        <span className='fw-bold'>${invoice.gross_amount}</span>
                                                    </td>
                                                    <td className='py-1'>
                                                        <span className='fw-bold'>${invoice.net_amount}</span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </Table>
                                <Row className="mt-2">
                                    <Col md='4'>
                                        <p className='fs-5 fw-bold'>Subtotal:</p>
                                        <p className='invoice-total-amount'>${customer_invoice.gross_amount}</p>
                                    </Col>
                                    <Col md='4'>
                                        <p className='fs-5 fw-bold'>Discount:</p>
                                        <p className='invoice-total-amount'>${customer_invoice.discount ? customer_invoice.discount : 0}</p>
                                    </Col>
                                    <Col md='4'>
                                        <p className='fs-5 fw-bold'>Total:</p>
                                        <p className='invoice-total-amount'>${customer_invoice.amount}</p>
                                    </Col>
                                </Row>
                            </>
                        }
                    </>
                    }
                    {loading ? "" : (
                        <Row>
                            {customer_invoice.is_paid == "no" ?
                                <Col md='12' sm='12' className='my-2'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <BillingCardInfo billingInfoList={customer_billing_information} cardId={invoicePaid.card_id} onChangeField={handleInvoicePaidField} />
                                        <Form onSubmit={onSubmitHandler}>
                                            <Button color='primary' className='btn-sm py-1 px-3 mt-2' type='submit' disabled={createLoading}>
                                                {
                                                    createLoading ?
                                                        <Loader />
                                                        :
                                                        <span>
                                                            Paid
                                                        </span>
                                                }
                                            </Button>
                                        </Form>
                                    </div>
                                </Col>
                                : ""}
                            <Col md='12' sm='12'>
                                <div className='d-flex justify-content-between'>
                                    <Link to="/customer-invoices" className='btn btn-outline-secondary'>
                                        Cancel
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    )}
                </CardBody>
            </Card >
        </div >
    )
}

export default InvoiceDetail;
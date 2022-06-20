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
        dispatch(InvoiceDetailAction.invoiceDetail(id));
        if(!billingInfofetched) return dispatch(BillingInformationListAction.billingInformationList());

        if (billingInfofetched) {
            const primaryCard = customer_billing_information.find(({is_primary}) => is_primary === true)
            setInvoicePaid({ ...invoicePaid, card_id: primaryCard?.id ?? "" })
        }
    }, [fetched, isPaid, billingInfofetched]);

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
                            <Col md="4" sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label fs-5' for='select-basic'>
                                        Invoice Number
                                    </Label>
                                    <p className='text-wrap'>
                                        {customer_invoice && customer_invoice.invoice_number}
                                    </p>
                                </div>
                            </Col>
                            <Col md="4" sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label fs-5' for='select-basic'>
                                        Amount
                                    </Label>
                                    <p className='text-wrap'>
                                        ${Number.parseFloat(customer_invoice && customer_invoice.amount).toFixed(2)}
                                    </p>
                                </div>
                            </Col>
                            <Col md="4" sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label fs-5' for='select-basic'>
                                        Is Invoice Paid?
                                    </Label>
                                    <p className='text-wrap'>
                                        {customer_invoice.is_paid && GeneralHelper.Capitalize(customer_invoice.is_paid)}
                                    </p>
                                </div>
                            </Col>
                        </Row>
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
                                    <Label className='form-label fs-5' for='select-basic'>
                                        Service Name
                                    </Label>
                                    <p>
                                        {customer_invoice && customer_invoice?.customer_service_request?.service?.name}
                                    </p>
                                </div>
                            </Col>
                            <Col md="12" sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label fs-5' for='select-basic'>
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
                                                <Label className='form-label fs-5 pb-0 mb-0' for='select-basic'>
                                                    Service Subscription
                                                </Label>
                                                <div className='demo-inline-spacing'>
                                                    <div className='form-check'>
                                                        <Input type='radio' name='recurring_type' id='sr1' value="annually" defaultChecked={customer_invoice && customer_invoice?.customer_service_request?.recurring_type === "annually"} disabled />
                                                        <Label className='form-check-label' for='sr1'>
                                                            {'annually - $' + Number.parseFloat(customer_invoice && customer_invoice?.customer_service_request?.service?.price_types.annually).toFixed(2)}
                                                        </Label>
                                                    </div>
                                                    <div className='form-check'>
                                                        <Input type='radio' name='recurring_type' id='sr2' value="biannually" defaultChecked={customer_invoice && customer_invoice?.customer_service_request?.recurring_type === "biannually"} disabled />
                                                        <Label className='form-check-label' for='sr2'>
                                                            {'biannually - $' + Number.parseFloat(customer_invoice && customer_invoice?.customer_service_request?.service?.price_types.biannually).toFixed(2)}
                                                        </Label>
                                                    </div>
                                                    <div className='form-check'>
                                                        <Input type='radio' name='recurring_type' id='sr3' value="quarterly" defaultChecked={customer_invoice && customer_invoice?.customer_service_request?.recurring_type === "quarterly"} disabled />
                                                        <Label className='form-check-label' for='sr3'>
                                                            {'quarterly - $' + Number.parseFloat(customer_invoice && customer_invoice?.customer_service_request?.service?.price_types.quarterly).toFixed(2)}
                                                        </Label>
                                                    </div>
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
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                ) : (
                                    <Row>
                                        <Col md='4' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-5' for='select-basic'>
                                                    Subscription Type
                                                </Label>
                                                <p className='text-wrap'>
                                                    one-off
                                                </p>
                                            </div>
                                        </Col>
                                        <Col md='4' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-5' for='select-basic'>
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
                                    <Input type='textarea' value={customer_invoice?.customer_service_request?.intake_form[0]?.description ? customer_invoice?.customer_service_request?.intake_form[0]?.description : ""} name='description' id='description' placeholder='Enter Description' readOnly />
                                </div>
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
                            <Col md='12' sm='12'>
                                <div className='d-flex justify-content-between'>
                                    <Link to="/customer-invoices" className='btn btn-outline-secondary'>
                                        Cancel
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </>
                    }
                </CardBody>
            </Card >
        </div >
    )
}

export default InvoiceDetail;
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Button,
    CardHeader,
    Form
} from 'reactstrap'
import { useDispatch, useSelector } from '@store/store'
import InvoiceDetailAction from "@store/V1/Invoice/Detail/InvoiceDetailAction"
import BillingInformationListAction from "@store/V1/CustomerBillingInformation/LIST/BillingInformationListAction";
import InvoicePaidAction from "@store/V1/Invoice/InvoicePaid/InvoicePaidAction";
import GeneralHelper from "@src/Helpers/GeneralHelper";

const Loader = () => {
    return (
        <div className="text-center">
            <strong>Loading...</strong>
        </div>
    );
};

const InvoiceDetail = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        invoices: {
            detail: {
                loading,
                customer_invoice,
                fetched
            },
            invoice_paid: {
                loading: invoicePaidLoading, isPaid
            }
        },
        billing_information: {
            list: {
                customer_billing_information,
                fetched: billingInfofetched,
                loading: billingInfoLoading
            }
        }
    } = useSelector(state => state);

    const [invoiceDetails, setInvoiceDetails] = useState({
        invoice_number: "",
        customer_service_request: {
            service: {
                id: "",
                name: "",
                description: "",
                subscription_type: "",
                price_types: {
                    weekly: "",
                    monthly: "",
                    quarterly: "",
                    biannually: "",
                    annually: "",
                    price: "",
                    purchase_limit: ""
                }
            },
            is_recurring: false,
            recurring_type: "",
            intake_form: [],
            status: "",
        },
        is_paid: false,
        amount: "",
    });

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

    useEffect(() => {
        dispatch(InvoiceDetailAction.invoiceDetail(id));

        if (fetched) {
            setInvoiceDetails(customer_invoice)
            dispatch(BillingInformationListAction.billingInformationList(
                GeneralHelper.Serialize({
                    customer_id: customer_invoice?.customer?.id ?? "",
                })
            ));
        }

        if (billingInfofetched) {
            const primaryCard = customer_billing_information.filter(billingInfo => billingInfo.is_primary === true)
            setInvoicePaid({ ...invoicePaid, card_id: primaryCard[0]?.id })
        }
    }, [fetched, billingInfofetched, isPaid]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(InvoicePaidAction.invoicePaid(invoicePaid));
    }

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
                    <Card>
                        <CardHeader>
                            <h4>Invoice Details</h4>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            {loading ? <Loader /> :
                                <Row>
                                    <Col md="4" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label fs-5' for='select-basic'>
                                                Invoice Number
                                            </Label>
                                            <p className='text-wrap'>
                                                {invoiceDetails.invoice_number}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md="4" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label fs-5' for='select-basic'>
                                                Amount
                                            </Label>
                                            <p className='text-wrap'>
                                                ${Number.parseFloat(invoiceDetails.amount).toFixed(2)}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md="4" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label fs-5' for='select-basic'>
                                                Is Invoice Paid?
                                            </Label>
                                            <p className='text-wrap'>
                                                {invoiceDetails.is_paid ? 'Yes' : 'No'}
                                            </p>
                                        </div>
                                    </Col>
                                    {invoiceDetails?.service?.image &&
                                        <Col md='12' sm='12'>
                                            <div className="mb-2">
                                                <img src={invoiceDetails?.customer_service_request?.service?.image} max-width="100%" height="300" alt="service image" />
                                            </div>
                                        </Col>
                                    }
                                    <Col md="12" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label fs-5' for='select-basic'>
                                                Service Name
                                            </Label>
                                            <p>
                                                {invoiceDetails && invoiceDetails?.customer_service_request?.service?.name}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md="12" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label fs-5' for='select-basic'>
                                                Service Description
                                            </Label>
                                            <p className='text-wrap'>
                                                {invoiceDetails && invoiceDetails?.customer_service_request?.service?.description}
                                            </p>
                                        </div>
                                    </Col>
                                    {
                                        customer_invoice?.customer_service_request?.is_recurring ?
                                            (
                                                <Col md='12' sm='12'>
                                                    <div className='mb-1'>
                                                        <Label className='form-label fs-5 pb-0 mb-0' for='select-basic'>
                                                            Service Subscription
                                                        </Label>
                                                        <div className='demo-inline-spacing'>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr1' value="annually" defaultChecked={invoiceDetails?.customer_service_request?.recurring_type === "annually"} disabled />
                                                                <Label className='form-check-label' for='sr1'>
                                                                    {'annually - $' + Number.parseFloat(invoiceDetails?.customer_service_request?.service?.price_types?.annually).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr2' value="biannually" defaultChecked={invoiceDetails?.customer_service_request?.recurring_type === "biannually"} disabled />
                                                                <Label className='form-check-label' for='sr2'>
                                                                    {'biannually - $' + Number.parseFloat(invoiceDetails?.customer_service_request?.service?.price_types.biannually).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr3' value="quarterly" defaultChecked={invoiceDetails?.customer_service_request?.recurring_type === "quarterly"} disabled />
                                                                <Label className='form-check-label' for='sr3'>
                                                                    {'quarterly - $' + Number.parseFloat(invoiceDetails?.customer_service_request?.service?.price_types.quarterly).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' value="weekly" defaultChecked={invoiceDetails?.customer_service_request?.recurring_type === "weekly"} disabled />
                                                                <Label className='form-check-label' for='sr4'>
                                                                    {'weekly - $' + Number.parseFloat(invoiceDetails?.customer_service_request?.service?.price_types.weekly).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr5' value="monthly" defaultChecked={invoiceDetails?.customer_service_request?.recurring_type === "monthly"} disabled />
                                                                <Label className='form-check-label' for='sr5'>
                                                                    {'monthly - $' + Number.parseFloat(invoiceDetails?.customer_service_request?.service?.price_types.monthly).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) : (
                                                <Col md='12' sm='12'>
                                                    <div className='mb-1'>
                                                        <Label className='form-label fs-5' for='select-basic'>
                                                            Subscription Type: one-off
                                                        </Label>
                                                    </div>
                                                    <div className='mb-1'>
                                                        <Label className='form-label fs-5' for='select-basic'>
                                                            Price: ${Number.parseFloat(invoiceDetails?.customer_service_request?.service?.price_types?.price).toFixed(2)}
                                                        </Label>
                                                    </div>
                                                    <div className='mb-1'>
                                                        <Label className='form-label fs-5' for='select-basic'>
                                                            Purchase Limit: {invoiceDetails?.customer_service_request?.service?.price_types?.purchase_limit && invoiceDetails?.customer_service_request?.service?.price_types?.purchase_limit}
                                                        </Label>
                                                    </div>
                                                </Col>
                                            )
                                    }
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label fs-5' for='title'>
                                                Intake Title
                                            </Label>
                                            <Input type='text' value={invoiceDetails?.customer_service_request?.intake_form[0]?.title ? invoiceDetails?.customer_service_request?.intake_form[0]?.title : ""} name='title' id='title' placeholder='Enter Title' readOnly />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label fs-5' for='description'>
                                                Intake Description
                                            </Label>
                                            <Input type='textarea' value={invoiceDetails?.customer_service_request?.intake_form[0]?.description ? invoiceDetails?.customer_service_request?.intake_form[0]?.description : ""} name='description' id='description' placeholder='Enter Description' readOnly />
                                        </div>
                                    </Col>
                                    {!customer_invoice.is_paid ?
                                        (billingInfoLoading ? <Loader /> :
                                            <Col md='12' sm='12'>
                                                <Form onSubmit={onSubmitHandler}>
                                                    <div className='d-flex justify-content-between align-items-center mb-2'>
                                                        <div className='w-50'>
                                                            <Input type='select' name='card_id' id='select-custom' defaultValue={invoicePaid.card_id} onChange={handleInvoicePaidField}>
                                                                <option value="">Select Card</option>
                                                                {
                                                                    customer_billing_information && customer_billing_information.map((option) => {
                                                                        return <option value={option.id} key={option.id}>.... .... .... {option.last_digits}</option>
                                                                    })
                                                                }
                                                            </Input>
                                                        </div>
                                                        <Button color='primary' className='btn-sm py-1 px-3' type='submit' disabled={invoicePaidLoading}>
                                                            {
                                                                invoicePaidLoading ?
                                                                    <Loader />
                                                                    :
                                                                    <span>
                                                                        Paid
                                                                    </span>
                                                            }
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </Col>
                                        ) : ""}
                                    <Col md='12' sm='12'>
                                        <div className='d-flex justify-content-between'>
                                            <Button outline className='me-1' color='secondary' type='button' onClick={() => navigate(-1)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            }
                        </CardBody>
                    </Card>
                </CardBody>
            </Card >
        </div >
    )
}

export default InvoiceDetail;
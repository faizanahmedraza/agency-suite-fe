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
import InvoiceDetailAction from "@store/V1/CustomerPortal/Invoice/Detail/InvoiceDetailAction"
import BillingCardInfo from '@src/views/CustomerPortal/Billing/BillingCardInfo';

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
    const [centeredModal, setCenteredModal] = useState(false)

    const {
        customer_invoices: { detail: {
            loading,
            customer_invoice,
            fetched
        }
        },
        customer_billing_information: { list: { customer_billing_information } }
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
        is_paid: "",
        amount: "",
    });

    useEffect(() => {
        dispatch(InvoiceDetailAction.invoiceDetail(id));
        if (fetched) {
            setInvoiceDetails(customer_invoice)
        }
    }, [fetched]);

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
                                        invoiceDetails?.customer_service_request?.service?.subscription_type === "recurring" ?
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
                                                                    {'annually - ' + invoiceDetails?.customer_service_request?.service?.price_types.annually + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr2' value="biannually" defaultChecked={invoiceDetails?.customer_service_request?.recurring_type === "biannually"} disabled />
                                                                <Label className='form-check-label' for='sr2'>
                                                                    {'biannually - ' + invoiceDetails?.customer_service_request?.service?.price_types.biannually + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr3' value="quarterly" defaultChecked={invoiceDetails?.customer_service_request?.recurring_type === "quarterly"} disabled />
                                                                <Label className='form-check-label' for='sr3'>
                                                                    {'quarterly - ' + invoiceDetails?.customer_service_request?.service?.price_types.quarterly + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' value="weekly" defaultChecked={invoiceDetails?.customer_service_request?.recurring_type === "weekly"} disabled />
                                                                <Label className='form-check-label' for='sr4'>
                                                                    {'weekly - ' + invoiceDetails?.customer_service_request?.service?.price_types.weekly + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr5' value="monthly" defaultChecked={invoiceDetails?.customer_service_request?.recurring_type === "monthly"} disabled />
                                                                <Label className='form-check-label' for='sr5'>
                                                                    {'monthly - ' + invoiceDetails?.customer_service_request?.service?.price_types.monthly + '$'}
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
                                                            Price: {invoiceDetails?.customer_service_request?.service?.price_types?.price}
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
                                            <Input type='text' value={invoiceDetails?.customer_service_request?.intake_form[0]?.title} name='title' id='title' placeholder='Enter Title' readOnly />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label fs-5' for='description'>
                                                Intake Description
                                            </Label>
                                            <Input type='textarea' value={invoiceDetails?.customer_service_request?.intake_form[0]?.description} name='description' id='description' placeholder='Enter Description' readOnly />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12' className='my-2'>
                                       <BillingCardInfo invoiceId={id}/>
                                    </Col>
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
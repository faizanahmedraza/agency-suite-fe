import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Form,
    Button,
    CardHeader,
    Spinner,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'
import { useDispatch, useSelector } from '@store/store'
import ServiceRequestDetailAction from "@store/V1/CustomerPortal/ServiceRequest/DETAIL/ServiceRequestDetailAction";

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
        customer_service_requests: { detail: { serivice_request, loading, fetched } },
    } = useSelector(state => state);

    const [invoiceDetails, setInvoiceDetails] = useState({
        invoice_number: "",
        customer_service_request: {
            service: {
                id: "",
                name: "",
                description: "",
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
            intake_form: {
                title: "",
                description: ""
            },
            status: "",
        },
        is_paid: "",
        amount: "",
    });

    useEffect(() => {
        dispatch(ServiceRequestDetailAction.serviceRequestDetail(id));
        if (fetched) {
            setInvoiceDetails(serivice_request)
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
                                                <img src={invoiceDetails?.service?.image} max-width="100%" height="300" alt="service image" />
                                            </div>
                                        </Col>
                                    }
                                    <Col md="12" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label fs-4' for='select-basic'>
                                                Service Name
                                            </Label>
                                            <p>
                                                {invoiceDetails && invoiceDetails?.service?.name}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md="12" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label fs-4' for='select-basic'>
                                                Service Description
                                            </Label>
                                            <p className='text-wrap'>
                                                {invoiceDetails && invoiceDetails?.service?.description}
                                            </p>
                                        </div>
                                    </Col>
                                    {
                                        invoiceDetails?.service?.subscription_type == "recurring" ?
                                            (
                                                <Col md='12' sm='12'>
                                                    <div className='mb-1'>
                                                        <Label className='form-label pb-0 mb-0' for='select-basic'>
                                                            Service Subscription
                                                        </Label>
                                                        <div className='demo-inline-spacing'>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr1' value="annually" defaultChecked={invoiceDetails?.recurring_type === "annually"} disabled />
                                                                <Label className='form-check-label' for='sr1'>
                                                                    {'annually - ' + invoiceDetails?.service?.price_types.annually + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr2' value="biannually" defaultChecked={invoiceDetails?.recurring_type === "biannually"} disabled />
                                                                <Label className='form-check-label' for='sr2'>
                                                                    {'biannually - ' + invoiceDetails?.service?.price_types.biannually + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr3' value="quarterly" defaultChecked={invoiceDetails?.recurring_type === "quarterly"} disabled />
                                                                <Label className='form-check-label' for='sr3'>
                                                                    {'quarterly - ' + invoiceDetails?.service?.price_types.quarterly + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' value="weekly" defaultChecked={invoiceDetails?.recurring_type === "weekly"} disabled />
                                                                <Label className='form-check-label' for='sr4'>
                                                                    {'weekly - ' + invoiceDetails?.service?.price_types.weekly + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr5' value="monthly" defaultChecked={invoiceDetails?.recurring_type === "monthly"} disabled />
                                                                <Label className='form-check-label' for='sr5'>
                                                                    {'monthly - ' + invoiceDetails?.service?.price_types.monthly + '$'}
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) : (
                                                <Col md='12' sm='12'>
                                                    <div className='mb-1'>
                                                        <Label className='form-label' for='select-basic'>
                                                            Subscription Type: one-off
                                                        </Label>
                                                    </div>
                                                    <div className='mb-1'>
                                                        <Label className='form-label' for='select-basic'>
                                                            Price: {invoiceDetails?.service?.price_types?.price}
                                                        </Label>
                                                    </div>
                                                    <div className='mb-1'>
                                                        <Label className='form-label' for='select-basic'>
                                                            Purchase Limit: {invoiceDetails?.service?.price_types?.purchase_limit && invoiceDetails?.service?.price_types?.purchase_limit}
                                                        </Label>
                                                    </div>
                                                </Col>
                                            )
                                    }
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='title'>
                                                Intake Title
                                            </Label>
                                            <Input type='text' value={invoiceDetails?.intake_form[0]?.title} name='title' id='title' placeholder='Enter Title' readOnly />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='description'>
                                                Intake Description
                                            </Label>
                                            <Input type='textarea' value={invoiceDetails?.intake_form[0]?.description} name='description' id='description' placeholder='Enter Description' readOnly />
                                        </div>
                                    </Col>
                                    {/* <Col md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='reference_no'>
                                                    Reference Number
                                                </Label>
                                                <Input type='number' value={invoiceDetails.reference_no} name='reference_no' id='reference_no' placeholder='Enter Reference Number' />
                                            </div>
                                        </Col> */}
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
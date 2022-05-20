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
import ServiceRequestCreateAction from "@store/V1/CustomerPortal/ServiceRequest/CREATE/ServiceRequestCreateAction";
import ServiceActions from "@store/V1/CustomerPortal/Service/Detail/ServiceDetailAction";
import BillingInformationListAction from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListAction";
import BillingInformationCreateAction from "@store/V1/CustomerPortal/BillingInformation/CREATE/BillingInformationCreateAction";

const Loader = () => {
    return (
        <div className="text-center">
            <strong>Loading...</strong>
        </div>
    );
};

const CreateServiceRequest = () => {

    const dispatch = useDispatch();
    const { service_id } = useParams();
    const navigate = useNavigate();

    const {
        customer_services: { detail: { service, loading: serviceloading, fetched: serviceFetched } },
        customer_service_requests: { create: { loading: createServiceRequestLoading } },
        customer_billing_information: { list: { customer_billing_information, loading: billingInfoLoading, fetched: billingInfoFetched }, create: { loading: createBillingInfoLoading } }
    } = useSelector(state => state);

    const [serviceDetail, setServiceDetails] = useState({});
    const [serviceRequestDetails, setServiceRequestDetails] = useState({
        service_id: "",
        recurring_type: "",
        title: "",
        description: "",
        reference_no: "",
    });
    const [billingInfoDetail, setBillingInfoDetails] = useState({
        holder_name: "",
        card_no: "",
        cvc: "",
        expiry_month: "",
        expiry_year: "",
        address: "",
        country: "",
        city: "",
        state: "",
        zip_code: "",
        street: "",
    });
    const [centeredModal, setCenteredModal] = useState(false)

    useEffect(() => {
        dispatch(ServiceActions.serviceDetail(service_id));
        dispatch(BillingInformationListAction.billingInformationList());
        if (serviceFetched) {
            setServiceDetails(service)
            setServiceRequestDetails({
                ...serviceRequestDetails,
                service_id: service.id
            })
        }
        if (billingInfoFetched) {
            setBillingInfoDetails(customer_billing_information)
        }
    }, [billingInfoFetched,serviceFetched]);

    const handleServiceRequestInputField = (e) => {
        setServiceRequestDetails({
            ...serviceRequestDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleBillingInfoInputField = (e) => {
        setBillingInfoDetails({
            ...billingInfoDetail,
            [e.target.name]: e.target.value
        })
    }

    const getBillingInfo = () => {
        setCenteredModal(!centeredModal)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(ServiceRequestCreateAction.serviceRequestCreate(serviceRequestDetails));
    }

    const checkBillingInfoEmpty = () => {
        if (customer_billing_information.length === 0) {
            return true;
        }
        return false;
    }

    const onSubmitBillingHandler = (e) => {
        e.preventDefault();
        dispatch(BillingInformationCreateAction.billingInformationCreate(billingInfoDetail));
        setCenteredModal(!centeredModal)
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h1>Create Service Request</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Card>
                        <CardHeader>
                            <h4>Service Request Details</h4>
                            {!serviceloading && checkBillingInfoEmpty() ? 
                                <div className='col-md-3'>
                                    <Button.Ripple color='primary' className="w-100" onClick={() => getBillingInfo(serviceDetail.id)}> Create Card +</Button.Ripple>
                                </div> : ''
                            }
                        </CardHeader>
                        <hr />
                        <CardBody>
                            {serviceloading ? <Loader /> :
                                <Form onSubmit={onSubmitHandler}>
                                    <Row>
                                        {serviceDetail.image &&
                                            <Col md='12' sm='12'>
                                                <div className="mb-2">
                                                    <img src={serviceDetail.image} max-width="100%" height="300" alt="service image" />
                                                </div>
                                            </Col>
                                        }
                                        <Col md="12" sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-4' for='select-basic'>
                                                    Service Name
                                                </Label>
                                                <p>
                                                    {serviceDetail && serviceDetail.name}
                                                </p>
                                            </div>
                                        </Col>
                                        <Col md="12" sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-4' for='select-basic'>
                                                    Service Description
                                                </Label>
                                                <p className='text-wrap'>
                                                    {serviceDetail && serviceDetail.description}
                                                </p>
                                            </div>
                                        </Col>
                                        {
                                            serviceDetail.subscription_type == "recurring" ?
                                                (
                                                    <Col md='12' sm='12'>
                                                        <div className='mb-1'>
                                                            <Label className='form-label pb-0 mb-0' for='select-basic'>
                                                                Service Subscription
                                                            </Label>
                                                            <div className='demo-inline-spacing'>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' id='sr1' value="annually" onChange={handleServiceRequestInputField} />
                                                                    <Label className='form-check-label' for='sr1'>
                                                                        {'annually - ' + serviceDetail.price_types.annually + '$'}
                                                                    </Label>
                                                                </div>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' id='sr2' value="biannually" onChange={handleServiceRequestInputField} />
                                                                    <Label className='form-check-label' for='sr2'>
                                                                        {'biannually - ' + serviceDetail.price_types.biannually + '$'}
                                                                    </Label>
                                                                </div>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' id='sr3' value="quarterly" onChange={handleServiceRequestInputField} />
                                                                    <Label className='form-check-label' for='sr3'>
                                                                        {'quarterly - ' + serviceDetail.price_types.quarterly + '$'}
                                                                    </Label>
                                                                </div>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' value="weekly" onChange={handleServiceRequestInputField} />
                                                                    <Label className='form-check-label' for='sr4'>
                                                                        {'weekly - ' + serviceDetail.price_types.weekly + '$'}
                                                                    </Label>
                                                                </div>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' id='sr5' value="monthly" onChange={handleServiceRequestInputField} defaultChecked />
                                                                    <Label className='form-check-label' for='sr5'>
                                                                        {'monthly - ' + serviceDetail.price_types.monthly + '$'}
                                                                    </Label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ) : ""
                                        }
                                        <Col md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='title'>
                                                    Title
                                                </Label>
                                                <Input type='text' value={serviceRequestDetails.title} onChange={handleServiceRequestInputField} name='title' id='title' placeholder='Enter Title' />
                                            </div>
                                        </Col>
                                        <Col md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='description'>
                                                    Description
                                                </Label>
                                                <Input type='textarea' value={serviceRequestDetails.description} onChange={handleServiceRequestInputField} name='description' id='description' placeholder='Enter Description' />
                                            </div>
                                        </Col>
                                        <Col md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='reference_no'>
                                                    Reference Number
                                                </Label>
                                                <Input type='number' value={serviceRequestDetails.reference_no} onChange={handleServiceRequestInputField} name='reference_no' id='reference_no' placeholder='Enter Reference Number' />
                                            </div>
                                        </Col>
                                        <Col md='12' sm='12'>
                                            <div className='d-flex justify-content-between'>
                                                <Button outline className='me-1' color='secondary' type='button' onClick={() => navigate(-1)}>
                                                    Cancel
                                                </Button>
                                                <Button color='primary' type='submit' disabled={createServiceRequestLoading}>
                                                    {
                                                        createServiceRequestLoading ?
                                                            <>
                                                                <Spinner color='white' size='sm' type='grow' />
                                                                <span className='ms-50'>Loading...</span>
                                                            </>
                                                            :
                                                            <span>
                                                                Create
                                                            </span>
                                                    }
                                                </Button>

                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            }
                        </CardBody>
                    </Card>
                </CardBody>
            </Card >
            {/* Billing Information modal */}
            <div className='vertically-centered-modal'>
                <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
                    <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Your Billing Information</ModalHeader>
                    <Form onSubmit={onSubmitBillingHandler}>
                        <ModalBody>
                            <Row>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='holder_name'>
                                            Holder Name
                                        </Label>
                                        <Input type='text' value={billingInfoDetail.holder_name} onChange={handleBillingInfoInputField} name='holder_name' id='holder_name' placeholder='Enter Holder Name' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='card_no'>
                                            Card Number
                                        </Label>
                                        <Input type='number' value={billingInfoDetail.card_no} onChange={handleBillingInfoInputField} name='card_no' id='card_no' placeholder='Enter Card Number' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='cvc'>
                                            CVC
                                        </Label>
                                        <Input type='number' value={billingInfoDetail.cvc} onChange={handleBillingInfoInputField} name='cvc' id='cvc' placeholder='Enter CVC' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='expiry_month'>
                                            Expiry Month
                                        </Label>
                                        <Input type='number' value={billingInfoDetail.expiry_month} onChange={handleBillingInfoInputField} name='expiry_month' id='expiry_month' placeholder='Enter Expiry Month For e.g: 12' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='expiry_year'>
                                            Expiry Year
                                        </Label>
                                        <Input type='number' value={billingInfoDetail.expiry_year} onChange={handleBillingInfoInputField} name='expiry_year' id='expiry_year' placeholder='Enter Expiry Year For e.g: 22' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='country'>
                                            Country
                                        </Label>
                                        <Input type='text' value={billingInfoDetail.country} onChange={handleBillingInfoInputField} name='country' id='country' placeholder='Enter Country' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='city'>
                                            City
                                        </Label>
                                        <Input type='text' value={billingInfoDetail.city} onChange={handleBillingInfoInputField} name='city' id='city' placeholder='Enter City' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='state'>
                                            State
                                        </Label>
                                        <Input type='text' value={billingInfoDetail.state} onChange={handleBillingInfoInputField} name='state' id='state' placeholder='Enter State' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='zip_code'>
                                            Zip Code
                                        </Label>
                                        <Input type='text' value={billingInfoDetail.zip_code} onChange={handleBillingInfoInputField} name='zip_code' id='zip_code' placeholder='Enter Zip Code' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='street'>
                                            Street Address
                                        </Label>
                                        <Input type='text' value={billingInfoDetail.street} onChange={handleBillingInfoInputField} name='street' id='street' placeholder='Enter Street Address' />
                                    </div>
                                </Col>
                                <Col md='12' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='address'>
                                            Address
                                        </Label>
                                        <Input type='textarea' value={billingInfoDetail.address} onChange={handleBillingInfoInputField} name='address' id='address' placeholder='Enter Address' />
                                    </div>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='primary' onClick={() => setCenteredModal(!centeredModal)}>
                                Cancel
                            </Button>
                            <Button color='success' type='submit' disabled={createBillingInfoLoading}>
                                {
                                    createBillingInfoLoading ?
                                        <>
                                            <Spinner color='white' size='sm' type='grow' />
                                            <span className='ms-50'>Loading...</span>
                                        </>
                                        :
                                        <span>
                                            Create
                                        </span>
                                }
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        </div >
    )
}

export default CreateServiceRequest;
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
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
import ServiceRequestCreateAction from "@store/V1/ServiceRequest/CREATE/ServiceRequestCreateAction";
import ServiceActions from "@store/V1/CustomerPortal/Service/Detail/ServiceDetailAction";

const CreateServiceRequest = () => {

    const dispatch = useDispatch();
    const { service_id } = useParams();
    const navigate = useNavigate();

    const {
        detail: { service, loading, fetched }
    } = useSelector(state => state.customer_services);

    const [serviceRequestDetails, setServiceRequestDetails] = useState({
        service_id: "",
        customer_id: "",
        recurring_type: "",
        title: "",
        description: "",
        is_recurring: false,
        selected_service: null,
    });
    const [serviceDetail, setServiceDetails] = useState({});
    const [centeredModal, setCenteredModal] = useState(false)

    useEffect(() => {
        dispatch(ServiceActions.serviceDetail(service_id));
        if (fetched) {
            setServiceDetails(service)
        }
    }, [fetched]);

    const handleInputField = (e) => {
        setServiceRequestDetails({
            ...serviceRequestDetails,
            [e.target.name]: e.target.value
        })
    }

    const getBillingInfo = (id) => {
        setCenteredModal(!centeredModal)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(ServiceRequestCreateAction.serviceRequestCreate(serviceRequestDetails));
    }

    const onSubmitBillingHandler = (e) => {
        e.preventDefault();
        dispatch(ServiceRequestCreateAction.serviceRequestCreate(serviceRequestDetails));
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
                            <div className='col-md-3'>
                                <Button.Ripple color='primary' className="w-100" onClick={() => getBillingInfo(serviceDetail.id)}>Billing Information</Button.Ripple>                            </div>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            {loading ? 'Loading...' :
                                <Form onSubmit={onSubmitHandler}>
                                    <Row>
                                        {serviceDetail.image &&
                                            <Col md='12' sm='12'>
                                                <div>
                                                    <img src={serviceDetail.image} width="100%" height="200" alt="service image" />
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
                                                                    <Input type='radio' name='recurring_type' id='sr1' value="annually" onChange={handleInputField} />
                                                                    <Label className='form-check-label' for='sr1'>
                                                                        {'annually - ' + serviceDetail.price_types.annually + '$'}
                                                                    </Label>
                                                                </div>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' id='sr2' value="biannually" onChange={handleInputField} />
                                                                    <Label className='form-check-label' for='sr2'>
                                                                        {'biannually - ' + serviceDetail.price_types.biannually + '$'}
                                                                    </Label>
                                                                </div>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' id='sr3' value="quarterly" onChange={handleInputField} />
                                                                    <Label className='form-check-label' for='sr3'>
                                                                        {'quarterly - ' + serviceDetail.price_types.quarterly + '$'}
                                                                    </Label>
                                                                </div>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' value="weekly" onChange={handleInputField} />
                                                                    <Label className='form-check-label' for='sr4'>
                                                                        {'weekly - ' + serviceDetail.price_types.weekly + '$'}
                                                                    </Label>
                                                                </div>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' id='sr5' value="monthly" onChange={handleInputField} defaultChecked />
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
                                                <Label className='form-label' for='nameMulti'>
                                                    Title
                                                </Label>
                                                <Input type='text' value={serviceRequestDetails.title} onChange={handleInputField} name='title' id='title' placeholder='Enter Title' />
                                            </div>
                                        </Col>
                                        <Col md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='nameMulti'>
                                                    Description
                                                </Label>
                                                <Input type='textarea' value={serviceRequestDetails.description} onChange={handleInputField} name='description' id='description' placeholder='Enter Description' />
                                            </div>
                                        </Col>
                                        <Col md='12' sm='12'>
                                            <div className='d-flex justify-content-between'>
                                                <Button outline className='me-1' color='secondary' type='button' onClick={() => navigate(-1)}>
                                                    Cancel
                                                </Button>
                                                <Button color='primary' type='submit' disabled={loading}>
                                                    {
                                                        loading ?
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
                                        <Label className='form-label' for='nameMulti'>
                                            Invoice To
                                        </Label>
                                        <Input type='text' value={serviceRequestDetails.title} onChange={handleInputField} name='invoice_to' id='invoice_to' placeholder='Enter Invoice to' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nameMulti'>
                                            Country
                                        </Label>
                                        <Input type='text' value={serviceRequestDetails.title} onChange={handleInputField} name='country' id='country' placeholder='Enter Country' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nameMulti'>
                                            City
                                        </Label>
                                        <Input type='text' value={serviceRequestDetails.title} onChange={handleInputField} name='city' id='city' placeholder='Enter City' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nameMulti'>
                                            State
                                        </Label>
                                        <Input type='text' value={serviceRequestDetails.title} onChange={handleInputField} name='state' id='state' placeholder='Enter State' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nameMulti'>
                                            Zip Code
                                        </Label>
                                        <Input type='text' value={serviceRequestDetails.title} onChange={handleInputField} name='zip_code' id='zip_code' placeholder='Enter Zip Code' />
                                    </div>
                                </Col>
                                <Col md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nameMulti'>
                                            Tax Code
                                        </Label>
                                        <Input type='text' value={serviceRequestDetails.title} onChange={handleInputField} name='tax_code' id='tax_code' placeholder='Enter Tax Code' />
                                    </div>
                                </Col>
                                <Col md='12' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nameMulti'>
                                            Address
                                        </Label>
                                        <Input type='textarea' value={serviceRequestDetails.title} onChange={handleInputField} name='address' id='address' placeholder='Enter Address' />
                                    </div>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='primary' onClick={() => setCenteredModal(!centeredModal)}>
                                Cancel
                            </Button>
                            <Button color='success'>
                                Update
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        </div >
    )
}

export default CreateServiceRequest;
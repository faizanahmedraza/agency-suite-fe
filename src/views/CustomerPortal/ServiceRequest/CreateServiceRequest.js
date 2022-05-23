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
} from 'reactstrap'
import { useDispatch, useSelector } from '@store/store'
import ServiceRequestCreateAction from "@store/V1/CustomerPortal/ServiceRequest/CREATE/ServiceRequestCreateAction";
import ServiceActions from "@store/V1/CustomerPortal/Service/Detail/ServiceDetailAction";
import BillingInformationListAction from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListAction";
import CardInfoModal from '@src/views/CustomerPortal/Billing/CardInfoModal';

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
        customer_billing_information: { list: { customer_billing_information }}
    } = useSelector(state => state);

    const [serviceDetail, setServiceDetails] = useState({});
    const [serviceRequestDetails, setServiceRequestDetails] = useState({
        service_id: "",
        recurring_type: "",
        title: "",
        description: "",
        reference_no: "",
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
    }, [serviceFetched]);

    const handleServiceRequestInputField = (e) => {
        setServiceRequestDetails({
            ...serviceRequestDetails,
            [e.target.name]: e.target.value
        })
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

    const cardToggleModal = () => {
        setCenteredModal(!centeredModal);
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
                                    <Button.Ripple color='primary' className="w-100" onClick={cardToggleModal}> Create Card +</Button.Ripple>
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
                                                <Label className='form-label fs-5' for='select-basic'>
                                                    Service Name
                                                </Label>
                                                <p>
                                                    {serviceDetail && serviceDetail.name}
                                                </p>
                                            </div>
                                        </Col>
                                        <Col md="12" sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-5' for='select-basic'>
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
                                                            <Label className='form-label fs-5 pb-0 mb-0' for='select-basic'>
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
                                                <Label className='form-label fs-5' for='title'>
                                                    Title
                                                </Label>
                                                <Input type='text' value={serviceRequestDetails.title} onChange={handleServiceRequestInputField} name='title' id='title' placeholder='Enter Title' />
                                            </div>
                                        </Col>
                                        <Col md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-5' for='description'>
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
            <CardInfoModal onShow={centeredModal} onHide={cardToggleModal}/>
        </div >
    )
}

export default CreateServiceRequest;
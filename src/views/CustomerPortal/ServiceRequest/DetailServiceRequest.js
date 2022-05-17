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

const DetailServiceRequest = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        customer_service_requests: { detail: { serivice_request, loading, fetched } },
    } = useSelector(state => state);

    const [serviceRequestDetails, setServiceRequestDetails] = useState({
          service: {
            id: "",
            name: "",
            description: "",
            image: "",
            price_types: {
              weekly: "",
              monthly: "",
              quarterly: "",
              biannually: "",
              annually: "",
              price: "",
            }
          },
          intake_form: {
            title: null,
            description: null
          },
          is_recurring: false,
          recurring_type: "",
          status: "",
          invoices: []
    });

    useEffect(() => {
        dispatch(ServiceRequestDetailAction.serviceRequestDetail(id));
        if (fetched) {
            setServiceRequestDetails(serivice_request)
        }
    }, [fetched]);

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h1>Service Request Details</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Card>
                        <CardHeader>
                            <h4>Service Request Details</h4>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            {loading ? <Loader/> :
                                    <Row>
                                        {serviceRequestDetails?.service?.image &&
                                            <Col md='12' sm='12'>
                                                <div className="mb-2">
                                                    <img src={serviceRequestDetails?.service?.image} max-width="100%" height="300" alt="service image" />
                                                </div>
                                            </Col>
                                        }
                                        <Col md="12" sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-4' for='select-basic'>
                                                    Service Name
                                                </Label>
                                                <p>
                                                    {serviceRequestDetails && serviceRequestDetails?.service?.name}
                                                </p>
                                            </div>
                                        </Col>
                                        <Col md="12" sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-4' for='select-basic'>
                                                    Service Description
                                                </Label>
                                                <p className='text-wrap'>
                                                    {serviceRequestDetails && serviceRequestDetails?.service?.description}
                                                </p>
                                            </div>
                                        </Col>
                                        {
                                            serviceRequestDetails?.service?.subscription_type == "recurring" ?
                                                (
                                                    <Col md='12' sm='12'>
                                                        <div className='mb-1'>
                                                            <Label className='form-label pb-0 mb-0' for='select-basic'>
                                                                Service Subscription
                                                            </Label>
                                                            <div className='demo-inline-spacing'>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' id='sr1' value="annually" defaultChecked={serviceRequestDetails?.recurring_type === "annually"} disabled />
                                                                    <Label className='form-check-label' for='sr1'>
                                                                        {'annually - ' + serviceRequestDetails?.service?.price_types.annually + '$'}
                                                                    </Label>
                                                                </div>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' id='sr2' value="biannually" defaultChecked={serviceRequestDetails?.recurring_type === "biannually"} disabled />
                                                                    <Label className='form-check-label' for='sr2'>
                                                                        {'biannually - ' + serviceRequestDetails?.service?.price_types.biannually + '$'}
                                                                    </Label>
                                                                </div>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' id='sr3' value="quarterly" defaultChecked={serviceRequestDetails?.recurring_type === "quarterly"} disabled />
                                                                    <Label className='form-check-label' for='sr3'>
                                                                        {'quarterly - ' + serviceRequestDetails?.service?.price_types.quarterly + '$'}
                                                                    </Label>
                                                                </div>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' value="weekly" defaultChecked={serviceRequestDetails?.recurring_type === "weekly"} disabled />
                                                                    <Label className='form-check-label' for='sr4'>
                                                                        {'weekly - ' + serviceRequestDetails?.service?.price_types.weekly + '$'}
                                                                    </Label>
                                                                </div>
                                                                <div className='form-check'>
                                                                    <Input type='radio' name='recurring_type' id='sr5' value="monthly" defaultChecked={serviceRequestDetails?.recurring_type === "monthly"} disabled />
                                                                    <Label className='form-check-label' for='sr5'>
                                                                        {'monthly - ' + serviceRequestDetails?.service?.price_types.monthly + '$'}
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
                                                <Input type='text' value={serviceRequestDetails?.intake_form[0]?.title} name='title' id='title' placeholder='Enter Title' readOnly/>
                                            </div>
                                        </Col>
                                        <Col md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='description'>
                                                    Description
                                                </Label>
                                                <Input type='textarea' value={serviceRequestDetails?.intake_form[0]?.description} name='description' id='description' placeholder='Enter Description' readOnly/>
                                            </div>
                                        </Col>
                                        {/* <Col md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='reference_no'>
                                                    Reference Number
                                                </Label>
                                                <Input type='number' value={serviceRequestDetails.reference_no} name='reference_no' id='reference_no' placeholder='Enter Reference Number' />
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

export default DetailServiceRequest;
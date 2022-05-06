import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from '@store/store';
import ServiceRequestDetailAction from "@store/V1/ServiceRequest/DETAIL/ServiceRequestDetailAction";

import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Form,
    CardHeader,
    Button,
} from 'reactstrap';

const Loader = () => {
    return (
        <div className='d-flex justify-content-center'><strong>Loading...</strong></div>
    );
}

const pointerStyle = {
    cursor: "pointer"
}

const DetailServiceRequest = () => {

    const {
        customer_service_request, loading, fetched
    } = useSelector(state => state.service_requests.detail);

    const [serviceRequestDetails, setServiceRequestDetails] = useState({
        service_id: "",
        customer_id: "",
        recurring_type: "",
        title: "",
        description: "",
        is_recurring: false,
        selected_service: null,
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(ServiceRequestDetailAction.serviceRequestDetail(id));
        if (fetched) {
            setServiceRequestDetails(customer_service_request)
        }
    }, [fetched]);

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-4'>
                            <h1>Service Request</h1>
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
                            <Form>
                                <Row>
                                    <Col md="6" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='select-basic'>
                                                Customer
                                            </Label>
                                            <Link
                                                to={`/customers/edit/${serviceRequestDetails?.customer?.id}`}
                                            >
                                                <Input type='text' name='customer' id='' defaultValue={serviceRequestDetails?.service?.name} readOnly style={pointerStyle}/>
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col md="6" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='select-basic'>
                                                Service
                                            </Label>
                                            <Link
                                                to={`/services/edit/${serviceRequestDetails?.service?.id}`}
                                            >
                                                <Input type='text' name='service' id='' defaultValue={serviceRequestDetails?.service?.name} readOnly style={pointerStyle}/>
                                            </Link>
                                        </div>
                                    </Col>
                                    {
                                        serviceRequestDetails?.is_recurring ?
                                            (
                                                <Col md='12' sm='12'>
                                                    <div className='mb-1'>
                                                        <Label className='form-label pb-0 mb-0' for='select-basic'>
                                                            Service Subscription
                                                        </Label>
                                                        <div className='demo-inline-spacing'>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr1' defaultValue="annualy" checked={serviceRequestDetails?.recurring_type === "annualy"} disabled />
                                                                <Label className='form-check-label' for='sr1'>
                                                                    {'annualy - ' + serviceRequestDetails?.service?.price_types?.annually + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr2' defaultValue="biannually" checked={serviceRequestDetails?.recurring_type === "biannually"} disabled />
                                                                <Label className='form-check-label' for='sr2'>
                                                                    {'biannually - ' + serviceRequestDetails?.service?.price_types?.biannually + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr3' defaultValue="quarterly" checked={serviceRequestDetails?.recurring_type === "quarterly"} disabled />
                                                                <Label className='form-check-label' for='sr3'>
                                                                    {'quarterly - ' + serviceRequestDetails?.service?.price_types?.quarterly + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' defaultValue="weekly" checked={serviceRequestDetails?.recurring_type === "weekly"} disabled />
                                                                <Label className='form-check-label' for='sr4'>
                                                                    {'weekly - ' + serviceRequestDetails?.service?.price_types?.weekly + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr5' defaultValue="monthly" checked={serviceRequestDetails?.recurring_type === "monthly"} disabled />
                                                                <Label className='form-check-label' for='sr5'>
                                                                    {'monthly - ' + serviceRequestDetails?.service?.price_types?.monthly + '$'}
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
                                            <Input type='text' defaultValue={serviceRequestDetails?.intake_form?.title} name='title' id='title' placeholder='Enter Title' readOnly />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Description
                                            </Label>
                                            <Input type='textarea' defaultValue={serviceRequestDetails?.intake_form?.description} name='description' id='description' placeholder='Enter Description' readOnly />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='d-flex justify-content-between'>
                                            <Button outline className='me-1' color='secondary' type='button' onClick={() => navigate(-1)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>

        </div>
    )
}

export default DetailServiceRequest;
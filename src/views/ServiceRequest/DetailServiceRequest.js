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
        serivice_request, loading, fetched
    } = useSelector(state => state.service_requests.detail);

    const [serviceRequestDetails, setServiceRequestDetails] = useState({
        customer: {
            id: null,
            first_name: null,
            last_name: null,
        },
        service: {
            id: null,
            name: null,
            price_types: {
                weekly: null,
                monthly: null,
                quarterly: null,
                biannually: null,
                annually: null,
                price: null,
                purchase_limit: null
            }
        },
        recurring_type: null,
        is_recurring: false,
        intake_form: {
            title: null,
            description: null
        },
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

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
                        <div className='col-md-12'>
                            <h1>Service Request Details</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    {loading ? <Loader /> : <>
                        <Form>
                            <Row>
                                <Col md="6" sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='select-basic'>
                                            Customer
                                        </Label>
                                        <Link
                                            to={`/customers/edit/${serviceRequestDetails?.customer?.id}`}
                                        >
                                            <Input type='text' name='customer' id='' defaultValue={serviceRequestDetails?.customer?.first_name} readOnly style={pointerStyle} />
                                        </Link>
                                    </div>
                                </Col>
                                <Col md="6" sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='select-basic'>
                                            Service Name
                                        </Label>
                                        <Link
                                            to={`/services/edit/${serviceRequestDetails?.service?.id}`}
                                        >
                                            <Input type='text' name='service' id='' defaultValue={serviceRequestDetails?.service?.name} readOnly style={pointerStyle} />
                                        </Link>
                                    </div>
                                </Col>
                                <Col md="12" sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='description'>
                                            Service Description
                                        </Label>
                                        <Input type='textarea' name='description' id='description' defaultValue={serviceRequestDetails?.service?.description} readOnly style={pointerStyle} />
                                    </div>
                                </Col>
                            </Row>
                            {
                                serviceRequestDetails?.is_recurring ?
                                    (
                                        <Row>
                                            <Col md='12' sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label fs-5 pb-0 mb-0' for='select-basic'>
                                                        Service Subscription
                                                    </Label>
                                                    <div className='demo-inline-spacing'>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr1' defaultChecked={serviceRequestDetails?.recurring_type === "annually"} disabled />
                                                            <Label className='form-check-label fs-5' for='sr1'>
                                                                {'annualy - $' + Number.parseFloat(serviceRequestDetails?.service?.price_types?.annually).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr2' defaultValue="biannually" defaultChecked={serviceRequestDetails?.recurring_type === "biannually"} disabled />
                                                            <Label className='form-check-label fs-5' for='sr2'>
                                                                {'biannually - $' + Number.parseFloat(serviceRequestDetails?.service?.price_types?.biannually).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr3' defaultValue="quarterly" defaultChecked={serviceRequestDetails?.recurring_type === "quarterly"} disabled />
                                                            <Label className='form-check-label fs-5' for='sr3'>
                                                                {'quarterly - $' + Number.parseFloat(serviceRequestDetails?.service?.price_types?.quarterly).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' defaultValue="weekly" defaultChecked={serviceRequestDetails?.recurring_type === "weekly"} disabled />
                                                            <Label className='form-check-label fs-5' for='sr4'>
                                                                {'weekly - $' + Number.parseFloat(serviceRequestDetails?.service?.price_types?.weekly).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr5' defaultValue="monthly" defaultChecked={serviceRequestDetails?.recurring_type === "monthly"} disabled />
                                                            <Label className='form-check-label fs-5' for='sr5'>
                                                                {'monthly - $' + Number.parseFloat(serviceRequestDetails?.service?.price_types?.monthly).toFixed(2)}
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
                                                    Price
                                                </Label>
                                                <p className='text-wrap'>
                                                    ${Number.parseFloat(serviceRequestDetails?.service?.price_types?.price).toFixed(2)}
                                                </p>
                                            </div>
                                        </Col>
                                        <Col md='4' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-5' for='select-basic'>
                                                    Purchase Limit
                                                </Label>
                                                <p className='text-wrap'>
                                                    {serviceRequestDetails?.service?.price_types?.purchase_limit ?? "---"}
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    )
                            }
                            <Row>
                                <Col md='12' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='nameMulti'>
                                            Intake Title
                                        </Label>
                                        <Input type='text' defaultValue={serviceRequestDetails?.intake_form[0]?.title} name='title' id='title' placeholder='Enter Title' readOnly />
                                    </div>
                                </Col>
                                <Col md='12' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='nameMulti'>
                                            Intake Description
                                        </Label>
                                        <Input type='textarea' defaultValue={serviceRequestDetails?.intake_form[0]?.description} name='description' id='description' placeholder='Enter Description' readOnly />
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
                    </>}
                </CardBody>
            </Card>

        </div >
    )
}

export default DetailServiceRequest;
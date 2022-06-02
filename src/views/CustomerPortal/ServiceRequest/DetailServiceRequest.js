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

    useEffect(() => {
        dispatch(ServiceRequestDetailAction.serviceRequestDetail(id));
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
                    {loading ? <Loader /> : <>
                        <Row>
                            {serivice_request?.service?.image &&
                                <Col md='12' sm='12'>
                                    <div className="mb-2">
                                        <img src={serivice_request?.service?.image} max-width="100%" height="300" alt="service image" />
                                    </div>
                                </Col>
                            }
                            <Col md="12" sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label fs-5' for='select-basic'>
                                        Service Name
                                    </Label>
                                    <p>
                                        {serivice_request && serivice_request?.service?.name}
                                    </p>
                                </div>
                            </Col>
                            <Col md="12" sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label fs-5' for='select-basic'>
                                        Service Description
                                    </Label>
                                    <p className='text-wrap'>
                                        {serivice_request && serivice_request?.service?.description}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        {
                            serivice_request?.service?.subscription_type === "recurring" ?
                                (
                                    <Row>
                                        <Col md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-5 pb-0 mb-0' for='select-basic'>
                                                    Service Subscription
                                                </Label>
                                                <div className='demo-inline-spacing'>
                                                    <div className='form-check'>
                                                        <Input type='radio' name='recurring_type' id='sr1' value="annually" defaultChecked={serivice_request?.recurring_type === "annually"} disabled />
                                                        <Label className='form-check-label fs-5' for='sr1'>
                                                            {'annually - $' + Number.parseFloat(serivice_request?.service?.price_types.annually).toFixed(2)}
                                                        </Label>
                                                    </div>
                                                    <div className='form-check'>
                                                        <Input type='radio' name='recurring_type' id='sr2' value="biannually" defaultChecked={serivice_request?.recurring_type === "biannually"} disabled />
                                                        <Label className='form-check-label fs-5' for='sr2'>
                                                            {'biannually - $' + Number.parseFloat(serivice_request?.service?.price_types.biannually).toFixed(2)}
                                                        </Label>
                                                    </div>
                                                    <div className='form-check'>
                                                        <Input type='radio' name='recurring_type' id='sr3' value="quarterly" defaultChecked={serivice_request?.recurring_type === "quarterly"} disabled />
                                                        <Label className='form-check-label fs-5' for='sr3'>
                                                            {'quarterly - $' + Number.parseFloat(serivice_request?.service?.price_types.quarterly).toFixed(2)}
                                                        </Label>
                                                    </div>
                                                    <div className='form-check'>
                                                        <Input type='radio' name='recurring_type' value="weekly" defaultChecked={serivice_request?.recurring_type === "weekly"} disabled />
                                                        <Label className='form-check-label fs-5' for='sr4'>
                                                            {'weekly - $' + Number.parseFloat(serivice_request?.service?.price_types.weekly).toFixed(2)}
                                                        </Label>
                                                    </div>
                                                    <div className='form-check'>
                                                        <Input type='radio' name='recurring_type' id='sr5' value="monthly" defaultChecked={serivice_request?.recurring_type === "monthly"} disabled />
                                                        <Label className='form-check-label fs-5' for='sr5'>
                                                            {'monthly - $' + Number.parseFloat(serivice_request?.service?.price_types.monthly).toFixed(2)}
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
                                                    Subscription Type: one-off
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
                                                    ${Number.parseFloat(serivice_request?.service?.price_types?.price).toFixed(2)}
                                                </p>
                                            </div>
                                        </Col>
                                        <Col md='4' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-5' for='select-basic'>
                                                    Purchase Limit
                                                </Label>
                                                <p className='text-wrap'>
                                                    {serivice_request?.service?.price_types?.purchase_limit ?? "---"}
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
                                    <Input type='text' value={serivice_request?.intake_form[0]?.title} name='title' id='title' placeholder='Enter Title' readOnly />
                                </div>
                            </Col>
                            <Col md='12' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label fs-5' for='description'>
                                        Intake Description
                                    </Label>
                                    <Input type='textarea' value={serivice_request?.intake_form[0]?.description} name='description' id='description' placeholder='Enter Description' readOnly />
                                </div>
                            </Col>
                            {/* <Col md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='reference_no'>
                                                    Reference Number
                                                </Label>
                                                <Input type='number' value={serivice_request.reference_no} name='reference_no' id='reference_no' placeholder='Enter Reference Number' />
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
                    </>}
                </CardBody>
            </Card >
        </div >
    )
}

export default DetailServiceRequest;
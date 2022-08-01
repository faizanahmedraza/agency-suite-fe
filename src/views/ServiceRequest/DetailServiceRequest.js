import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from '@store/store';
import ServiceRequestDetailAction from "@store/V1/ServiceRequest/DETAIL/ServiceRequestDetailAction";
import draftToHtml from 'draftjs-to-html';

import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Form,
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

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (!fetched || Number(id) != Number(serivice_request.id)) {
            dispatch(ServiceRequestDetailAction.serviceRequestDetail(id));
        }
    }, [fetched]);

    function descriptionConversion(str) {
        if (str) {
            const hashConfig = {
                trigger: '#',
                separator: ' ',
            }
            return draftToHtml(JSON.parse(str), hashConfig)
        }
    }

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
                                            to={`/customers/edit/${serivice_request?.customer?.id}`}
                                        >
                                            <Input type='text' name='customer' id='' defaultValue={serivice_request?.customer?.first_name} readOnly style={pointerStyle} />
                                        </Link>
                                    </div>
                                </Col>
                                <Col md="6" sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='select-basic'>
                                            Service Name
                                        </Label>
                                        <Link
                                            to={`/services/edit/${serivice_request?.service?.id}`}
                                        >
                                            <Input type='text' name='service' id='' defaultValue={serivice_request?.service?.name} readOnly style={pointerStyle} />
                                        </Link>
                                    </div>
                                </Col>
                                <Col md="12" sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='description'>
                                            Service Description
                                        </Label>
                                        <p className='text-wrap' contentEditable='false' dangerouslySetInnerHTML={{ __html: descriptionConversion(serivice_request?.service?.description) }}></p>
                                    </div>
                                </Col>
                            </Row>
                            {
                                serivice_request?.is_recurring ?
                                    (
                                        <Row>
                                            <Col md='12' sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label fs-5 pb-0 mb-0' for='select-basic'>
                                                        Service Subscription
                                                    </Label>
                                                    <div className='demo-inline-spacing'>
                                                        {serivice_request.service.price_types.weekly ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' defaultValue="weekly" defaultChecked={serivice_request?.recurring_type === "weekly"} disabled />
                                                                <Label className='form-check-label fs-5' for='sr4'>
                                                                    {'weekly - $' + Number.parseFloat(serivice_request?.service?.price_types?.weekly).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            : ""}
                                                        {serivice_request.service.price_types.monthly ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr5' defaultValue="monthly" defaultChecked={serivice_request?.recurring_type === "monthly"} disabled />
                                                                <Label className='form-check-label fs-5' for='sr5'>
                                                                    {'monthly - $' + Number.parseFloat(serivice_request?.service?.price_types?.monthly).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            : ""}
                                                        {serivice_request.service.price_types.quarterly ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr3' defaultValue="quarterly" defaultChecked={serivice_request?.recurring_type === "quarterly"} disabled />
                                                                <Label className='form-check-label fs-5' for='sr3'>
                                                                    {'quarterly - $' + Number.parseFloat(serivice_request?.service?.price_types?.quarterly).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            : ""}
                                                        {serivice_request.service.price_types.biannually ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr2' defaultValue="biannually" defaultChecked={serivice_request?.recurring_type === "biannually"} disabled />
                                                                <Label className='form-check-label fs-5' for='sr2'>
                                                                    {'biannually - $' + Number.parseFloat(serivice_request?.service?.price_types?.biannually).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            : ""}
                                                        {serivice_request.service.price_types.annually ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr1' defaultChecked={serivice_request?.recurring_type === "annually"} disabled />
                                                                <Label className='form-check-label fs-5' for='sr1'>
                                                                    {'annually - $' + Number.parseFloat(serivice_request?.service?.price_types?.annually).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            : ""}
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
                                                        ${Number.parseFloat(serivice_request?.service?.price_types?.price ?? 0).toFixed(2)}
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
                                        <Label className='form-label fs-5' for='nameMulti'>
                                            Intake Title
                                        </Label>
                                        <p className='text-wrap'>{serivice_request?.intake_form[0]?.title}</p>
                                    </div>
                                </Col>
                                <Col md='12' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='nameMulti'>
                                            Intake Description
                                        </Label>
                                        <p className='text-wrap' contentEditable='false' dangerouslySetInnerHTML={{ __html: descriptionConversion(serivice_request?.intake_form[0]?.description) }}></p>
                                    </div>
                                </Col>
                                <Col md='12' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='quantity'>
                                            Quantity
                                        </Label>
                                        <Input type='text' value={serivice_request?.quantity} name='quantity' id='quantity' readOnly />
                                    </div>
                                </Col>
                                <Col md='12' sm='12'>
                                    <Link to="/service-requests" className='btn btn-outline-secondary'>
                                        Cancel
                                    </Link>
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
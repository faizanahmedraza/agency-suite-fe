import React, { useState, useEffect } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import EditorComponent from "@src/Components/EditorComponent";
import { useParams, Link } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Form,
    Button,
    Spinner,
} from 'reactstrap'
import { useDispatch, useSelector } from '@store/store'
import ServiceRequestCreateAction from "@store/V1/CustomerPortal/ServiceRequest/CREATE/ServiceRequestCreateAction";
import ServiceActions from "@store/V1/CustomerPortal/Service/Detail/ServiceDetailAction";
import BillingInformationListAction from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListAction";
import CardInfoModal from '@src/views/CustomerPortal/Billing/CardInfoModal';
import Loader from '@src/views/GrowLoader';
import draftToHtml from 'draftjs-to-html';

const CreateServiceRequest = () => {

    const dispatch = useDispatch();
    const { service_id } = useParams();
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const {
        customer_services: { detail: { service, loading: serviceloading, fetched: serviceFetched } },
        customer_service_requests: { create: { loading: createServiceRequestLoading } },
        customer_billing_information: {
            list: { customer_billing_information, loading: billingInfoLoading, fetched: billingInfoFetched },
            create: { success }
        }
    } = useSelector(state => state);

    const [serviceRequestDetails, setServiceRequestDetails] = useState({
        service_id: "",
        recurring_type: "",
        title: "",
        description: "",
        quantity: ""
    });

    const [isOpenModal, setIsOpenModal] = useState(false)

    useEffect(() => {
        if (!serviceFetched) return dispatch(ServiceActions.serviceDetail(service_id));

        if (serviceFetched) {
            setServiceRequestDetails({
                ...serviceRequestDetails,
                service_id: service.id
            })
        }
    }, [serviceFetched]);

    useEffect(() => {
        if (!billingInfoFetched || success) return dispatch(BillingInformationListAction.billingInformationList());
    }, [billingInfoFetched, success]);

    useEffect(() => {
        return () => {
            setIsOpenModal(false)
        };
    }, []);

    const descriptionSaveContent = (content) => {
        setServiceRequestDetails({
            ...serviceRequestDetails,
            description: JSON.stringify(convertToRaw(content)),
        });
    }

    const onEditorStateChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        descriptionSaveContent(contentState);
        setEditorState(editorState);
    };

    const handleServiceRequestInputField = (e) => {
        setServiceRequestDetails({
            ...serviceRequestDetails,
            [e.target.name]: e.target.value
        })
    }

    const getEditorValue = (value) => {
        setServiceDetails({
            ...serviceDetails,
            description: value,
        });
    };
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

    const setModalIsOpenToTrue = () => {
        setIsOpenModal(true)
    }

    const setModalIsOpenToFalse = () => {
        setIsOpenModal(false)
    }

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
                    <div>
                        <div className="row">
                            <div className="col-9">
                                <h1>Create Service Request</h1>
                            </div>
                            <div className='col-3'>
                                {!billingInfoLoading && checkBillingInfoEmpty() ?
                                    <Button.Ripple color='primary' className="w-100" onClick={setModalIsOpenToTrue}> Add Payment Method </Button.Ripple> : ''
                                }
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    {serviceloading ? <Loader /> :
                        <Form onSubmit={onSubmitHandler}>
                            <Row>
                                {service.image &&
                                    <Col md='12' sm='12'>
                                        <div className="mb-2">
                                            <img src={service.image} max-width="100%" height="300" alt="service image" />
                                        </div>
                                    </Col>
                                }
                                <Col md="12" sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='select-basic'>
                                            Service Name
                                        </Label>
                                        <p>
                                            {service && service.name}
                                        </p>
                                    </div>
                                </Col>
                                <Col md="12" sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='select-basic'>
                                            Service Description
                                        </Label>
                                        <p className='text-wrap' contentEditable='false' dangerouslySetInnerHTML={{ __html: descriptionConversion(service.description) }}></p>
                                    </div>
                                </Col>
                            </Row>
                            {
                                service.subscription_type === "recurring" ?
                                    (
                                        <Row>
                                            <Col md='12' sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label fs-5 pb-0 mb-0' for='select-basic'>
                                                        Service Subscription
                                                    </Label>
                                                    <div className='demo-inline-spacing'>
                                                        {service.price_types.weekly ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' value="weekly" onChange={handleServiceRequestInputField} />
                                                                <Label className='form-check-label fs-5' for='sr4'>
                                                                    {'weekly - $' + Number.parseFloat(service.price_types.weekly ?? 0).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            : ""}
                                                        {service.price_types.monthly ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr5' value="monthly" onChange={handleServiceRequestInputField} defaultChecked />
                                                                <Label className='form-check-label fs-5' for='sr5'>
                                                                    {'monthly - $' + Number.parseFloat(service.price_types.monthly ?? 0).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            : ""}
                                                        {service.price_types.quarterly ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr3' value="quarterly" onChange={handleServiceRequestInputField} />
                                                                <Label className='form-check-label fs-5' for='sr3'>
                                                                    {'quarterly - $' + Number.parseFloat(service.price_types.quarterly ?? 0).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            : ""}
                                                        {service.price_types.biannually ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr2' value="biannually" onChange={handleServiceRequestInputField} />
                                                                <Label className='form-check-label fs-5' for='sr2'>
                                                                    {'biannually - $' + Number.parseFloat(service.price_types.biannually ?? 0).toFixed(2)}
                                                                </Label>
                                                            </div>
                                                            : ""}
                                                        {service.price_types.annually ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr1' value="annually" onChange={handleServiceRequestInputField} />
                                                                <Label className='form-check-label fs-5' for='sr1'>
                                                                    {'annually - $' + Number.parseFloat(service.price_types.annually ?? 0).toFixed(2)}
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
                                                        ${Number.parseFloat(service?.price_types?.price ?? 0).toFixed(2)}
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col md='4' sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label fs-5' for='select-basic'>
                                                        Purchase Limit
                                                    </Label>
                                                    <p className='text-wrap'>
                                                        {service?.price_types?.purchase_limit ?? "---"}
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
                                            Title
                                        </Label>
                                        <Input type='text' value={serviceRequestDetails.title ?? ""} onChange={handleServiceRequestInputField} name='title' id='title' placeholder='Enter Title' />
                                    </div>
                                </Col>
                                <Col md='12' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='description'>
                                            Description
                                        </Label>
                                        <div>
                                            <EditorComponent
                                                editorState={editorState}
                                                onEditorStateChange={onEditorStateChange}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md='12' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label fs-5' for='select-basic'>
                                            Quantity
                                        </Label>
                                        <Input type='number' value={serviceRequestDetails.quantity ?? ""} onChange={handleServiceRequestInputField} name='quantity' id='quantity' placeholder='Enter Quantity' />
                                    </div>
                                </Col>
                                <Col md='12' sm='12'>
                                    <div className='d-flex justify-content-between'>
                                        <Link to="/customer-service-requests" className='btn btn-outline-secondary'>
                                            Cancel
                                        </Link>
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
            </Card >
            {/* Billing Information modal */}
            <CardInfoModal isOpenModal={isOpenModal} hideModal={setModalIsOpenToFalse} />
        </div >
    )
}

export default CreateServiceRequest;
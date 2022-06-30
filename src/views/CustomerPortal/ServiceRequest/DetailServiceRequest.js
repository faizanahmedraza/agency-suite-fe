import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import EditorComponent from "@src/Components/EditorComponent";
import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import { useDispatch, useSelector } from '@store/store'
import ServiceRequestDetailAction from "@store/V1/CustomerPortal/ServiceRequest/DETAIL/ServiceRequestDetailAction";
import ServiceRequestCancelAction from "@store/V1/CustomerPortal/ServiceRequest/CANCEL/CancelAction";

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
    const [cancelModal, setCancelModal] = useState(false);

    const {
        customer_service_requests: {
            detail: { serivice_request, loading, fetched },
        },
    } = useSelector(state => state);

    useEffect(() => {
        dispatch(ServiceRequestDetailAction.serviceRequestDetail(id));
    }, [fetched]);

    const onSubmitCancelModal = () => {
        dispatch(ServiceRequestCancelAction.cancelServiceRequest(id));
    }

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
                                                            <Input type='radio' name='recurring_type' value="weekly" onChange={handleServiceRequestInputField} />
                                                            <Label className='form-check-label fs-5' for='sr4'>
                                                                {'weekly - $' + Number.parseFloat(service.price_types.weekly ?? 0).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr5' value="monthly" onChange={handleServiceRequestInputField} defaultChecked />
                                                            <Label className='form-check-label fs-5' for='sr5'>
                                                                {'monthly - $' + Number.parseFloat(service.price_types.monthly ?? 0).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr3' value="quarterly" onChange={handleServiceRequestInputField} />
                                                            <Label className='form-check-label fs-5' for='sr3'>
                                                                {'quarterly - $' + Number.parseFloat(service.price_types.quarterly ?? 0).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr2' value="biannually" onChange={handleServiceRequestInputField} />
                                                            <Label className='form-check-label fs-5' for='sr2'>
                                                                {'biannually - $' + Number.parseFloat(service.price_types.biannually ?? 0).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr1' value="annually" onChange={handleServiceRequestInputField} />
                                                            <Label className='form-check-label fs-5' for='sr1'>
                                                                {'annually - $' + Number.parseFloat(service.price_types.annually ?? 0).toFixed(2)}
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
                                    <EditorComponent
                                            serviceDetails={serivice_request?.intake_form[0]}
                                            getEditorValue={getEditorValue}
                                            id='description'
                                            readOnly
                                        />
                                    {/* <Input type='textarea' value={serivice_request?.intake_form[0]?.description} name='description' id='description' placeholder='Enter Description' readOnly /> */}
                                </div>
                            </Col>
                            <Col md='12' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label fs-5' for='status'>
                                        Status
                                    </Label>
                                    <Input type='text' value={serivice_request?.status} name='status' id='status' readOnly />
                                </div>
                            </Col>
                            <Col md='12' sm='12'>
                                <div className='d-flex justify-content-between'>
                                    <Link to="/customer-service-requests" className='btn btn-outline-secondary'>
                                        Back
                                    </Link>
                                    {
                                        (serivice_request.status !== "cancelled" && serivice_request.status !== "completed") ?
                                            <Button color='primary' className="mw-25" onClick={() => setCancelModal(!cancelModal)}> Cancel Request </Button> : ""}
                                </div>
                            </Col>
                        </Row>
                    </>}
                </CardBody>
            </Card >
            {/* Cancel Modal */}
            <div className="vertically-centered-modal">
                <Modal
                    isOpen={cancelModal}
                    toggle={() => setCancelModal(!cancelModal)}
                    className="modal-dialog-centered"
                >
                    <ModalHeader toggle={() => setCancelModal(!cancelModal)}>
                        Confirmation
                    </ModalHeader>
                    <ModalBody>Are you sure you want to cancel this service request ?</ModalBody>
                    <ModalFooter>
                        <Button
                            color='secondary'
                            outline
                            onClick={() => setCancelModal(!cancelModal)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => onSubmitCancelModal()}
                        >
                            Yes
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div >
    )
}

export default DetailServiceRequest;
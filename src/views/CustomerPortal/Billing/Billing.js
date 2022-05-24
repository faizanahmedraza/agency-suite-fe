import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {
    Card,
    CardTitle,
    CardText,
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
import BillingInformationListAction from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListAction";
import CardInfoModal from '@src/views/CustomerPortal/Billing/CardInfoModal';

const Loader = () => {
    return (
        <div className="text-center">
            <strong>Loading...</strong>
        </div>
    );
};

const Billing = () => {

    const dispatch = useDispatch();
    const [centeredModal, setCenteredModal] = useState(false)
    const navigate = useNavigate();

    const {
        customer_billing_information: { list: { customer_billing_information, loading } }
    } = useSelector(state => state);

    useEffect(() => {
        dispatch(BillingInformationListAction.billingInformationList());
    }, []);

    const cardToggleModal = () => {
        setCenteredModal(!centeredModal);
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h1>Billing</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Row>
                <div className='mb-2'>
                    <h3>Payment Methods</h3>
                </div>
                <Col md='6' lg='4'>
                    <Card className='mb-3'>
                        <CardBody>
                            <CardTitle tag='h4'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='fs-5'>Wallet</div>
                                    <Button className='btn-sm'>Top Up</Button>
                                </div>
                            </CardTitle>
                            <CardText>
                                <div className='d-flex flex-column'>
                                    <div className='fs-5'>$ 3737.02</div>
                                    <Link to={``}><p className='fs-5'>View Transactions</p></Link>
                                </div>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col md='6' lg='4'>
                    <Card className='mb-3'>
                        <CardBody>
                            <CardTitle tag='h4'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='fs-5'>Master Card</div>
                                    <Button className='btn-sm'>Primary</Button>
                                </div>
                            </CardTitle>
                            <CardText>
                                <div className='d-flex flex-column'>
                                    <div className='fs-5'>.... .... .... 4444</div>
                                    <div className='fs-5 pb-1'>12 / 2025</div>
                                </div>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <div className='d-flex justify-content-end'>
                    <Button.Ripple color='primary' className="w-25 ms-2" onClick={cardToggleModal}>Add Payment Method</Button.Ripple>
                </div>
            </Row>
            {/* Billing Information modal */}
            <CardInfoModal onShow={centeredModal} onHide={cardToggleModal} />
        </div >
    )
}

export default Billing;

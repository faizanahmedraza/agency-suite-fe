import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {
    Card,
    CardTitle,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Button,
} from 'reactstrap'
import { useDispatch, useSelector } from '@store/store'
import BillingInformationListAction from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListAction";
import CardInfoModal from '@src/views/CustomerPortal/Billing/CardInfoModal';
import BillingInformationDeleteAction from "@store/V1/CustomerPortal/BillingInformation/DELETE/DeleteAction";
import MarkPrimaryAction from "@store/V1/CustomerPortal/BillingInformation/MARK_PRIMARY/MarkPrimaryAction";
import Loader from '@src/views/GrowLoader';

const Billing = () => {

    const dispatch = useDispatch();
    const [centeredModal, setCenteredModal] = useState(false)
    const navigate = useNavigate();

    const {
        customer_billing_information: {
            list: {
                customer_billing_information,
                loading
            },
            mark_primary: {
                isPrimary
            },
            delete: {
                isDeleted
            },
            create: {
                success
            },
        }
    } = useSelector(state => state);

    useEffect(() => {
        dispatch(BillingInformationListAction.billingInformationList());
    }, [isPrimary, isDeleted, success]);

    const cardToggleModal = () => {
        setCenteredModal(!centeredModal);
    }

    const handleMarkPrimaryStatus = (id) => {
        dispatch(MarkPrimaryAction.markPrimary(id));
    }

    const handleDeleteBillingInfo = (id) => {
        dispatch(BillingInformationDeleteAction.billingInfoDelete(id));
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
            {loading ? <Loader /> :
                <Row>
                    <div className='mb-2'>
                        <h3>Payment Methods</h3>
                    </div>
                    <Col md='6' lg='4'>
                        <Card className='mb-3' style={{backgroundColor: "#cccccc"}}>
                            <CardBody>
                                <CardTitle tag='h4'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <strong className='fs-5'>Wallet</strong>
                                        <Button className='btn-primary btn-sm' disabled>Top Up</Button>
                                    </div>
                                </CardTitle>
                                <div className='d-flex flex-column pt-2'>
                                    <div className='fs-5'>$ 3737.02</div>
                                    <Link className='fs-4 pe-none' to=""><span>View Transactions</span></Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    {customer_billing_information.map((data) => {
                        return (
                            <Col md='6' lg='4' key={data.id}>
                                <Card className='mb-3'>
                                    <CardBody>
                                        <CardTitle tag='h4'>
                                            <div className='d-flex justify-content-between align-items-start'>
                                                <strong className='fs-5'>{data.holder_name}</strong>
                                                {data.is_primary ?
                                                    <Label for='switch-primary' className='form-check-label mb-50'>
                                                        Primary
                                                    </Label>
                                                    : <div className='d-flex flex-column'>
                                                        <Label for={`switch-${data.id}`} className='form-check-label mb-50'>
                                                            Mark Primary
                                                        </Label>
                                                        <div className='form-switch form-check-primary text-center'>
                                                            <Input
                                                                type="switch"
                                                                onChange={e => handleMarkPrimaryStatus(data.id)}
                                                                data-id={data.id}
                                                                id={`switch-${data.id}`}
                                                                name="icon-primary"
                                                                value={data.is_primary}
                                                            />
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </CardTitle>
                                        <div className={`d-flex flex-column ${data.is_primary ? 'pt-2' : ''}`}>
                                            <div className='fs-5'>.... .... .... {data.last_digits}</div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='fs-5'>{data.exp_month} / 20{data.exp_year}</div>
                                                {!data.is_primary ?
                                                    <Button className='btn-primary btn-sm' onClick={e => handleDeleteBillingInfo(data.id)}>Delete</Button>
                                                    : ""}
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                    <div className='d-flex justify-content-between'>
                        <Button outline className='me-1' tabIndex="4" color='secondary' type='button' onClick={e => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button.Ripple color='primary' className="w-25 ms-2" onClick={cardToggleModal}>Add Payment Method</Button.Ripple>
                    </div>
                </Row>
            }
            {/* Billing Information modal */}
            <CardInfoModal onShow={centeredModal} onHide={cardToggleModal} />
        </div >
    )
}

export default Billing;

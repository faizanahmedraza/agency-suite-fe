import React, { useState } from 'react'
import { useDispatch, useSelector } from '@store/store'
import {
    Row,
    Col,
    Label,
    Input,
    Form,
    Button,
    Spinner,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'
import BillingInformationCreateAction from "@store/V1/CustomerPortal/BillingInformation/CREATE/BillingInformationCreateAction";

const CardInfoModal = (props) => {   
    const dispatch = useDispatch();
    const [billingInfoDetail, setBillingInfoDetails] = useState({
        holder_name: "",
        card_no: "",
        cvc: "",
        expiry_month: "",
        expiry_year: "",
        address: "",
        country: "",
        city: "",
        state: "",
        zip_code: "",
        street: "",
    });

    const {
        customer_billing_information: { create: { loading: createBillingInfoLoading } }
    } = useSelector(state => state);

    const handleBillingInfoInputField = (e) => {
        setBillingInfoDetails({
            ...billingInfoDetail,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitBillingHandler = (e) => {
        e.preventDefault();
        dispatch(BillingInformationCreateAction.billingInformationCreate(billingInfoDetail));
    }

    return (
        <div className='vertically-centered-modal'>
            <Modal isOpen={props.onShow} toggle={props.onHide} className='modal-dialog-centered'>
                <ModalHeader toggle={ props.onHide}>Your Billing Information</ModalHeader>
                <Form onSubmit={onSubmitBillingHandler}>
                    <ModalBody>
                        <Row>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='holder_name'>
                                        Holder Name
                                    </Label>
                                    <Input type='text' value={billingInfoDetail.holder_name} onChange={handleBillingInfoInputField} name='holder_name' id='holder_name' placeholder='Enter Holder Name' />
                                </div>
                            </Col>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='card_no'>
                                        Card Number
                                    </Label>
                                    <Input type='number' value={billingInfoDetail.card_no} onChange={handleBillingInfoInputField} name='card_no' id='card_no' placeholder='Enter Card Number' />
                                </div>
                            </Col>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='cvc'>
                                        CVC
                                    </Label>
                                    <Input type='number' value={billingInfoDetail.cvc} onChange={handleBillingInfoInputField} name='cvc' id='cvc' placeholder='Enter CVC' />
                                </div>
                            </Col>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='expiry_month'>
                                        Expiry Month
                                    </Label>
                                    <Input type='number' value={billingInfoDetail.expiry_month} onChange={handleBillingInfoInputField} name='expiry_month' id='expiry_month' placeholder='Enter Expiry Month For e.g: 12' />
                                </div>
                            </Col>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='expiry_year'>
                                        Expiry Year
                                    </Label>
                                    <Input type='number' value={billingInfoDetail.expiry_year} onChange={handleBillingInfoInputField} name='expiry_year' id='expiry_year' placeholder='Enter Expiry Year For e.g: 22' />
                                </div>
                            </Col>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='country'>
                                        Country
                                    </Label>
                                    <Input type='text' value={billingInfoDetail.country} onChange={handleBillingInfoInputField} name='country' id='country' placeholder='Enter Country' />
                                </div>
                            </Col>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='city'>
                                        City
                                    </Label>
                                    <Input type='text' value={billingInfoDetail.city} onChange={handleBillingInfoInputField} name='city' id='city' placeholder='Enter City' />
                                </div>
                            </Col>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='state'>
                                        State
                                    </Label>
                                    <Input type='text' value={billingInfoDetail.state} onChange={handleBillingInfoInputField} name='state' id='state' placeholder='Enter State' />
                                </div>
                            </Col>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='zip_code'>
                                        Zip Code
                                    </Label>
                                    <Input type='text' value={billingInfoDetail.zip_code} onChange={handleBillingInfoInputField} name='zip_code' id='zip_code' placeholder='Enter Zip Code' />
                                </div>
                            </Col>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='street'>
                                        Street Address
                                    </Label>
                                    <Input type='text' value={billingInfoDetail.street} onChange={handleBillingInfoInputField} name='street' id='street' placeholder='Enter Street Address' />
                                </div>
                            </Col>
                            <Col md='12' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='address'>
                                        Address
                                    </Label>
                                    <Input type='textarea' value={billingInfoDetail.address} onChange={handleBillingInfoInputField} name='address' id='address' placeholder='Enter Address' />
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={props.onHide}>
                            Cancel
                        </Button>
                        <Button color='success' type='submit' disabled={createBillingInfoLoading}>
                            {
                                createBillingInfoLoading ?
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
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}

export default CardInfoModal;
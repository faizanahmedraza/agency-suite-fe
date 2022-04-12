import React, { useState } from 'react';
import { useDispatch, useSelector } from '@store/store';
import CustomerCreateAction from "@store/V1/Customer/CREATE/CustomerCreateAction";
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
    Spinner,
} from 'reactstrap';

const CreateCustomer = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.customers.create);
    const initialState = {
        first_name: "",
        last_name: "",
        email: ""
    }

    const [customerDetails, setCustomerDetails] = useState(initialState)

    const handleInputField = (e) => {
        setCustomerDetails({
            ...customerDetails,
            [e.target.name]: e.target.value
        })
    }

    const resetInputField = (e) => {
        setCustomerDetails(initialState)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(CustomerCreateAction.customerCreate(customerDetails));
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-4'>
                            <h1>Create Customer</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Card>
                        <CardHeader>
                            <h4>Customer Details</h4>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            <Form onSubmit={onSubmitHandler}>
                                <Row>
                                    <Col md='6' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                First Name
                                            </Label>
                                            <Input type='text' onChange={handleInputField} name='first_name' id='first_name' placeholder='Enter Customer First Name' value={customerDetails.first_name}/>
                                        </div>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Email
                                            </Label>
                                            <Input type='email' onChange={handleInputField} name='email' id='email' placeholder='Enter Customer Email' value={customerDetails.email}/>
                                        </div>
                                    </Col>
                                    <Col md='6' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Last Name
                                            </Label>
                                            <Input type='text' onChange={handleInputField} name='last_name' id='last_name' placeholder='Enter Customer Last Name' value={customerDetails.last_name}/>
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='d-flex justify-content-between'>
                                            <Button outline className='me-1' color='secondary' type='button' onClick={resetInputField}>
                                                Cancel
                                            </Button>
                                            <Button color='primary' type='submit' disabled={loading}>
                                                {
                                                    loading ?
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
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>

        </div>
    )
}

export default CreateCustomer
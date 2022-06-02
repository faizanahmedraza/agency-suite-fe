import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from '@store/store';
import CustomerDetailAction from "@store/V1/Customer/DETAIL/CustomerDetailAction";
import CustomerUpdateAction from "@store/V1/Customer/UPDATE/CustomerUpdateAction";
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

const Loader = () => {
    return (
        <div className='d-flex justify-content-center'><strong>Loading...</strong></div>
    );
}

const UpdateCustomer = () => {

    const { detail: { customer, fetched, loading }, update: { loading: updateLoading } } = useSelector((state => state.customers));

    const initialState = {
        first_name: "",
        last_name: "",
        email: "",
    }

    const [customerDetails, setCustomerDetails] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

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
        dispatch(CustomerUpdateAction.customerUpdate({
            form: customerDetails,
            id
        }));
    }

    useEffect(() => {
        dispatch(CustomerDetailAction.customerDetail(id));
        if (fetched) {
            setCustomerDetails(customer)
        }
    }, [fetched]);

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-4'>
                            <h1>Update Customer</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Form onSubmit={onSubmitHandler}>
                        <Row>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='nameMulti'>
                                        First Name
                                    </Label>
                                    <Input type='text' onChange={handleInputField} name='first_name' id='first_name' placeholder='Enter Customer First Name' value={!loading ? customerDetails.first_name : ""} />
                                </div>
                            </Col>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='nameMulti'>
                                        Last Name
                                    </Label>
                                    <Input type='text' onChange={handleInputField} name='last_name' id='last_name' placeholder='Enter Customer Last Name' value={!loading ? customerDetails.last_name : ""} />
                                </div>
                            </Col>
                            <Col md='6' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='nameMulti'>
                                        Email
                                    </Label>
                                    <Input type='email' tabIndex="3" onChange={handleInputField} name='email' id='email' placeholder='Enter Customer Email' value={!loading ? customerDetails.email : ""} />
                                </div>
                            </Col>
                            <Col md='12' sm='12'>
                                <div className='d-flex justify-content-between'>
                                    <Link to="/customers">
                                        <Button outline className='me-1' color='secondary' type='button' onClick={() => navigate(-1)}>
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button color='primary' type='submit' disabled={updateLoading}>
                                        {
                                            updateLoading ?
                                                <>
                                                    <Spinner color='white' size='sm' type='grow' />
                                                    <span className='ms-50'>Loading...</span>
                                                </>
                                                :
                                                <span>
                                                    Update
                                                </span>
                                        }
                                    </Button>

                                </div>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default UpdateCustomer
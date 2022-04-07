import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@store/store';
import CustomerDetailAction from "@store/V1/Customer/DETAIL/CustomerDetailAction";
import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Form,
    CardHeader,
} from 'reactstrap';

const UpdateCustomer = () => {

    const state = useSelector((state => state.customers.detail));

    const [CustomerDetails, setCustomerDetails] = useState({
        first_name: "",
        last_name: ""
    })

    const dispatch = useDispatch();
    const { id } = useParams();

    const handleInputField = (e) => {
        setCustomerDetails({
            ...CustomerDetails,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(CustomerDetails)
    }

    useEffect(() => {
        dispatch(CustomerDetailAction.customerDetail(id));
        if (state) {
            setCustomerDetails(state.customer)
        }
    }, []);

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
                                            <Input type='text' onChange={handleInputField} name='name' id='first_name' placeholder='Enter Customer First Name' value={CustomerDetails.first_name}/>
                                        </div>
                                    </Col>
                                    <Col md='6' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Last Name
                                                    </Label>
                                            <Input type='email' onChange={handleInputField} name='name' id='email' placeholder='Enter Customer Last Name' value={CustomerDetails.last_name}/>
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

export default UpdateCustomer
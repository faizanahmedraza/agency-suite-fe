import React, { useState } from 'react'
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
    const [CustomerDetails, setCustomerDetails] = useState({
        first_name: null,
        last_name: null
    })

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
                                            <Input type='text' onChange={handleInputField} name='name' id='first_name' placeholder='Enter Customer First Name' />
                                        </div>
                                    </Col>
                                    <Col md='6' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Last Name
                                                    </Label>
                                            <Input type='email' onChange={handleInputField} name='name' id='email' placeholder='Enter Customer Last Name' />
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
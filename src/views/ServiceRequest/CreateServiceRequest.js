import React, { useState } from 'react'
import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Form,
    Button,
    CardHeader,
    InputGroup,
    InputGroupText,
    Spinner,
} from 'reactstrap'
import { convertBase64 } from "@utils"
import { useDispatch, useSelector } from '@store/store'
import ServiceActions from '@store/V1/Service/Create/ServiceCreateAction'

const CreateServiceRequest = () => {

    const [active, setActive] = useState('1')
    const [formModal, setFormModal] = useState(false)
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.service.create)

    const [serviceDetails, setServiceDetails] = useState({
        name: "",
        description: "",
        image: "",
        subscription_type: "",
        price: "",
        purchase_limit: "",
        weekly: "",
        monthly: "",
        quarterly: "",
        biannually: "",
        annually: "",
        max_concurrent_requests: "",
        max_requests_per_month: "",
        intakes: {
            intake: [
                {
                    field: "text",
                    name: "Title"
                },
                {
                    field: "text",
                    name: "Description"
                },
            ]
        }
    })

    const handleInputField = (e) => {
        setServiceDetails({
            ...serviceDetails,
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
                        <div className='col-md-5'>
                            <h1>Create Service Request</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Card>
                        <CardHeader>
                            <h4>Service Request Details</h4>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            <Form onSubmit={onSubmitHandler}>
                                <Row>
                                    <Col md="6" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='select-basic'>
                                                Customer
                                            </Label>
                                            <Input type='select' value={serviceDetails.subscription_type} name='subscription_type' onChange={handleInputField} id='select-basic'>
                                                <option value="">Select Customer</option>
                                                <option value="one-off">One-off</option>
                                                <option value="recurring">Recurring</option>
                                            </Input>
                                        </div>
                                    </Col>
                                    <Col md="6" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='select-basic'>
                                                Service
                                            </Label>
                                            <Input type='select' value={serviceDetails.subscription_type} name='subscription_type' onChange={handleInputField} id='select-basic'>
                                                <option value="">Select Service</option>
                                                <option value="one-off">One-off</option>
                                                <option value="recurring">Recurring</option>
                                            </Input>
                                        </div>
                                    </Col>
                                    {
                                        serviceDetails.subscription_type === "recurring" &&
                                        (
                                            <>
                                                <Col md="12" sm='12'>
                                                    <div className='mb-1'>
                                                        <Label className='form-label' for='select-basic'>
                                                            Service Type
                                                        </Label>
                                                        <Input type='select' value={serviceDetails.subscription_type} name='subscription_type' onChange={handleInputField} id='select-basic'>
                                                            <option value="">Select Service</option>
                                                            <option value="one-off">One-off</option>
                                                            <option value="recurring">Recurring</option>
                                                        </Input>
                                                    </div>
                                                </Col>
                                            </>
                                        )
                                    }
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Title
                                            </Label>
                                            <Input type='text' value={serviceDetails.name} onChange={handleInputField} name='name' id='nameMulti' placeholder='Enter Service Name' />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Description
                                            </Label>
                                            <Input type='textarea' value={serviceDetails.description} onChange={handleInputField} name='description' id='nameMulti' placeholder='Enter Description' />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='d-flex justify-content-between'>
                                            <Button outline className='me-1' color='secondary' type='reset'>
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

export default CreateServiceRequest;
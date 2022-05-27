import React, { useState } from 'react'
import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    TabContent,
    TabPane,
    Form,
    Nav,
    NavItem,
    NavLink,
    Button,
    CardHeader,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputGroup,
    InputGroupText,
    Container,
    Spinner,
} from 'reactstrap'
import { convertBase64 } from "@utils"
import { useDispatch, useSelector } from '@store/store'
import ServiceActions from '@store/V1/Service/Create/ServiceCreateAction'

const CreateService = () => {

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


    const uploadImage = async (e) => {

        const file = e.target.files[0]

        const base64 = await convertBase64(file)

        if (!base64) return
        
        setServiceDetails({ ...serviceDetails, image: base64 })

    }

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(ServiceActions.serviceCreate(serviceDetails))
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-3'>
                            <h1>Create service</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Nav tabs fill>
                        <NavItem>
                            <NavLink
                                active={active === '1'}
                                onClick={() => {
                                    toggle('1')
                                }}
                            >
                                1. Service details
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === '2'}
                                onClick={() => {
                                    toggle('2')
                                }}
                            >
                                2. Intake form
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent className='py-50' activeTab={active}>
                        <TabPane tabId='1'>
                            <Card>
                                <CardHeader>
                                    <h4>Service details</h4>
                                </CardHeader>
                                <hr />
                                <CardBody>
                                    <Form onSubmit={onSubmitHandler}>
                                        <Row>
                                            <Col md='6' sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label' for='nameMulti'>
                                                        Service Name
                                                    </Label>
                                                    <Input type='text' value={serviceDetails.name} onChange={handleInputField} name='name' id='nameMulti' placeholder='Enter Service Name' />
                                                </div>
                                                <div className='mb-1'>
                                                    <Label className='form-label' for='nameMulti'>
                                                        Description
                                                    </Label>
                                                    <Input type='textarea' value={serviceDetails.description} onChange={handleInputField} name='description' id='nameMulti' placeholder='Enter Description' />
                                                </div>
                                            </Col>
                                            <Col md='6' sm='12'>
                                                <Row>
                                                    <Col md='6' sm='12'>
                                                        <div>
                                                            <img src={serviceDetails.image || "https://media.tarkett-image.com/large/TH_25094225_25187225_001.jpg"} width="100%" height="200" alt="service image" />
                                                        </div>
                                                    </Col>
                                                    <Col md='6' sm='12' className='d-flex flex-column'>
                                                        <Label className='form-label' for='nameMulti'>
                                                            Image
                                                        </Label>
                                                        <small><Label>Recommended: 390x190 px</Label></small>
                                                        <Input type='file' onChange={uploadImage} accept="image/*" name='service_image' id='nameMulti' />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Col sm="12" className='mt-2'>
                                            <h4>Pricing Details</h4>
                                        </Col>
                                        <Row>
                                            <Col md="6" sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label' for='select-basic'>
                                                        Type
                                                    </Label>
                                                    <Input type='select' value={serviceDetails.subscription_type} name='subscription_type' onChange={handleInputField} id='select-basic'>
                                                        <option value="">Please , choose a type</option>
                                                        <option value="one-off">One-off</option>
                                                        <option value="recurring">Recurring</option>
                                                    </Input>
                                                </div>
                                            </Col>
                                            {
                                                serviceDetails.subscription_type === "one-off" &&
                                                (
                                                    <>
                                                        <Col md="6" sm='12'>
                                                            <div className='mb-1'>
                                                                <Label className='form-label' for='select-basic'>
                                                                    Price
                                                                </Label>
                                                                <InputGroup className='input-group-merge mb-2'>
                                                                    <InputGroupText>$</InputGroupText>
                                                                    <Input value={serviceDetails.price} placeholder='0.00' name="price" onChange={handleInputField} />
                                                                </InputGroup>
                                                            </div>
                                                        </Col>
                                                        <Col md="6" sm='12'>
                                                            <div className='mb-1'>
                                                                <Label className='form-label' for='select-basic'>
                                                                    Purchase limit
                                                                </Label>
                                                                <Input type='number' value={serviceDetails.purchase_limit} onChange={handleInputField} name='purchase_limit' id='nameMulti' placeholder='0' />
                                                            </div>
                                                        </Col>
                                                    </>
                                                )}

                                            {
                                                serviceDetails.subscription_type === "recurring" &&
                                                (
                                                    <>
                                                        <Col md="6" sm='12'>
                                                            <div className='mb-1'>
                                                                <Label className='form-label' for='select-basic'>
                                                                    Weekly
                                                                    &nbsp;
                                                                    <small>( Billed per week. Leave empty to disable )</small>
                                                                </Label>
                                                                <InputGroup className='input-group-merge mb-2'>
                                                                    <InputGroupText>$</InputGroupText>
                                                                    <Input value={serviceDetails.weekly} onChange={handleInputField} name="weekly" placeholder='0.00' />
                                                                </InputGroup>
                                                            </div>
                                                        </Col>

                                                        <Col md="6" sm='12'>
                                                            <div className='mb-1'>
                                                                <Label className='form-label' for='select-basic'>
                                                                    Monthly
                                                                    &nbsp;
                                                                    <small>( Billed per month. Leave empty to disable )</small>
                                                                </Label>
                                                                <InputGroup className='input-group-merge mb-2'>
                                                                    <InputGroupText>$</InputGroupText>
                                                                    <Input value={serviceDetails.monthly} placeholder='0.00' name="monthly" onChange={handleInputField} />
                                                                </InputGroup>
                                                            </div>
                                                        </Col>

                                                        <Col md="6" sm='12'>
                                                            <div className='mb-1'>
                                                                <Label className='form-label' for='select-basic'>
                                                                    Quarterly
                                                                    &nbsp;
                                                                    <small>( Billed every three months. Leave empty to disable )</small>
                                                                </Label>
                                                                <InputGroup className='input-group-merge mb-2'>
                                                                    <InputGroupText>$</InputGroupText>
                                                                    <Input value={serviceDetails.quarterly} placeholder='0.00' name="quarterly" onChange={handleInputField} />
                                                                </InputGroup>
                                                            </div>
                                                        </Col>
                                                        <Col md="6" sm='12'>
                                                            <div className='mb-1'>
                                                                <Label className='form-label' for='select-basic'>
                                                                    Biannually
                                                                    &nbsp;
                                                                    <small>( Billed every six months. Leave empty to disable )</small>
                                                                </Label>
                                                                <InputGroup className='input-group-merge mb-2'>
                                                                    <InputGroupText>$</InputGroupText>
                                                                    <Input value={serviceDetails.biannually} placeholder='0.00' name="biannually" onChange={handleInputField} />
                                                                </InputGroup>
                                                            </div>
                                                        </Col>
                                                        <Col md="6" sm='12'>
                                                            <div className='mb-1'>
                                                                <Label className='form-label' for='select-basic'>
                                                                    Annually
                                                                    &nbsp;
                                                                    <small>( Billed per year. Leave empty to disable )</small>
                                                                </Label>
                                                                <InputGroup className='input-group-merge mb-2'>
                                                                    <InputGroupText>$</InputGroupText>
                                                                    <Input value={serviceDetails.annually} placeholder='0.00' name="annually" onChange={handleInputField} />
                                                                </InputGroup>
                                                            </div>
                                                        </Col>

                                                        <hr />

                                                        <h4>More Details</h4>

                                                        <Col md="6" sm='12'>
                                                            <div className='mb-1 d-flex flex-column'>
                                                                <Label className='form-label' for='select-basic'>
                                                                    Max number of concurrent requests
                                                                    &nbsp;
                                                                </Label>
                                                                <Label>
                                                                    <small>( Leave empty if you allow unlimited concurrent requests for this subscription. )</small>
                                                                </Label>
                                                                <InputGroup className='input-group-merge mb-2'>
                                                                    <Input value={serviceDetails.max_concurrent_requests} placeholder='0.00' name="max_concurrent_requests" onChange={handleInputField} />
                                                                </InputGroup>
                                                            </div>
                                                        </Col>

                                                        <Col md="6" sm='12'>
                                                            <div className='mb-1 d-flex flex-column'>
                                                                <Label className='form-label' for='select-basic'>
                                                                    Max number of requests per month
                                                                    &nbsp;
                                                                </Label>
                                                                <Label>
                                                                    <small>( Leave empty if you allow unlimited requests per month for this subscription. )</small>
                                                                </Label>
                                                                <InputGroup className='input-group-merge mb-2'>
                                                                    <Input value={serviceDetails.max_requests_per_month} placeholder='0.00' name="max_requests_per_month" onChange={handleInputField} />
                                                                </InputGroup>
                                                            </div>
                                                        </Col>

                                                    </>
                                                )
                                            }
                                            <Col sm='12'>
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
                        </TabPane>
                        <TabPane tabId='2'>
                            <Card>
                                <CardHeader className='d-flex justify-content-between'>
                                    <div>
                                        <h4>Intake form fields</h4>

                                    </div>
                                    <div>
                                        {/* <Button color='primary' onClick={() => setFormModal(!formModal)}>
                                            Add new field
                                        </Button> */}
                                    </div>
                                </CardHeader>
                                <hr />
                                <CardBody>
                                    <Form>
                                        <Col sm="12">
                                            <Container>
                                                <div className='mb-1'>
                                                    <Label className='form-label' for='nameMulti'>
                                                        Title
                                                    </Label>
                                                    <Input type='text' disabled name='name' id='nameMulti' placeholder='Enter Title' />
                                                </div>
                                                <div className='mb-1' >
                                                    <Label className='form-label' for='nameMulti'>
                                                        Description
                                                    </Label>
                                                    <Input type='textarea' disabled name='name' id='nameMulti' placeholder='Enter Description    ' />
                                                </div>
                                            </Container>
                                        </Col>
                                    </Form>
                                </CardBody>
                            </Card>
                        </TabPane>
                    </TabContent>
                </CardBody>
                <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
                    <ModalHeader toggle={() => setFormModal(!formModal)}>Add intake form field</ModalHeader>
                    <ModalBody>
                        <div className='mb-2'>
                            <Label className='form-label' for='select-basic'>
                                Type
                            </Label>
                            <Input type='select' name='select' id='select-basic'>
                                <option>Text field</option>
                                <option>Text area</option>
                                <option>Options : multiple choices</option>
                                <option>Options : single choice</option>
                            </Input>
                        </div>
                        <div className='mb-2'>
                            <Label className='form-label' for='title'>Title:</Label>
                            <Input type='text' id='title' placeholder='Enter field title' />
                        </div>
                        <div className='mb-2'>
                            <Label className='form-label' for='placeholder'>Place Holder:</Label>
                            <Input type='text' id='placeholder' placeholder='Enter field placeholder' />
                        </div>
                        <div className='mb-2'>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' defaultChecked id='basic-cb-checked' />
                                <Label for='basic-cb-checked' className='form-check-label'>
                                    Is this field required?
                                </Label>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={() => setFormModal(!formModal)}>
                            Add field
                        </Button>{' '}
                    </ModalFooter>
                </Modal>
            </Card>

        </div>
    )
}

export default CreateService
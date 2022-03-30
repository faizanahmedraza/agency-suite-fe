import React, { useState, Fragment } from 'react'
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
    ListGroupItem,
    ListGroup
} from 'reactstrap'
import { FileText, X, DownloadCloud } from 'react-feather'
import { useDropzone } from 'react-dropzone'

const CreateService = () => {

    const [active, setActive] = useState('1')
    const [formModal, setFormModal] = useState(false)
    const [files, setFiles] = useState([])

    const [serviceDetails, setServiceDetails] = useState({
        name: null,
        description: null,
        image: null,
        subscription_type: null,
        price: null,
        purchase_limit: null,
        weekly: null,
        monthly: null,
        quarterly: null,
        biannually: null,
        annually: null,
        max_concurrent_requests: null,
        max_requests_per_month: null,
        intakes: {
            intake: []
        }
    })


    const uploadImage = async (e) => {

        const file = e.target.files[0]

        const base64 = await convertBase64(file)

        if (!base64) return
        setServiceDetails({ ...serviceDetails, image: base64 })

    }

    const convertBase64 = (file) => {

        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = (err) => {
                reject(err);
            }

        })

    }

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
        }
    })

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
    }

    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>{renderFilePreview(file)}</div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ))

    const handleRemoveAllFiles = () => {
        setFiles([])
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(serviceDetails)
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
                                                    <Input type='text' onChange={(e) => setServiceDetails({ ...serviceDetails, name: e.target.value })} name='name' id='nameMulti' placeholder='Enter Service Name' />
                                                </div>
                                                <div className='mb-1'>
                                                    <Label className='form-label' for='nameMulti'>
                                                        Description
                                                    </Label>
                                                    <Input type='textarea' onChange={(e) => setServiceDetails({ ...serviceDetails, description: e.target.value })} name='name' id='nameMulti' placeholder='Enter Description' />
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
                                                    <Input type='select' name='select' onChange={(e) => setServiceDetails({ ...serviceDetails, subscription_type: e.target.value })} id='select-basic'>
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
                                                                    <Input placeholder='0.00' onChange={(e) => setServiceDetails({ ...serviceDetails, price: e.target.value })} />
                                                                </InputGroup>
                                                            </div>
                                                        </Col>
                                                        <Col md="6" sm='12'>
                                                            <div className='mb-1'>
                                                                <Label className='form-label' for='select-basic'>
                                                                    Purchase limit
                                                                </Label>
                                                                <Input type='number' onChange={(e) => setServiceDetails({ ...serviceDetails, purchase_limit: e.target.value })} name='name' id='nameMulti' placeholder='0' />
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
                                                                    <Input onChange={(e) => setServiceDetails({ ...serviceDetails, weekly: e.target.value })} placeholder='0.00' />
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
                                                                    <Input placeholder='0.00' onChange={(e) => setServiceDetails({ ...serviceDetails, monthly: e.target.value })} />
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
                                                                    <Input placeholder='0.00' onChange={(e) => setServiceDetails({ ...serviceDetails, quarterly: e.target.value })} />
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
                                                                    <Input placeholder='0.00' onChange={(e) => setServiceDetails({ ...serviceDetails, biannually: e.target.value })} />
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
                                                                    <Input placeholder='0.00' onChange={(e) => setServiceDetails({ ...serviceDetails, annually: e.target.value })} />
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
                                                                    <InputGroupText>$</InputGroupText>
                                                                    <Input placeholder='0.00' onChange={(e) => setServiceDetails({ ...serviceDetails, max_concurrent_requests: e.target.value })} />
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
                                                                    <InputGroupText>$</InputGroupText>
                                                                    <Input placeholder='0.00' onChange={(e) => setServiceDetails({ ...serviceDetails, max_requests_per_month: e.target.value })} />
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
                                                    <Button color='primary' type='submit'>
                                                        Create
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
                                        <Button color='primary' onClick={() => setFormModal(!formModal)}>
                                            Add new field
                                        </Button>
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
                                                    <Input type='text' name='name' id='nameMulti' placeholder='First Name' />
                                                </div>
                                                <div className='mb-1' >
                                                    <Label className='form-label' for='nameMulti'>
                                                        Description
                                                    </Label>
                                                    <Input type='textarea' name='name' id='nameMulti' placeholder='First Name' />
                                                </div>
                                                <div className='mb-1'>
                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                        <input {...getInputProps()} />
                                                        <div className='d-flex align-items-center justify-content-center flex-column'>
                                                            <DownloadCloud size={64} />
                                                            <h5>Drop Files here or click to upload</h5>
                                                            <p className='text-secondary'>
                                                                Drop files here or click{' '}
                                                                <a href='/' onClick={e => e.preventDefault()}>
                                                                    browse
                                                                </a>{' '}
                                                                thorough your machine
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {files.length ? (
                                                        <Fragment>
                                                            <ListGroup className='my-2'>{fileList}</ListGroup>
                                                            <div className='d-flex justify-content-end'>
                                                                <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                                                                    Remove All
                                                                </Button>
                                                                <Button color='primary'>Upload Files</Button>
                                                            </div>
                                                        </Fragment>
                                                    ) : null}
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
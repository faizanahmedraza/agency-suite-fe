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
import { convertBase64 } from "@utils"

const CreateCustomer = () => {

    const [active, setActive] = useState('1')
    const [formModal, setFormModal] = useState(false)
    const [files, setFiles] = useState([])

    const [CustomerDetails, setCustomerDetails] = useState({
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
        setCustomerDetails({
            ...CustomerDetails,
            [e.target.name]: e.target.value
        })
    }


    const uploadImage = async (e) => {

        const file = e.target.files[0]

        const base64 = await convertBase64(file)

        if (!base64) return
        setCustomerDetails({ ...CustomerDetails, image: base64 })

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
        console.log(CustomerDetails)
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-3'>
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
                                                Customer Name
                                                    </Label>
                                            <Input type='text' onChange={handleInputField} name='name' id='nameMulti' placeholder='Enter Customer Name' />
                                        </div>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Description
                                                    </Label>
                                            <Input type='textarea' onChange={handleInputField} name='description' id='nameMulti' placeholder='Enter Description' />
                                        </div>
                                    </Col>
                                    <Col md='6' sm='12'>
                                        <Row>
                                            <Col md='6' sm='12'>
                                                <div>
                                                    <img src={CustomerDetails.image || "https://media.tarkett-image.com/large/TH_25094225_25187225_001.jpg"} width="100%" height="200" alt="Customer image" />
                                                </div>
                                            </Col>
                                            <Col md='6' sm='12' className='d-flex flex-column'>
                                                <Label className='form-label' for='nameMulti'>
                                                    Image
                                                        </Label>
                                                <small><Label>Recommended: 390x190 px</Label></small>
                                                <Input type='file' onChange={uploadImage} accept="image/*" name='Customer_image' id='nameMulti' />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
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

export default CreateCustomer
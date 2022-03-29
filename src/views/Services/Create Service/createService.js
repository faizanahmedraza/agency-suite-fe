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
    Container
} from 'reactstrap'
import { FileText, X, DownloadCloud } from 'react-feather'
import { useDropzone } from 'react-dropzone'

const CreateService = () => {

    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const [files, setFiles] = useState([])

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
                                    <Form>
                                        <Row>
                                            <Col md='6' sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label' for='nameMulti'>
                                                        Service Name
                                                    </Label>
                                                    <Input type='text' name='name' id='nameMulti' placeholder='First Name' />
                                                </div>
                                                <div className='mb-1'>
                                                    <Label className='form-label' for='nameMulti'>
                                                        Description
                                                    </Label>
                                                    <Input type='textarea' name='name' id='nameMulti' placeholder='First Name' />
                                                </div>
                                            </Col>
                                            <Col md='6' sm='12'>
                                                <Row>
                                                    <Col md='6' sm='12'>
                                                        <div className='bg-info'>
                                                            <img src="https://media.tarkett-image.com/large/TH_25094225_25187225_001.jpg" width="100%" height="200" alt="service image" />
                                                        </div>
                                                    </Col>
                                                    <Col md='6' sm='12' className='d-flex flex-column'>
                                                        <Label className='form-label' for='nameMulti'>
                                                            Image
                                                        </Label>
                                                        <small><Label>Recommended: 390x190 px</Label></small>
                                                        <Input type='file' name='service_image' id='nameMulti' />
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
                                                    <Input type='select' name='select' id='select-basic'>
                                                        <option>One-off</option>
                                                        <option>Recurring</option>
                                                    </Input>
                                                </div>
                                            </Col>
                                            <Col sm='12'>
                                                <div className='d-flex justify-content-between'>
                                                    <Button outline className='me-1' color='secondary' type='reset'>
                                                        Cancel
                                                    </Button>
                                                    <Button color='primary' type='submit' onClick={e => e.preventDefault()}>
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
                                        <Button color='primary'>
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
            </Card>

        </div>
    )
}

export default CreateService
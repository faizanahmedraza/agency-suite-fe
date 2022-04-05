import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  Label,
  Input,
  Col,
  Row,
  Button

} from 'reactstrap'
import { convertBase64 } from "@utils"
import { ArrowRight } from 'react-feather';

const Profile = () => {

  const [active, setActive] = useState('1')

  const [portalSetting, setPortalSetting] = useState({
    name: null,
    profile: null,
    favicon: null,
    primary_color: null,
    secondary_color: null
  })

  const handleInputField = async (e) => {

    const file = e.target.files ? e.target.files[0] : null

    const base64 = file && await convertBase64(file)

    setPortalSetting({
      ...portalSetting,
      [e.target.name]: base64 ? base64 : e.target.value
    })

  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(portalSetting)
  }

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <h1>Profile</h1>
        </CardHeader>
      </Card>
      <Card>
        <CardBody>
          <h4>Update Password</h4>
          <div className='d-flex justify-content-between'>
            <p>Follow the recovery process to change your password.</p>
            <Link to='/dashboard'><h5 className='font-weight-bold text-danger'>Update Password &rarr;</h5></Link>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <div>
            <h3>Profile details</h3>
            <hr />
            <Form onSubmit={onSubmitHandler}>
              <Col md="5">
                <div className='mb-1'>
                  <Label className='form-label'>
                    Name
                  </Label>
                  <Input type='text' onChange={handleInputField} name='name' />
                </div>
                <div className='mb-1'>
                  <Label className='form-label'>
                    Photo
                  </Label>
                  &nbsp;
                  <small><Label>( Recommended: 50x50 px. )  </Label></small>
                  <Row>
                    <Col md="3">
                      <div className='mt-0'>
                        <img className='rounded-circle' src={portalSetting.logo || "https://media.tarkett-image.com/large/TH_25094225_25187225_001.jpg"} width="60px" alt="service image" />
                      </div>
                    </Col>
                    <Col md="7" className='pt-1'>
                      <Input type='file' onChange={handleInputField} accept="image/*" name='logo' id='nameMulti' />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col sm='12'>
                <div className='d-flex justify-content-between'>
                  <Button color='primary' type='submit'>
                    Save
                  </Button>

                </div>
              </Col>
            </Form>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Profile
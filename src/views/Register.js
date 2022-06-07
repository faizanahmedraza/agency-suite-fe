import { useState } from 'react'

// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button, Spinner } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

import { useDispatch, useSelector } from '@store/store'

import RegisterActions from "@store/V1/Auth/Register/RegisterActions"

import SaasfaLog from "@src/assets/images/logo/Saasfa-iconPNG-new.png"


const RegisterCover = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const { register: { loading }, portal_settings: { detail: { portal_settings } }
  } = useSelector((state => state))

  const [agencyInformation, setAgencyInformation] = useState({
    agency_name: "",
    email: ""
  })

  const handleInputChange = (e) => {
    setAgencyInformation({
      ...agencyInformation,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    dispatch(RegisterActions.registration(agencyInformation))
  }

  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/register-v2.svg`).default

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
            <img src={SaasfaLog} height="35" />
          <h2 className="brand-text text-primary ms-1">Agency Tool</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' xs='12' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Start your free trial
            </CardTitle>
            <CardText className='mb-2'>14-day free trial. No credit card needed.</CardText>
            <Form className='auth-register-form mt-2' onSubmit={onSubmitHandler}>
              <div className='mb-1'>
                <Label className='form-label' for='register-username'>
                  Agency Name
                </Label>
                <Input type='text' id='register-username' name="agency_name" value={agencyInformation.agency_name} onChange={handleInputChange} placeholder='Enter Your Agency Name' autoFocus />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Input type='email' id='register-email' name="email" value={agencyInformation.email} onChange={handleInputChange} placeholder='Enter Your Email' />
              </div>
              {/* <div className='form-check mb-1'>
                <Input type='checkbox' id='terms' />
                <Label className='form-check-label' for='terms'>
                  I agree to
                  <a className='ms-25' href='/' onClick={e => e.preventDefault()}>
                    privacy policy & terms
                  </a>
                </Label>
              </div> */}
              <Button color='primary' block disabled={loading}>
                {
                  loading ?
                    <>
                      <Spinner color='white' size='sm' type='grow' />
                      <span className='ms-50'>Loading...</span>
                    </>
                    :
                    <span>
                      Sign up
                    </span>
                }
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default RegisterCover

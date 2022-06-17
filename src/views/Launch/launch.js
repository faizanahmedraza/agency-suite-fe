// ** React Imports
import { useState } from "react"
import { Link } from 'react-router-dom'
import { useSkin } from '@hooks/useSkin'
import LaunchAction from "@store/V1/Auth/Launch/LaunchAction";
import { useSelector, useDispatch } from "@store/store"
import { Row, Col, CardTitle, CardText, Button, Form, Label, Input, Spinner } from 'reactstrap'
import { ChevronLeft } from 'react-feather'
import '@styles/base/pages/authentication.scss'
import SaasfaLog from "@src/assets/images/logo/Logo-300x100.png"

const VerifyEmailCover = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.launch)
  const [agencyInformation, setAgencyInformation] = useState({
    domain: ""
  })

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(LaunchAction.postLaunch(agencyInformation))
  }

  const source = require(`@src/assets/images/pages/verify-email-illustration.svg`).default

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img src={SaasfaLog} height="35" />
          {/* <h2 className='brand-text text-primary ms-1'>Agency Tool</h2> */}
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bolder mb-1'>
              Sign In
            </CardTitle>
            <CardText className='mb-2'>
              You must enter your agency url in order to proceed
            </CardText>
            <Form className="auth-login-form" onSubmit={onSubmitHandler}>
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Enter your portal URL
                </Label>
                <Input
                  type="text"
                  name="domain"
                  placeholder="Your portal url"
                  autoFocus
                  onChange={(e) => setAgencyInformation({ ...agencyInformation, domain: e.target.value })}
                />
              </div>
              <Button color="primary" block disabled={loading}>
                {loading ? (
                  <>
                    <Spinner color="white" size="sm" type="grow" />
                    <span className="ms-50">Loading...</span>
                  </>
                ) : (
                  <span>Continue</span>
                )}
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/register'>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>Go to register</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default VerifyEmailCover

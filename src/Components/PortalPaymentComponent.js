import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Form, Label, Input, Button, Row, Col } from 'reactstrap'
import PaymentGatewayCreateAction from "@store/V1/PaymentGateway/Create/PaymentGatewayCreateAction"
import { useDispatch } from "@store/store"

const CardPayment = () => {

  const dispatch = useDispatch()

  const [paymentInfo, setPaymentInfo] = useState({
    gateway: "stripe",
    gateway_id: "",
    gateway_code: ""
  })

  const handleChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(PaymentGatewayCreateAction.paymentGatewayCreate(paymentInfo))
  }

  return (
    <Card className='card-payment'>
      <CardHeader>
        <CardTitle tag='h4'>Stripe</CardTitle>
        <CardTitle className='text-primary' tag='h4'>
          <div className='form-switch form-check-primary'>
            <Input type='switch' className='' id='icon-secondnary' name='icon-status' />
          </div>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Form className='form' onSubmit={onSubmitHandler}>
          <Row>
            <Col sm='6' className='mb-2'>
              <Label className='form-label' for='payment-card-number'>
                Client Id
              </Label>
              <Input type='text' onChange={handleChange} value={paymentInfo.gateway_id} name='gateway_id' id='nameMulti' placeholder='' />
            </Col>
            <Col sm='6' className='mb-2'>
              <Label className='form-label' for='payment-expiry'>
                Client Secret
              </Label>
              <Input type='text' onChange={handleChange} value={paymentInfo.gateway_code} name='gateway_code' id='nameMulti' placeholder='' />
            </Col>
            <Col className='text-end' sm='12'>
              <Button color='primary'>Make Payment</Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

export default CardPayment
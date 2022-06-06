// ** Third Party Components
import Cleave from 'cleave.js/react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Form, Label, Input, Button, Row, Col } from 'reactstrap'

const CardPayment = () => {
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
        <Form className='form' onSubmit={e => e.preventDefault()}>
          <Row>
            <Col sm='6' className='mb-2'>
              <Label className='form-label' for='payment-card-number'>
                Site Key 
              </Label>
              <Input type='text' value='' name='name' id='nameMulti' placeholder='' />
            </Col>
            <Col sm='6' className='mb-2'>
              <Label className='form-label' for='payment-expiry'>
                Client Key 
              </Label>
              <Input type='text' value='' name='name' id='nameMulti' placeholder='' />
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
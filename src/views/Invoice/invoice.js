import React from 'react'
import {
    Button,
    Card,
    CardHeader,
    Row,
    Col
} from "reactstrap"

const Invoice = () => {
    return (
        <div>
            <Card>
                <CardHeader className='row'>
                    <Row>
                        <Col md="6">
                            <h1>Invoices</h1>
                        </Col>
                        <Col md="6" className='text-end'>
                            <Button color='primary'>Create invoice</Button>
                        </Col>
                    </Row>
                </CardHeader>
            </Card>
        </div>
    )
}

export default Invoice
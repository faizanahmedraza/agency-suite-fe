import React, { useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Form,
    Label,
    Input,
    Col,
    Row,
    Button,
    Container
} from 'reactstrap'
import { convertBase64 } from "@utils"

const Portal = () => {

    const [active, setActive] = useState('1')

    const [portalSetting, setPortalSetting] = useState({
        name: null,
        logo: null,
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
                    <h1>Portal Settings</h1>
                </CardHeader>
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
                                Client Portal
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === '2'}
                                onClick={() => {
                                    toggle('2')
                                }}
                            >
                                Pages
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === '3'}
                                onClick={() => {
                                    toggle('3')
                                }}
                            >
                                Modules and extensions
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent className='py-50' activeTab={active}>
                        <TabPane tabId='1'>
                            <div>
                                <h3>Client portal details</h3>
                                <hr />
                                <Form onSubmit={onSubmitHandler}>
                                    <Col md="6">
                                        <div className='mb-1'>
                                            <Label className='form-label'>
                                                Name
                                            </Label>
                                            <Input type='text' onChange={handleInputField} name='name' />
                                        </div>
                                        <div className='mb-1'>
                                            <Label className='form-label'>
                                                Primary Color ( The primary color will apply to buttons and links. )
                                            </Label>
                                            <Input type='color' className='w-25' onChange={handleInputField} name='primary_color' placeholder='Enter Service Name' />
                                        </div>
                                        <div className='mb-1'>
                                            <Label className='form-label'>
                                                Seconday Color  ( The secondary color will apply to backgrounds and headers. )
                                            </Label>
                                            <Input type='color' className='w-25' onChange={handleInputField} name='secondary_color' placeholder='Enter Service Name' />
                                        </div>
                                        <div className='mb-1'>
                                            <Label className='form-label'>
                                                Logo
                                            </Label>
                                            &nbsp;
                                            <small><Label>( Recommended: 200x50 px or similar proportions. Transparent background image. )  </Label></small>
                                            <Row>
                                                <Col md="6">
                                                    <div>
                                                        <img src={portalSetting.logo || "https://media.tarkett-image.com/large/TH_25094225_25187225_001.jpg"} width="100%" height="50" alt="service image" />
                                                    </div>
                                                </Col>
                                                <Col md="6" >
                                                    <Input type='file' onChange={handleInputField} accept="image/*" name='logo' id='nameMulti' />
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Favicon
                                            </Label>
                                            <Row>
                                                <Col md="6">
                                                    <div>
                                                        <img src={portalSetting.favicon || "https://media.tarkett-image.com/large/TH_25094225_25187225_001.jpg"} width="100%" height="50" alt="service image" />
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <Input type='file' onChange={handleInputField} accept="image/*" name='favicon' id='nameMulti' />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
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
                                </Form>
                            </div>
                        </TabPane>
                        <TabPane tabId='2'>
                            <p>
                                Bear claw jelly beans wafer pastry jelly beans candy macaroon biscuit topping. Sesame snaps lemon drops
                                donut gingerbread dessert cotton candy wafer croissant jelly beans. Sweet roll halvah gingerbread bonbon
                                apple pie gummies chocolate bar pastry gummi bears.
                            </p>
                            <p>
                                Croissant danish chocolate bar pie muffin. Gummi bears marshmallow chocolate bar bear claw. Fruitcake halvah
                                chupa chups dragée carrot cake cookie. Carrot cake oat cake cake chocolate bar cheesecake. Wafer gingerbread
                                sweet roll candy chocolate bar gingerbread.
                            </p>
                        </TabPane>
                        <TabPane tabId='3'>
                            <p>
                                Croissant jelly tootsie roll candy canes. Donut sugar plum jujubes sweet roll chocolate cake wafer. Tart
                                caramels jujubes. Dragée tart oat cake. Fruitcake cheesecake danish. Danish topping candy jujubes. Candy
                                canes candy canes lemon drops caramels tiramisu chocolate bar pie.
                            </p>
                            <p>
                                Gummi bears tootsie roll cake wafer. Gummies powder apple pie bear claw. Caramels bear claw fruitcake
                                topping lemon drops. Carrot cake macaroon ice cream liquorice donut soufflé. Gummi bears carrot cake toffee
                                bonbon gingerbread lemon drops chocolate cake.
                            </p>
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        </div>
    )
}

export default Portal
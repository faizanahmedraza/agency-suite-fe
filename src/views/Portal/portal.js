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
    Input
} from 'reactstrap'

const Portal = () => {

    const [active, setActive] = useState('1')

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

                                <Form>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nameMulti'>
                                            Service Name
                                        </Label>
                                        <Input type='text' onChange={(e) => setServiceDetails({ ...serviceDetails, name: e.target.value })} name='name' id='nameMulti' placeholder='Enter Service Name' />
                                    </div>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nameMulti'>
                                            Service Name
                                        </Label>
                                        <Input type='text' onChange={(e) => setServiceDetails({ ...serviceDetails, name: e.target.value })} name='name' id='nameMulti' placeholder='Enter Service Name' />
                                    </div>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nameMulti'>
                                            Service Name
                                        </Label>
                                        <Input type='text' onChange={(e) => setServiceDetails({ ...serviceDetails, name: e.target.value })} name='name' id='nameMulti' placeholder='Enter Service Name' />
                                    </div>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nameMulti'>
                                            Service Name
                                        </Label>
                                        <Input type='text' onChange={(e) => setServiceDetails({ ...serviceDetails, name: e.target.value })} name='name' id='nameMulti' placeholder='Enter Service Name' />
                                    </div>
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
import React, { useState, useEffect } from 'react'
import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Form,
    Button,
    CardHeader,
    Spinner,
} from 'reactstrap'
import { useDispatch, useSelector } from '@store/store'
import ServiceRequestCreateAction from "@store/V1/ServiceRequest/CREATE/ServiceRequestCreateAction";
import ServiceActions from '@store/V1/Service/List/ServiceListAction';
import CustomerListAction from "@store/V1/Customer/LIST/CustomerListAction";
import AsyncSelect from 'react-select/async';

const CreateServiceRequest = () => {

    const dispatch = useDispatch()
    const {
        service: { list: { services } = [] } = [],
        customers: { list: { customers } = [] } = [],
        service_requests: { create: { loading } } = {}
    } = useSelector(state => state);

    const [serviceRequestDetails, setServiceRequestDetails] = useState({
        service_id: "",
        customer_id: "",
        recurring_type: "",
        title: "",
        description: "",
        is_recurring: false,
        selected_service: null,
    })

    const [inputCustomerValue, setCustomerValue] = useState('');
    const [inputServiceValue, setServiceValue] = useState('');

    const handleInputField = (e) => {
        setServiceRequestDetails({
            ...serviceRequestDetails,
            [e.target.name]: e.target.value
        })
    }

    // handle input change event
    const handleInputChange = value => {
        setCustomerValue(value);
    };

    // handle selection
    const handleAsyncCustomerChange = value => {
        setServiceRequestDetails({
            ...serviceRequestDetails,
            customer_id: value
        })
    }

    const handleServiceInput = (e) => {
        if (e.target.value !== "") {
            const selectedService = services.find(service => service.id === Number(e.target.value))
            setServiceRequestDetails({
                ...serviceRequestDetails,
                service_id: e.target.value,
                is_recurring: selectedService.subscription_type == "recurring" ? true : false,
                selected_service: selectedService,
            })
        } else {
            setServiceRequestDetails({
                ...serviceRequestDetails,
                is_recurring: false,
            })
        }
    }

    useEffect(() => {
        dispatch(ServiceActions.serviceList());
        dispatch(CustomerListAction.customerList());
    }, []);


    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(ServiceRequestCreateAction.serviceRequestCreate(serviceRequestDetails));
    }

    const loadOptions = async (inputValue, callback) => {
        const data = customers;
        const result = data.map((d) => {
            return {
                value: `${d.id}`,
                label: `${d.first_name + ' ' + d.last_name}`,
            };
        });
        callback(result);
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h1>Create Service Request</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Card>
                        <CardHeader>
                            <h4>Service Request Details</h4>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            <Form onSubmit={onSubmitHandler}>
                                <Row>
                                    <Col md="6" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='select-basic'>
                                                Customer
                                            </Label>
                                            <AsyncSelect
                                                isClearable={false}
                                                className='react-select'
                                                classNamePrefix='select'
                                                value=""
                                                // getOptionLabel={e => label}
                                                // getOptionValue={e => e.id}
                                                loadOptions={[
                                                    {label: "irfan", value: 1},
                                                    {label: "faizan", value:2}
                                                ]}
                                                // onInputChange={handleInputChange}
                                                onChange={handleAsyncCustomerChange}
                                            />
                                            {/* <Input type='select' name='customer_id' onChange={handleInputField} id='customers'>
                                                <option value="">Select Customer</option>
                                                {
                                                    customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.first_name}</option>)
                                                }
                                            </Input> */}
                                        </div>
                                    </Col>
                                    <Col md="6" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='select-basic'>
                                                Service
                                            </Label>
                                            <Input type='select' name='service_id' onChange={handleServiceInput} id='services'>
                                                <option value="">Select Service</option>
                                                {
                                                    services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)
                                                }
                                            </Input>
                                        </div>
                                    </Col>
                                    {
                                        serviceRequestDetails.is_recurring && serviceRequestDetails.selected_service != null ?
                                            (
                                                <Col md='12' sm='12'>
                                                    <div className='mb-1'>
                                                        <Label className='form-label pb-0 mb-0' for='select-basic'>
                                                            Service Subscription
                                                        </Label>
                                                        <div className='demo-inline-spacing'>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr1' value="annualy" />
                                                                <Label className='form-check-label' for='sr1'>
                                                                    {'annualy - ' + serviceRequestDetails.selected_service.price_types.annually + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr2' value="biannually" />
                                                                <Label className='form-check-label' for='sr2'>
                                                                    {'biannually - ' + serviceRequestDetails.selected_service.price_types.biannually + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr3' value="quarterly" />
                                                                <Label className='form-check-label' for='sr3'>
                                                                    {'quarterly - ' + serviceRequestDetails.selected_service.price_types.quarterly + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' value="weekly" />
                                                                <Label className='form-check-label' for='sr4'>
                                                                    {'weekly - ' + serviceRequestDetails.selected_service.price_types.weekly + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr5' value="monthly" defaultChecked />
                                                                <Label className='form-check-label' for='sr5'>
                                                                    {'monthly - ' + serviceRequestDetails.selected_service.price_types.monthly + '$'}
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) : ""
                                    }
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Title
                                            </Label>
                                            <Input type='text' value={serviceRequestDetails.name} onChange={handleInputField} name='name' id='nameMulti' placeholder='Enter Service Name' />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Description
                                            </Label>
                                            <Input type='textarea' value={serviceRequestDetails.description} onChange={handleInputField} name='description' id='nameMulti' placeholder='Enter Description' />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='d-flex justify-content-between'>
                                            <Button outline className='me-1' color='secondary' type='reset'>
                                                Cancel
                                            </Button>
                                            <Button color='primary' type='submit' disabled={loading}>
                                                {
                                                    loading ?
                                                        <>
                                                            <Spinner color='white' size='sm' type='grow' />
                                                            <span className='ms-50'>Loading...</span>
                                                        </>
                                                        :
                                                        <span>
                                                            Create
                                                        </span>
                                                }
                                            </Button>

                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </CardBody>
            </Card >

        </div >
    )
}

export default CreateServiceRequest;